import { Expression } from "../math-structures/expression";
import { Frac } from "../math-structures/fraction";
import { MathStruct, Multiplier } from "../math-structures/math-structure";
import { Num } from "../math-structures/number";
import { Term } from "../math-structures/term";

export function getParents(struct: MathStruct): MathStruct[] {
    let parents: MathStruct[] = [];
    while(struct.parent){
        parents.push(struct.parent);
        struct = struct.parent;
    }
    return parents;
}

export function getChildren(struct: MathStruct): MathStruct[] {
    let children: MathStruct[] = [];
    function get(struct: MathStruct){
        struct.children.forEach((child) => {
            children.push(child);
            get(child);
        });
    }
    get(struct);
    return children;
}

export function toMultiplier(struct: MathStruct): Multiplier {
    if(struct instanceof Term){
        return struct.sign == "+" && struct.content.length==1 ? struct.content[0].copy() : new Expression([struct.copy()]);
    }if(struct instanceof Expression){
        return struct.content.length==1 ? toMultiplier(struct.content[0]) : struct.copy();
    }
    return struct.copy();
}

export function toExpression(struct: Multiplier | Term, sign: '+' | '-' = "+"): Expression {
    if(struct instanceof Expression) return struct.copy();
    if (struct instanceof Term) {
        if(struct.sign == '+' && struct.content.length==1 && struct.content[0] instanceof Expression) return struct.content[0].copy();
        return new Expression([struct.copy()]);
    }
    return new Expression([new Term([struct.copy()], sign)]);
}

export function toTerm(mult: Multiplier | Term): Term {
    if(mult instanceof Term) return mult.copy();
    if(mult instanceof Expression && mult.content.length == 1) return mult.content[0].copy();
    return new Term([mult.copy()]);
}

export function removeExtraGroups(struct: MathStruct, rmNegative = false): MathStruct {
    if(struct instanceof Term){
        let sign = struct.sign;
        let content: Multiplier[] = [];
        let modified = false;
        for(let mult of struct.content){
            if(mult instanceof Expression && mult.content.length == 1 && (mult.content[0].sign == "+" || rmNegative)){
                content.push(...mult.content[0].content);
                if(mult.content[0].sign == "-") sign = sign == "+" ? "-" : "+";
                modified = true;
            }else{
                content.push(mult);
            }
        }
        return modified ? new Term(content.map((mult) => mult.copy()), sign) : struct;
    }if(struct instanceof Expression){
        let content: Term[] = [];
        let modified = false;
        for(let term of struct.content){
            if(term.sign == "+" && term.content.length == 1 && term.content[0] instanceof Expression){
                content.push(...term.content[0].content);
                modified = true;
            }else{
                content.push(term);
            }
        }
        return modified ? new Expression(content.map((mult) => mult.copy())) : struct;
    }
    return struct;
}

export function changeTermSign(struct: Term): Term {
    return new Term(struct.content.map((mult) => mult.copy()), struct.sign == "+" ? "-" : "+");
}


export function getCompInfo(term: Term): {frac: Frac, coef: [number, number]} {
    let numContent: Multiplier[] = [];
    let denContent: Multiplier[] = [];
    let numCoef = term.sign == "+" ? 1 : -1;
    let denCoef = 1;
    for(let mult of term.content){
        if(!(mult instanceof Frac)) {
            if(mult instanceof Num) numCoef *= mult.value;
            else numContent.push(mult.copy());
            continue;
        }
        mult.numerator.content.forEach((mult)=>{
            if(mult instanceof Num) numCoef *= mult.value;
            else numContent.push(mult.copy());
        });
        mult.denomerator.content.forEach((mult)=>{
            if(mult instanceof Num) denCoef *= mult.value;
            else denContent.push(mult.copy());
        });
        if(mult.numerator.sign != mult.denomerator.sign) numCoef *= -1;
    }
    numContent.sort((a, b) => a.toTex().localeCompare(b.toTex()));
    denContent.sort((a, b) => a.toTex().localeCompare(b.toTex()));
    return {frac: new Frac(new Term(numContent), new Term(denContent)), coef: [numCoef, denCoef]};
}

export function fromCompInfo(frac: Frac, coef: [number, number]): Term {
    let numContent = frac.numerator.content.filter(mult => !(mult instanceof Num)).map(mult => mult.copy());
    let denContent = frac.denomerator.content.filter(mult => !(mult instanceof Num)).map(mult => mult.copy());
    let termContent: Multiplier[] = [];
    if(denContent.length){
        if(Math.abs(coef[0]) != 1 ) numContent.splice(0, 0, new Num(Math.abs(coef[0])));
        if(coef[1] != 1) denContent.splice(0, 0, new Num(coef[1]));
        termContent.push(new Frac(new Term(numContent), new Term(denContent)));
    }else{
        if(coef[1] != 1) {
            termContent.push(new Frac(toTerm(new Num(Math.abs(coef[0]))), toTerm(new Num(coef[1]))));
        }else if(Math.abs(coef[0]) != 1){
            termContent.push(new Num(Math.abs(coef[0])));
        }
        termContent.push(...numContent);
    }
    return new Term(termContent, coef[0] >= 0 ? "+" : "-");
}

export function addFractions(a: [number, number], b: [number, number]): [number, number] {
    let [num, den] = [a[0]*b[1]+b[0]*a[1], a[1]*b[1]];
    let g = gcd(num, den);
    return [num/g, den/g];
}

function gcd(a: number, b: number): number {
    while(b){
        a = a%b;
        [a, b] = [b, a];
    }
    return a;
}
