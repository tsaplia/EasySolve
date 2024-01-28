import { Expression } from "../math-structures/expression";
import { MathStruct, Multiplier } from "../math-structures/math-structure";
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
        return struct.sign == "+" && struct.content.length==0 ? struct.content[0].copy() : new Expression([struct.copy()]);
    }if(struct instanceof Expression){
        return struct.content.length==0 ? toMultiplier(struct.content[0]) : struct.copy();
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