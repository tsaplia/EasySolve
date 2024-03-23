

import { Formula } from "../../math-structures/formula";
import { MatchResult } from "./match-result";
import { MathStruct, Multiplier } from "../../math-structures/math-structure";
import { Template } from "../../math-structures/template";
import { TemplateVar } from "../../math-structures/template-var";
import { Variable } from "../../math-structures/variable";
import { selected } from "../selection/selected";
import { removeExtraGroups, toExpression, toMultiplier, toTerm } from "../structure-actions";
import { Term } from "../../math-structures/term";
import { Expression } from "../../math-structures/expression";
import { FormulaTemplate } from "../../math-structures/formula-template";

export function tryTemplete(template: Template): Formula | null {
    if(selected.type != "structure") return null;
    let {formula, structure} = selected.getStructureData();
    let selectedExpression = toExpression(structure);

    let matchRusult = match(template.from, selectedExpression);
    if(!matchRusult) return null;
    let resultExpression = substituteVariables(template.to, matchRusult);

    return replace(formula, structure, resultExpression);
}

export function tryFormulaTemplate(template: FormulaTemplate): Formula[] | null {
    if(selected.type != "formula") return null;
    let formulas = selected.selectedFormulas as Formula[];
    if(formulas.length!=template.from.length) return null;

    let matchRusults = new MatchResult();
    for(let i=0; i<formulas.length; i++){
        let curResult = match(template.from[i], formulas[i]);
        if(!curResult || !matchRusults.extend(curResult)) return null;
    }
    
    return template.to.map(formula => substituteVariables(formula, matchRusults));
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

    if(template instanceof Term && struct instanceof Term && template.sign != struct.sign) return null;
    
    let tChildren = template.children;
    let sChildren = struct.children;
    
    // wrap /unwrap children
    if(tChildren.length != sChildren.length) {
        //unwrap single multipliers in expression
        if(template instanceof Expression){
            let mult = toMultiplier(template);
            return mult instanceof TemplateVar ? new MatchResult({[mult.name]: struct}) : null;
        }
        
        //wrap multiple multipliers in term
        if(!(template instanceof Term) || tChildren.length != 1 || !(tChildren[0] instanceof TemplateVar)) return null;
        sChildren = [new Expression([new Term(sChildren.map(child => child.copy()))])];
    }
    
    //children checks
    if(!(template instanceof Term || template instanceof Expression)){
        let result = new MatchResult();
        for(let i=0; i<tChildren.length; i++){
            let curResult = match(tChildren[i], sChildren[i]);
            if(!curResult || !result.extend(curResult)) return null; // no curResult or we can't extend result
        }
        return result;
    }


    // term children checks (with permutation)
    let usedTChildren: boolean[] = Array(tChildren.length).fill(false);
    let recursiveMatch = (pos: number): MatchResult | null => {
        if(pos==sChildren.length) return new MatchResult();
        for(let j=0; j<sChildren.length; j++){
            if(usedTChildren[j]) continue;
            let curResult = match(tChildren[j], sChildren[pos]);
            if(!curResult) continue;
            usedTChildren[j] = true;
            let recMatch = recursiveMatch(pos+1);
            usedTChildren[j] = false;
            if(recMatch) {
                curResult.extend(recMatch);
                return curResult;
            }
        }
        return null;
    };
    return recursiveMatch(0);
}

function substituteVariables<T extends MathStruct>(template: T, match: MatchResult): T{
    function callback(struct: MathStruct): MathStruct {
        if(struct instanceof TemplateVar){
            if(!match.get(struct.name)) throw new Error("Template variable not found");
            return match.get(struct.name)?.copy() as MathStruct;
        }
        let newStruct: typeof struct = struct.changeStructure(callback);
        return newStruct.isEqual(struct) ? newStruct : removeExtraGroups(newStruct);
    };
    return template.changeStructure(callback) as T;
}

function replace(formula: Formula, from: Term | Multiplier, to: Term | Multiplier): Formula {
    if(from instanceof Term) to = toTerm(to); 
    else if(from instanceof Expression) to = toExpression(to);
    else to = toMultiplier(to);
    let changedParent: MathStruct | null = null;

    const callback = (struct: MathStruct): MathStruct => {
        if(struct === from) {
            changedParent = struct.parent;
            return to;
        }
        let newStruct = struct.changeStructure(callback);
        if(struct == changedParent){
            return removeExtraGroups(newStruct);
        }
        return newStruct;
    };
    return formula.changeStructure(callback);
}