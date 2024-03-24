import { Expression } from "../math-structures/expression";
import { Formula } from "../math-structures/formula";
import { Template } from "../math-structures/template";
import { formulaTemplateFromTeX, templateFromTeX } from "./from-tex";
import { clearSelected, selected } from "./selection/selected";
import { tryFormulaTemplate, tryTemplete } from "./templates/templete-functions";
import templates from "src/assets/actions.json";

export let availibleActions = new Map<String, ()=>Formula[] | null>

templates.forEach((action) => {
    if(!action.template) return;
    if(action.type == "expression"){
        let template = templateFromTeX(action.body as string);
        availibleActions.set(action.id, ()=>{
            let expr = tryTemplete(template)
            return expr ? [new Formula([expr])] : null;
        });
    }else{
        let template = formulaTemplateFromTeX(action.body as string);
        availibleActions.set(action.id, ()=>{
            return tryFormulaTemplate(template);
        });
    }
});

availibleActions.set("sub-1", ()=>{
    let formulas = selected.selectedFormulas;
    if(!formulas || formulas.length != 1) return null;
    let template = new Template(formulas[0].equalityParts[0].copy(), formulas[0].equalityParts.at(-1)?.copy() as Expression);
    availibleActions.set("custom", ()=>{
        let expr = tryTemplete(template)
        return expr ? [new Formula([expr])] : null;
    });
    clearSelected();
    return null;
});

availibleActions.set("sub-2", ()=>{
    if(!availibleActions.get("custom") || selected.type != 'structure') return null;
    let res = availibleActions.get("custom")?.() || null;
    availibleActions.delete("custom");
    return res;
});