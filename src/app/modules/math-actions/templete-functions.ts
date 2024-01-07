

import { Formula } from "../math-structures/formula";
import { Template } from "../math-structures/template";

export function useTemplate(template: Template, formula: Formula): Formula | null {
    let match = template.from.match(formula);
    if(!match) return null;
    try{
        return template.to.substitute(match);
    }catch (e){
        return null;
    }
}
