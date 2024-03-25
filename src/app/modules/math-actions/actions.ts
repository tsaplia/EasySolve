import { Expression } from "../math-structures/expression";
import { Formula } from "../math-structures/formula";
import { Template } from "../math-structures/template";
import { Term } from "../math-structures/term";
import { formulaTemplateFromTeX, templateFromTeX } from "./from-tex";
import { clearSelected, selected } from "./selection/selected";
import { replace, tryFormulaTemplate, tryTemplete } from "./templates/templete-functions";
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

availibleActions.set("group", ()=>{
    let data = selected.getStructureData();
    if(!data || !data.subFormula) return null;
    return [new Formula([data.subFormula.equalityParts[0].copy()])];
});

availibleActions.set("move-l", ()=> {
    if(selected.selectedStructures?.length != 1) return null;
    let data = selected.getStructureData();
    if(!(data.structure.parent instanceof Term || data.structure.parent instanceof Expression)) return null;
    let children = data.structure.parent.children.map(child => child.copy());
    let index = data.structure.parent.children.indexOf(data.structure);
    if(index == 0) return null;
    children.splice(index-1, 0, children.splice(index, 1)[0]);
    let newParent = data.structure.parent instanceof Term ? new Term(children) : new Expression(children as Term[]);
    return [new Formula([replace(data.formula.equalityParts[0], data.structure.parent, newParent)])];
});

availibleActions.set("move-r", ()=> {
    if(selected.selectedStructures?.length != 1) return null;
    let data = selected.getStructureData();
    if(!(data.structure.parent instanceof Term || data.structure.parent instanceof Expression)) return null;
    let children = data.structure.parent.children.map(child => child.copy());
    let index = data.structure.parent.children.indexOf(data.structure);
    if(index == children.length - 1) return null;
    children.splice(index+1, 0, children.splice(index, 1)[0]);
    let newParent = data.structure.parent instanceof Term ? new Term(children) : new Expression(children as Term[]);
    return [new Formula([replace(data.formula.equalityParts[0], data.structure.parent, newParent)])];
});