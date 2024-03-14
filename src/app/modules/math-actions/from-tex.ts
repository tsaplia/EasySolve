import { availibleLetters, availibleMathFunc } from "../../configs/config";
import { Exponent } from "../math-structures/exponent";
import { Expression } from "../math-structures/expression";
import { Formula } from "../math-structures/formula";
import { FormulaTemplate } from "../math-structures/formula-template";
import { Frac } from "../math-structures/fraction";
import { Func } from "../math-structures/function";
import { Multiplier } from "../math-structures/math-structure";
import { Num } from "../math-structures/number";
import { Sqrt } from "../math-structures/sqrt";
import { Template } from "../math-structures/template";
import { TemplateVar } from "../math-structures/template-var";
import { Term } from "../math-structures/term";
import { Variable } from "../math-structures/variable";
import { toExpression, toTerm } from "./structure-actions";


class IterStr {
    str: string;
    it: number;
    constructor(str: string) {
        this.str = str;
        this.it = 0;
    }

    add(n = 1) {
        this.it += n;
    }

    finished() {
        return this.it >= this.str.length;
    }

    startsWith(searchString: string) {
        if (this.finished()) return false;
        return this.str.startsWith(searchString, this.it);
    }

    valueOf = () => this.str;

    get cur() {
        if (this.finished()) throw new Error("The string is ended");
        return this.str[this.it];
    }
}


export function templateFromTeX(tex: string): Template {
    let parts = tex.split("=>");
    if(parts.length != 2) throw new Error("Incorrect template string");
    return new Template(formulaFromTeX(parts[0]).equalityParts[0], formulaFromTeX(parts[1]).equalityParts[0]);
}

export function formulaTemplateFromTeX(tex: string): FormulaTemplate {
    let parts = tex.split("=>");
    if(parts.length != 2) throw new Error("Incorrect template string");
    return new FormulaTemplate(parts[0].split(";").map(formulaFromTeX),  parts[1].split(";").map(formulaFromTeX));
}

export function formulaFromTeX(str: string): Formula {
    str = deleteExtraBlocks(str);
    let equalityParts = [];
    let itStr = new IterStr(str);
    if(itStr.valueOf().endsWith('=')) throw new Error("Incorrect input string");

    while (!itStr.finished()) {
        let newBlock = expressionFromTeX(itStr);
        equalityParts.push(newBlock);
        itStr.add();
    }
    if (!equalityParts.length) throw new Error("Incorrect input string");

    return new Formula(equalityParts);
}


function expressionFromTeX(itStr: IterStr, _wrapped=false): Expression {
    if (_endCheck(itStr, false)) throw new Error("Incorrect input string");

    if (_wrapped) {
        itStr.add(6);
    }
    let content = [];
    while (!_endCheck(itStr, false)) {
        content.push(termFromTeX(itStr));
    }
    if (!content.length) throw new Error("Incorrect input string");

    if (_wrapped) {
        if (itStr.startsWith("\\right)")) itStr.add(7);
        else throw new Error("Incorrect input string");
    }
    return new Expression(content);
}

function multiplierFromTex(itStr: IterStr): Multiplier {
    if (!itStr.finished() && itStr.cur == " ") itStr.add();
    let newStruct: Multiplier;
    if (itStr.startsWith("\\frac")) {
        newStruct = fracFromTeX(itStr);
    } else if (itStr.startsWith("\\sqrt")) {
        newStruct = sqrtFromTeX(itStr);
    } else if (itStr.startsWith("\\vec")) {
        newStruct = vectorFromTex(itStr);
    } else if (itStr.startsWith("\\left(")) {
        newStruct = expressionFromTeX(itStr, true);
    } else if (itStr.startsWith("\\")) {
        newStruct = specialNameFromTeX(itStr);
    } else if (!isNaN(Number(itStr.cur))) {
        newStruct = numFromTeX(itStr);
    } else if (itStr.cur.match(/[A-Za-z\wа-яА-Я]/i)) {
        newStruct = latinVariableFromTeX(itStr);
    } else if (itStr.cur == '[') {
        newStruct = templateVarFromTeX(itStr);

    }else throw new Error("Incorrect input string");

    if (!itStr.finished() && itStr.cur == " ") itStr.add();
    if (itStr.startsWith("'")) {
        if(!(newStruct instanceof Variable)) throw new Error("Incorrect input string");
        primeFromTeX(itStr, newStruct);
    }
    if (itStr.startsWith("_")) {
        if(!(newStruct instanceof Variable)) throw new Error("Incorrect input string");
        indexFromTeX(itStr, newStruct);
    }
    if (itStr.startsWith("^")) {
        return exponentFromTeX(itStr, newStruct);
    }
    if (!itStr.finished() && itStr.cur == " ") itStr.add();
    return newStruct;
}


function termFromTeX(itStr: IterStr) {
    let sign: '+' | '-' = "+";
    let content = [];

    if (["+", "-"].includes(itStr.cur)) {
        sign = itStr.cur as '+' | '-';
        itStr.add();
    }

    while (!_endCheck(itStr)) {
        if (itStr.startsWith("\\cdot")) {
            itStr.add(5);
        }
        content.push(multiplierFromTex(itStr));
    }

    if (!content.length) throw new Error("Incorrect input string");
    return new Term(content, sign);
}


