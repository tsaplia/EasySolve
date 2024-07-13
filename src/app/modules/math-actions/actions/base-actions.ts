import { gcd, addFractions } from "src/app/configs/utils";
import { Exponent } from "../../math-structures/exponent";
import { Expression } from "../../math-structures/expression";
import { Frac } from "../../math-structures/fraction";
import { type Multiplier } from "../../math-structures/math-structure";
import { Num } from "../../math-structures/number";
import { Term } from "../../math-structures/term";
import { changeTermSign, toExpression, toTerm } from "../general-actions";

// for multTerms
function _deleteEquals(a: Multiplier[], b: Multiplier[]): void {
    for (let i = 0; i < a.length; i++) {
        let ind = b.findIndex(mult => mult.isEqual(a[i]));
        if (ind != -1) {
            b.splice(ind, 1);
            a.splice(i--, 1);
        }
    }
}
// for multTerms / simplify Frac
function _mergeContentPowers(aContent: Multiplier[], bContent: Multiplier[], devide?: boolean): Multiplier[] {
    let result: Multiplier[] = [];
    for (let i = 0; i < aContent.length; i++) {
        let asExp = multAsExponentContent(aContent[i]);
        if (aContent.filter(mult => multAsExponentContent(mult).base.isEqual(asExp.base)).length != 1) continue;
        let sameBase = bContent.filter(mult => multAsExponentContent(mult).base.isEqual(asExp.base));
        if (sameBase.length == 1) {
            let merged = _multiplyPowers(aContent[i], sameBase[0], devide);
            if (merged && merged.toTex() != "1") result.push(merged);
            bContent.splice(bContent.indexOf(sameBase[0]), 1);
            aContent.splice(i--, 1);
        }
    }
    return result;
}
// for multTerms
function _mergeContentNumbers(aContent: Multiplier[], bContent: Multiplier[]): number {
    let aNumbers: Num[] = aContent.filter(mult => mult instanceof Num) as Num[];
    let bNumbers: Num[] = bContent.filter(mult => mult instanceof Num) as Num[];

    if (aNumbers.length > 1 || bNumbers.length > 1) return 1;
    let coef = 1;
    if (aNumbers.length) {
        coef *= aNumbers[0].value;
        aContent.splice(aContent.indexOf(aNumbers[0]), 1);
    } if (bNumbers.length) {
        coef *= bNumbers[0].value;
        bContent.splice(bContent.indexOf(bNumbers[0]), 1);
    }
    return coef;
}

export function multTerms(a: Term, b: Term): Term {
    let aInfo = termAsFracContent(a);
    let bInfo = termAsFracContent(b);
    let sign: "+" | "-" = aInfo.sign == bInfo.sign ? "+" : "-";

    _deleteEquals(aInfo.den, bInfo.num);
    _deleteEquals(bInfo.den, aInfo.num);

    let den: Multiplier[] = []; let num: Multiplier[] = []; // contains copies
    let numCoef = _mergeContentNumbers(aInfo.num, bInfo.num);
    let denCoef = _mergeContentNumbers(aInfo.den, bInfo.den);
    let g = gcd(numCoef, denCoef);
    numCoef /= g;
    denCoef /= g;
    if (numCoef != 1) num.push(new Num(numCoef));
    if (denCoef != 1) den.push(new Num(denCoef));

    num.push(..._mergeContentPowers(aInfo.num, bInfo.num));
    den.push(..._mergeContentPowers(aInfo.den, bInfo.den));
    num.push(..._mergeContentPowers(aInfo.num, bInfo.den, true));
    num.push(..._mergeContentPowers(bInfo.num, aInfo.den, true));

    num.push(...aInfo.num.map(mult => mult.copy()), ...bInfo.num.map(mult => mult.copy()));
    den.push(...aInfo.den.map(mult => mult.copy()), ...bInfo.den.map(mult => mult.copy()));

    num.filter(mult => mult.toTex() != "1");
    den.filter(mult => mult.toTex() != "1");

    if (den.length == 0) return new Term(num, sign);
    return new Term([new Frac(new Term(num), new Term(den))], sign);
}

function _multiplyPowers(a: Multiplier, b: Multiplier, devide?: boolean): Multiplier | null {
    let aContent = multAsExponentContent(a); let bContent = multAsExponentContent(b);
    if (!aContent.base.isEqual(bContent.base)) return null;

    if (devide) bContent.exponent = new Expression(bContent.exponent.content.map(t => changeTermSign(t)));

    let expr = new Expression(aContent.exponent.content.concat(bContent.exponent.content).map(t => t.copy()));
    expr = simplifyTerms(expr);

    if (expr.toTex() == "0") return new Num(1);
    if (expr.toTex() == "1") return aContent.base.copy();
    return new Exponent(aContent.base.copy(), expr);
}

function _mergePowers(content: Multiplier[]): void {
    for (let i = 0; i < content.length; i++) {
        let mult = content[i].copy();
        for (let j = i + 1; j < content.length; j++) {
            let merged = _multiplyPowers(content[i], content[j]);
            if (merged) {
                mult = merged;
                content.splice(j--, 1);
            }
        }
        content[i] = mult;
    }
}

