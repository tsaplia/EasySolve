

import { Formula } from "../../math-structures/formula";
import { MatchResult } from "./match-result";
import { MathStruct, Multiplier } from "../../math-structures/math-structure";
import { Template } from "../../math-structures/template";
import { TemplateVar } from "../../math-structures/template-var";
import { Variable } from "../../math-structures/variable";
import { selected } from "../selection/selected";
import { getParents, toExpression, toMultiplier, toTerm } from "../structure-actions";
import { Term } from "../../math-structures/term";
import { Expression } from "../../math-structures/expression";

function useTemplate(template: Template, expression: Expression, ): Expression | null {
    let matchRusult = match(template.from, expression);
    if(!matchRusult) return null;
    return substituteVariables(template.to, matchRusult);
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
            return match.get(struct.name) as MathStruct;
        }
        return struct.changeStructure(callback, match);
    };
    return template.changeStructure(callback);
}


// TODO: rewrite
function getSelectedData(): {formula: Formula, parent: MathStruct} {
    if(selected.size!=1) throw new Error("Selected size must be 1");
    let parent: MathStruct | null = (selected.values().next().value as MathStruct).parent;
    if(!parent) throw new Error("Selected element has no parent");
    let commonParent = Array.from(selected.values()).every(struct => struct.parent == parent);
    if(!commonParent) throw new Error("Selected elements must have the same parent");
    let formula = getParents(parent).at(-1) as Formula;
    // trow error if formula is not formula
    return {formula, parent};
}

function replace(formula: Formula, from: Term | Multiplier, to: Term | Multiplier): Formula {
    // TODO: change changestructure method
    if(from instanceof Term) to = toTerm(to); 
    else if(from instanceof Expression)to = toExpression(to);
    else to = toMultiplier(to);
    function callback(struct: MathStruct): MathStruct {
        if(struct === from) return to;
        return struct.changeStructure(callback, match);
    };
    return formula.changeStructure(callback);
}

export function tryTemplete(template: Template): Formula | null {
    let {formula} = getSelectedData();
    let selectedStruct = selected.values().next().value as Term|Multiplier
    let selectedExpression = toExpression(selectedStruct);
    let resultExpression = useTemplate(template, selectedExpression);
    if(!resultExpression) return null;
    return replace(formula, selectedStruct, resultExpression);
}
