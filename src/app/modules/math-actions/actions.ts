import { Formula } from "../math-structures/formula";
import { templateFromTeX } from "./from-tex";
import { tryTemplete } from "./templates/templete-functions";
import templates from "src/assets/templates.json";

export let availibleActions = new Map<String, ()=>Formula|null>
templates.forEach(t => {
    if(!t.body) return;
    availibleActions.set(t.id, ()=>{
        let template = templateFromTeX(t.body as string);
        return tryTemplete(template);
    });
});