export function simplifyFrac(term: Term, removeEmptyDen?: boolean): Term {
    let info = termAsFracContent(term);

    let numCoef = info.num.reduce((acc, cur) => (acc *= cur instanceof Num ? cur.value : 1), 1);
    let denCoef = info.den.reduce((acc, cur) => (acc *= cur instanceof Num ? cur.value : 1), 1);

    let g = gcd(numCoef, denCoef);
    numCoef /= g;
    denCoef /= g;

    info.num = info.num.filter(mult => !(mult instanceof Num));
    info.den = info.den.filter(mult => !(mult instanceof Num));

    _mergePowers(info.num);
    _mergePowers(info.den);
    info.num.push(..._mergeContentPowers(info.num, info.den, true));
    if (numCoef != 1) info.num.unshift(new Num(numCoef));
    if (denCoef != 1) info.den.unshift(new Num(denCoef));

    if (removeEmptyDen && info.den.length == 0) return new Term(info.num, info.sign);
    return new Term([new Frac(new Term(info.num), new Term(info.den))], info.sign);
}

// doesn't return copies
function multAsExponentContent(mult: Multiplier): { base: Multiplier, exponent: Expression } {
    if (mult instanceof Exponent) return { base: mult.base, exponent: mult.exponent };
    return { base: mult, exponent: toExpression(new Num(1)) };
}

// doesn't return copies
export function termAsFracContent(term: Term): { num: Multiplier[], den: Multiplier[], sign: "+" | "-" } {
    let num: Multiplier[] = [];
    let den: Multiplier[] = [];
    let sign = term.sign;

    for (let mult of term.content) {
        if (!(mult instanceof Frac)) {
            num.push(mult);
            continue;
        }
        num.push(...mult.numerator.content);
        den.push(...mult.denomerator.content);
        if (mult.numerator.sign != mult.denomerator.sign) sign = sign == "+" ? "-" : "+";
    }
    num = num.filter(mult => !(mult instanceof Num) || mult.value != 1);
    den = den.filter(mult => !(mult instanceof Num) || mult.value != 1);
    return { num, den, sign };
}

export function termToFrac(term: Term): Term {
    let { num, den, sign } = termAsFracContent(term);
    return new Term([new Frac(new Term(num.map(m => m.copy())), new Term(den.map(m => m.copy())))], sign);
}

export function reverseTerm(term: Term): Term {
    if (term.content.length > 1 || !(term.content[0] instanceof Frac)) {
        term = termToFrac(term);
    }
    let frac = term.content[0] as Frac;
    return new Term([new Frac(frac.denomerator.copy(), frac.numerator.copy())], term.sign);
}

export function fracToTerm(frac: Frac, sign: "+" | "-" = "+"): Term {
    if (frac.denomerator.toTex() == "+1") {
        if (frac.numerator.sign != frac.denomerator.sign) sign = sign == "+" ? "-" : "+";
        return new Term(frac.numerator.content.map(mult => mult.copy()), sign);
    }
    return new Term([frac.copy()], sign);
}

export function getCompInfo(term: Term): { frac: Frac, coef: [number, number] } {
    let { num, den, sign } = termAsFracContent(term);
    let numCoef = sign == "+" ? 1 : -1;
    let denCoef = 1;

    num.forEach(mult => (numCoef *= mult instanceof Num ? mult.value : 1));
    den.forEach(mult => (denCoef *= mult instanceof Num ? mult.value : 1));
    num = num.filter(mult => !(mult instanceof Num));
    den = den.filter(mult => !(mult instanceof Num));
    num.sort((a, b) => a.toTex().localeCompare(b.toTex()));
    den.sort((a, b) => a.toTex().localeCompare(b.toTex()));

    let g = gcd(numCoef, denCoef);
    numCoef /= g;
    denCoef /= g;

    return {
        frac: new Frac(new Term(num.map(mult => mult.copy())),
            new Term(den.map(mult => mult.copy()))),
        coef: [numCoef, denCoef]
    };
}

export function fromCompInfo(frac: Frac, coef: [number, number]): Term {
    let numContent = frac.numerator.content.filter(mult => !(mult instanceof Num)).map(mult => mult.copy());
    let denContent = frac.denomerator.content.filter(mult => !(mult instanceof Num)).map(mult => mult.copy());
    let termContent: Multiplier[] = [];
    if (denContent.length) {
        if (Math.abs(coef[0]) != 1) numContent.splice(0, 0, new Num(Math.abs(coef[0])));
        if (coef[1] != 1) denContent.splice(0, 0, new Num(coef[1]));
        termContent.push(new Frac(new Term(numContent), new Term(denContent)));
    } else {
        if (coef[1] != 1) {
            termContent.push(new Frac(toTerm(new Num(Math.abs(coef[0]))), toTerm(new Num(coef[1]))));
        } else if (Math.abs(coef[0]) != 1) {
            termContent.push(new Num(Math.abs(coef[0])));
        }
        termContent.push(...numContent);
    }
    return new Term(termContent, coef[0] >= 0 ? "+" : "-");
}

export function simplifyTerms(expr: Expression): Expression {
    let children = expr.content.map(child => getCompInfo(child));
    let content: Term[] = [];
    while (children.length) {
        let curChild = children[0];
        children.shift();
        for (let i = children.length - 1; i >= 0; i--) {
            let compChild = children[i];
            if (curChild.frac.isEqual(compChild.frac)) {
                children.splice(i, 1);
                curChild.coef = addFractions(curChild.coef, compChild.coef);
            }
        }
        if (curChild.coef[0] != 0) content.push(fromCompInfo(curChild.frac, curChild.coef));
    }
    return new Expression(content);
}
