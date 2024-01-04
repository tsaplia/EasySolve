

import { Formula, Template } from "../math-structures/all-structures";

export function useTemplate(template: Template, expression: Formula): Formula | null {
    let match = template.from.match(expression);
    if(!match) return null;
    try{
        return template.to.substitute(match);
    }catch (e){
        return null;
    }
}