function fracFromTeX(itStr: IterStr) {
    let num; let denom;
    itStr.add(6);
    num = toTerm(expressionFromTeX(itStr));
    if (!itStr.startsWith("}{")) throw new Error("Incorrect input string");

    itStr.add(2);
    denom = toTerm(expressionFromTeX(itStr));
    if (!itStr.startsWith("}")) throw new Error("Incorrect input string");
    itStr.add(1);

    return new Frac(num, denom);
}


function exponentFromTeX(itStr: IterStr, base: Multiplier) {
    let exponent;

    itStr.add();
    if (itStr.startsWith("{")) {
        itStr.add();
        exponent = expressionFromTeX(itStr);
        itStr.add();
    } else {
        exponent = toExpression( !isNaN(Number(itStr.cur)) ? new Num(itStr.cur) : new Variable(itStr.cur) );
        itStr.add();
    }

    return new Exponent(base, exponent);
}


function sqrtFromTeX(itStr: IterStr): Sqrt {
    let root = toExpression(new Num(2));
    itStr.add(5);
    if (itStr.startsWith("[")) {
        itStr.add();
        root = expressionFromTeX(itStr);
        if (!itStr.startsWith("]{")) throw new Error("Incorrect input string");
        itStr.add();
    }
    itStr.add();
    let expr = expressionFromTeX(itStr);
    let base: Multiplier;
    if (expr.content.length == 1 && expr.content[0].content.length == 1 && expr.content[0].sign == "+") {
        base = expr.content[0].content[0];
    }else{
        base = expr;
    }

    if (!itStr.startsWith("}")) throw new Error("Incorrect input string");
    itStr.add();

    return new Sqrt(base, root);
}


function vectorFromTex(itStr: IterStr): Variable {
    itStr.add(5);
    let block = expressionFromTeX(itStr);
    if (!itStr.startsWith("}")) throw new Error("Incorrect input string");
    itStr.add();

    if (block.content.length > 1 || block.content[0].content.length > 1 || block.content[0].sign == "-" ||
        !(block.content[0].content[0] instanceof Variable)) throw new Error("Incorrect input string");

    block.content[0].content[0].vector = true;
    return block.content[0].content[0];
}

function latinVariableFromTeX(itStr: IterStr): Variable {
    let newVar = new Variable(itStr.cur);
    itStr.add();
    return newVar;
}

/**
 * @param {IterStr} itStr
 * @param {Variable} base
 */
function indexFromTeX(itStr: IterStr, base: Variable) {
    if (!(base instanceof Variable)) throw new Error("Incorrect input string");

    let index="";
    itStr.add();
    if (itStr.startsWith("{")) {
        itStr.add();
        index = expressionFromTeX(itStr).toTex();
    } else {
        index = itStr.cur;
    }
    itStr.add();
    base.index = index;
}

function primeFromTeX(itStr: IterStr, base: Variable) {
    if (!(base instanceof Variable)) throw new Error("Incorrect input string");

    let primeCount = 0;
    while (!itStr.finished() && itStr.cur == "'") {
        primeCount++;
        itStr.add();
    }
    base.primeCount = primeCount;
}

function numFromTeX(itStr: IterStr): Num {
    let start=itStr.it;
    while (!itStr.finished() && (!isNaN(Number(itStr.cur)) || itStr.cur==".")) itStr.add();
    return new Num(itStr.str.slice(start, itStr.it));
}

function specialNameFromTeX(itStr: IterStr): Variable | Func {
    itStr.add();
    for (let name of availibleLetters) {
        if (!itStr.startsWith(name)) continue;
        itStr.add(name.length);
        return new Variable(`\\${name} `);
    }
    for (let name of Object.keys(availibleMathFunc)) {
        if (!itStr.startsWith(name)) continue;
        itStr.add(name.length);
        return new Func(name, expressionFromTeX(itStr, true));
    }
    throw new Error("Incorrect input string");
}

function templateVarFromTeX(itStr: IterStr): TemplateVar {
    itStr.add();
    let start = itStr.it;
    while (!itStr.finished() && itStr.cur.match(/[A-Za-z]/i)) itStr.add();
    let name = itStr.str.slice(start, itStr.it);
    if(!name || !itStr.startsWith("]")) throw new Error("Incorrect input string");
    itStr.add();
    return new TemplateVar(name);
}

function _endCheck(itStr: IterStr, pm: boolean = true): boolean {
    if (itStr.finished()) return true;

    let breakers = ["}", "\\right)", "=", "]"];
    if (pm) breakers.push("+", "-");

    for (let pref of breakers) {
        if (itStr.startsWith(pref)) return true;
    }
    return false;
}

/* Removes all \operatorname and \text */
function deleteExtraBlocks(str: string): string {
    let regex = /(\\operatorname|\\text){([^\\]*)}/g;
    for (let match of str.matchAll(regex)) {
        str = str.replace(match[0], "\\"+match[2]);
    }
    return str;
}
