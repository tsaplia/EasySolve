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