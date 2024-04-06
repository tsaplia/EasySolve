import { Expression } from "../math-structures/expression";
import { Formula } from "../math-structures/formula";
import { Frac } from "../math-structures/fraction";
import { Multiplier } from "../math-structures/math-structure";
import { Num } from "../math-structures/number";
import { Template } from "../math-structures/template";
import { Term } from "../math-structures/term";
import { formulaTemplateFromTeX, templateFromTeX } from "./from-tex";
import { clearSelected, selected } from "./selection/selected";
import { StructureData } from "./selection/selected-structures";
import { changeTermSign, removeExtraGroups, toMultiplier, toTerm } from "./structure-actions";
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

function _moveOutofFrac(direction: "l" | "r", data: StructureData){
    if(!(data.structure.parent instanceof Term && data.structure.parent.parent instanceof Frac)) return null;

    let frac = data.structure.parent.parent;
    let numChildren = data.structure.parent.parent.numerator.children;
    let denChildren = data.structure.parent.parent.denomerator.children;
    let newMult: Multiplier;
    if(data.structure.parent.parent.numerator == data.structure.parent) {
        numChildren.splice(numChildren.indexOf(data.structure), 1);
        newMult = toMultiplier(data.structure);
    }else{
        denChildren.splice(denChildren.indexOf(data.structure), 1);
        newMult = new Frac(new Term([new Num(1)]), toTerm(data.structure));
    }
    let newFrac = new Frac(new Term(numChildren.map(child => toTerm(child))), new Term(denChildren.map(child => toTerm(child))));

    let newChildren = direction == "l" ? [newMult, newFrac] : [newFrac, newMult];
    let children = (frac.parent as Term).children;
    children.splice(children.indexOf(frac), 1, ...newChildren);
    return [new Formula([
        replace((data.subFormula || data.formula).equalityParts[data.partIndex], frac.parent as Term, removeExtraGroups(new Term(children)))
    ])];
}

function move(direction: "l" | "r"){
    let data = selected.getStructureData();
    if(!data) return null;
    if(!(data.structure.parent instanceof Term || data.structure.parent instanceof Expression)) return null;
    let children = data.structure.parent.children.map(child => child.copy());
    let index = data.structure.parent.children.indexOf(data.structure);
    if(direction == "l" && index == 0 || direction == "r" && index == children.length-1) {
        return _moveOutofFrac(direction, data);
    }
    children.splice(direction == "l" ? index-1 : index+1, 0, children.splice(index, 1)[0]);
    let newParent = removeExtraGroups(data.structure.parent instanceof Term ? new Term(children) : new Expression(children as Term[]));
    return [new Formula([replace((data.subFormula || data.formula).equalityParts[data.partIndex], data.structure.parent, newParent)])];
}

availibleActions.set("move-l", () => {
    return move("l");
});

availibleActions.set("move-r", () => {
    return move("r");
});

availibleActions.set("change-part", ()=> {
    let structures = selected.selectedStructures as Term[];
    if(structures?.[0] instanceof Expression){
        if(structures.length != 1) return null;
        structures = structures[0].children as Term[];
    }
    if(!(structures?.[0].parent?.parent instanceof Formula)) return null;
    let formula = structures[0].parent.parent;
    if(formula.equalityParts.length < 2) return null;
    let partIndex = formula.equalityParts.indexOf(structures[0].parent as Expression);

    let secondPartIndex = partIndex == 0 ? formula.equalityParts.length-1 : 0;
    let leftChildren = formula.equalityParts[secondPartIndex].content.map(child => child.copy());
    structures.forEach((struct)=>leftChildren.push(changeTermSign(struct)));

    let rightChildren = formula.equalityParts[partIndex].content
        .filter(child => !structures?.includes(child)).map(child => child.copy());

    if(partIndex == 0) [leftChildren, rightChildren] = [rightChildren, leftChildren];

    return [new Formula([new Expression(leftChildren), new Expression(rightChildren)])];
});