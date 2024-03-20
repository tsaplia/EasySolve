import { Formula } from "../math-structures/formula";
import { formulaTemplateFromTeX, templateFromTeX } from "./from-tex";
import { tryFormulaTemplate, tryTemplete } from "./templates/templete-functions";
import templates from "src/assets/actions.json";

export let availibleActions = new Map<String, ()=>Formula[] | null>

templates.forEach((action) => {
    if(!action.template) return;
    if(action.type == "expression"){
        let template = templateFromTeX(action.body);
        availibleActions.set(action.id, ()=>{
            let res = tryTemplete(template)
            return res ? [res] : null;
        });
    }else{
        let template = formulaTemplateFromTeX(action.body);
        availibleActions.set(action.id, ()=>{
            return tryFormulaTemplate(template);
        });
    }
});
