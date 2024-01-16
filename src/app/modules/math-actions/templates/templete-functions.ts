

import { Formula } from "../../math-structures/formula";
import { MatchResult } from "./match-result";
import { MathStruct, Multiplier } from "../../math-structures/math-structure";
import { Template } from "../../math-structures/template";
import { TemplateVar } from "../../math-structures/template-var";
import { Variable } from "../../math-structures/variable";

export function useTemplate(template: Template, formula: Formula): Formula | null {
    let matchRusult = match(template.from, formula);
    if(!matchRusult) return null;
    return substitute(template.to, matchRusult);
}

export function match(template: MathStruct, struct: MathStruct): MatchResult | null {
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

export function substitute(template: Formula, match: MatchResult): Formula {
    function callback(struct: MathStruct): MathStruct {
        if(struct instanceof TemplateVar){
            if(!match.get(struct.name)) throw new Error("Template variable not found");
            return match.get(struct.name) as MathStruct;
        }
        return struct.changeStructure(callback, match);
    };
    return template.changeStructure(callback);
}

