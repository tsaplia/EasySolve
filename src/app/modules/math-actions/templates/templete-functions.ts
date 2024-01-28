

import { Formula } from "../../math-structures/formula";
import { MatchResult } from "./match-result";
import { MathStruct, Multiplier } from "../../math-structures/math-structure";
import { Template } from "../../math-structures/template";
import { TemplateVar } from "../../math-structures/template-var";
import { Variable } from "../../math-structures/variable";
import { selected } from "../selection/selected";
import { toExpression, toMultiplier, toTerm } from "../structure-actions";
import { Term } from "../../math-structures/term";
import { Expression } from "../../math-structures/expression";

export function tryTemplete(template: Template): Formula | null {
    if(selected.type != "structure") return null;
    let {formula, structure} = selected.getStructureData();
    let selectedExpression = toExpression(structure);

    let matchRusult = match(template.from, selectedExpression);
    if(!matchRusult) return null;
    let resultExpression = substituteVariables(template.to, matchRusult);
    if(!resultExpression) return null;

    return replace(formula, structure, resultExpression);
}

function match(template: MathStruct, struct: MathStruct): MatchResult | null {
    if(struct instanceof TemplateVar) throw new Error("TemplateVar can't be used as struct");

    // type checks
    if(template instanceof TemplateVar){
        return struct instanceof Multiplier ? new MatchResult({[template.name]: struct}) : null;
    }
    if(template.constructor != struct.constructor) return null;
    if((template instanceof Variable || template instanceof Number)){
        return template.isEqual(struct) ? new MatchResult() : null;
    }
    if(template instanceof Function && struct instanceof Function && template.name != struct.name) return null;

    //children checks
    let tChildren = template.children;
    let sChildren = struct.children;
    let result = new MatchResult();
    for(let i=0; i<tChildren.length; i++){
        let curResult = match(tChildren[i], sChildren[i]);
        if(!curResult || !result.extend(curResult)) return null; // no curResult or we can't extend result
    }
    return result;
}

function substituteVariables(template: Expression, match: MatchResult): Expression {
    function callback(struct: MathStruct): MathStruct {
        if(struct instanceof TemplateVar){
            if(!match.get(struct.name)) throw new Error("Template variable not found");
            return match.get(struct.name)?.copy() as MathStruct;
        }
        return struct.changeStructure(callback, match);
    };
    return template.changeStructure(callback);
}

function replace(formula: Formula, from: Term | Multiplier, to: Term | Multiplier): Formula {
    console.log(to.toTex(), "*" , toTerm(to).toTex())
    if(from instanceof Term) to = toTerm(to); 
    else if(from instanceof Expression) to = toExpression(to);
    else to = toMultiplier(to);

    const callback = (struct: MathStruct): MathStruct => {
        if(struct === from) return to;
        return struct.changeStructure(callback);
    };
    return formula.changeStructure(callback);
}
