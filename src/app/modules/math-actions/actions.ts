import { Formula } from "../math-structures/formula";
import { templateFromTeX } from "./from-tex";
import { tryTemplete } from "./templates/templete-functions";
import templates from "src/assets/actions.json";

export let availibleActions = new Map<String, ()=>Formula|null>

templates.forEach(action => {
    if(!action.template) return;
    let template = templateFromTeX(action.body as string);
    availibleActions.set(action.id, ()=>{
        return tryTemplete(template);
    });
});
