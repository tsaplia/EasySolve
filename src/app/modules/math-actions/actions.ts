import { FormulaActionConfig } from "src/app/models/types";
import { Exponent } from "../math-structures/exponent";
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
import { changeTermSign, fracToTerm, multTerms, removeExtraGroups, reverseTerm, simplifyTerms, simplyfyFrac as simplifyFrac, termAsFracContent, termToFrac, toExpression, toMultiplier, toTerm } from "./structure-actions";
import { replace, tryFormulaTemplate, tryTemplete } from "./templates/templete-functions";
import {templates} from "src/assets/actionConfigs";

export let availibleActions = new Map<String, (input?:Expression)=>Formula[] | null>

export let actionConfigs = new Map<String, FormulaActionConfig>


templates.forEach((action) => {
    actionConfigs.set(action.id, action);

    if(!action.template) return;
    if(!action.body) throw new Error("template must have body");
    if(action.type == "expression"){
        let templates = action.body?.map(b => templateFromTeX(b as string));
        availibleActions.set(action.id, (input?:Expression)=>{
            if(action.requireInput && !input) return null;
            for(let template of templates){
                let expr = tryTemplete(template, input)
                if(expr) return [new Formula([expr])];
            }
            return null;
        });
    }else{
        let templates = action.body?.map(b => formulaTemplateFromTeX(b as string));
        availibleActions.set(action.id, (input?:Expression)=>{
            if(action.requireInput && !input) return null;
            for(let template of templates){
                let result = tryFormulaTemplate(template, input);
                if(result) return result;
            }
            return null;
        });
    }
});

availibleActions.set("sub-1", ()=>{
    let formulas = selected.formulas;
    if(!formulas || formulas.length != 1) return null;
    let template = new Template(formulas[0].equalityParts[0].copy(), formulas[0].equalityParts.at(-1)?.copy() as Expression);
    availibleActions.set("custom", ()=>{
        let expr = tryTemplete(template)
        return expr ? [new Formula([expr])] : null;
    });
    clearSelected();
    return [];
});

availibleActions.set("sub-2", ()=>{
    if(!availibleActions.get("custom") || selected.type != 'structure') return null;
    let res = availibleActions.get("custom")?.() || null;
    availibleActions.delete("custom");
    return res;
});

availibleActions.set("group", ()=>{
    if(selected.type != 'structure') return null;
    let data = selected.getStructureData();
    if(!data || !data.grouped) return null;
    return [new Formula([data.formula.equalityParts[data.partIndex].copy()])];
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
        replace(data.formula.equalityParts[data.partIndex], frac.parent as Term, removeExtraGroups(new Term(children)))
    ])];
}

function move(direction: "l" | "r"){
    if(selected.type != 'structure') return null;
    let data = selected.getStructureData();
    if(!(data.structure.parent instanceof Term || data.structure.parent instanceof Expression)) return null;
    let children = data.structure.parent.children.map(child => child.copy());
    let index = data.structure.parent.children.indexOf(data.structure);
    if(direction == "l" && index == 0 || direction == "r" && index == children.length-1) {
        return _moveOutofFrac(direction, data);
    }
    children.splice(direction == "l" ? index-1 : index+1, 0, children.splice(index, 1)[0]);
    let newParent = removeExtraGroups(data.structure.parent instanceof Term ? new Term(children) : new Expression(children as Term[]));
    return [new Formula([replace(data.formula.equalityParts[data.partIndex], data.structure.parent, newParent)])];
}

availibleActions.set("move-l", () => {
    return move("l");
});

availibleActions.set("move-r", () => {
    return move("r");
});

availibleActions.set("change-part", ()=> {
    if(selected.type != 'structure') return null;
    let structures = selected.structures as Term[];
    if(structures?.[0] instanceof Expression){
        if(structures.length != 1) return null;
        structures = structures[0].children as Term[];
    }
    if(!(structures?.[0].parent?.parent instanceof Formula)) return null;
    let formula = structures[0].parent.parent;
    if(formula.equalityParts.length < 2) return null;
    let partIndex = formula.equalityParts.indexOf(structures[0].parent as Expression);

    let secondPartIndex = partIndex == 0 ? formula.equalityParts.length-1 : 0;
    let leftChildren = formula.equalityParts[secondPartIndex].content.map(child => child.copy())
        .filter(child => child.toTex() != "0");
    structures.forEach((struct)=>leftChildren.push(changeTermSign(struct)));

    let rightChildren = formula.equalityParts[partIndex].content
        .filter(child => !structures?.includes(child)).map(child => child.copy());

    if(partIndex == 0) [leftChildren, rightChildren] = [rightChildren, leftChildren];

    return [new Formula([new Expression(leftChildren), new Expression(rightChildren)])];
});

availibleActions.set("simp-terms", ()=>{
    if(selected.type != 'structure') return null;
    let data = selected.getStructureData();
    let expression: Expression;
    if(data.structure instanceof Term && data.grouped) {
        expression = data.structure.content[0] as Expression;
    }else if(data.structure instanceof Expression){
        expression = data.structure;
    }else return null;

    return [
        new Formula([replace(data.formula.equalityParts[data.partIndex], data.structure, simplifyTerms(expression))])
    ]
});

availibleActions.set("destribute", ()=>{
    if(selected.type != 'structure') return null;
    let data = selected.getStructureData();
    if(data.grouped || !(data.structure instanceof Expression)) return null;
    let parent = data.structure.parent;
    if(!(parent instanceof Term)) return null;
    let dTerm = new Term(parent.content.filter(child => child != data.structure).map(child => child.copy()), parent.sign);
    let content = data.structure.content.map(child => multTerms(child, dTerm));
    return [
        new Formula([replace(data.formula.equalityParts[data.partIndex], parent, new Expression(content))])
    ]
});

availibleActions.set("move-out", (input?: Expression)=>{
    if(!input || selected.type != 'structure') return null;
    let data = selected.getStructureData();
    
    let structure = data.structure instanceof Term ? data.structure.content[0] : data.structure;
    if(!(structure instanceof Expression)) return null;

    let inputTerm = toTerm(input);
    let revInputTerm = reverseTerm(inputTerm);
    let breacketContent = structure.content.map(child => multTerms(revInputTerm, child));
    let fullTerm = multTerms(inputTerm, new Term([new Expression(breacketContent)]));
    return [
        new Formula([replace(data.formula.equalityParts[data.partIndex], data.structure, fullTerm)])
    ]
});

availibleActions.set("separate", ()=>{
    if(selected.type != 'structure') return null;
    let {partIndex, structure, formula} = selected.getStructureData();
    if(formula.equalityParts[partIndex].content.length != 1) return null;
    let {num: numContent, den: denContent, sign: partSign} = termAsFracContent(formula.equalityParts[partIndex].content[0]);

    let reverse = false
    if(numContent.includes(structure)){
        numContent = numContent.filter(mult => mult != structure);
    }else if(structure instanceof Term && numContent.includes(structure.content[0])){
        numContent = numContent.filter(mult => !(structure as Term).content.includes(mult));
        if(structure.sign == '-') partSign = partSign == "+" ? "-" : "+";
    }else if(denContent.includes(structure)){
        denContent = denContent.filter(mult => mult != structure);
        reverse = true;
    }else if(structure instanceof Term && denContent.includes(structure.content[0])){
        denContent = denContent.filter(mult => !(structure as Term).content.includes(mult));
        if(structure.sign == '-') partSign = partSign == "+" ? "-" : "+"; 
        reverse = true;
    }else if(structure instanceof Frac && numContent.includes(structure.numerator.content[0])) {
        numContent = numContent.filter(mult => mult != (structure as Frac).numerator.content[0]);
        denContent = denContent.filter(mult => mult != (structure as Frac).denomerator.content[0]);
        if(structure.numerator.sign != structure.denomerator.sign) partSign = partSign == "+" ? "-" : "+";
    }else return null;

    let mTerm = new Term([
        new Frac(new Term(denContent.map(m => m.copy())), new Term(numContent.map(m => m.copy())))
    ], partSign); // reversed term

    let secondPartIndex = partIndex == 0 ? formula.equalityParts.length-1 : 0;
    let otherPartTerm = toTerm(formula.equalityParts[secondPartIndex]); // other part as term
    otherPartTerm = termToFrac(multTerms(otherPartTerm, mTerm)); // complete other part as frac

    if(reverse) otherPartTerm = reverseTerm(otherPartTerm);
    otherPartTerm = fracToTerm(otherPartTerm.content[0] as Frac, otherPartTerm.sign);
    return [
        new Formula([toExpression(structure), toExpression(otherPartTerm)]),
    ]
});

availibleActions.set("toCDen", ()=>{
    if(selected.type != 'structure') return null;
    let data = selected.getStructureData();
    
    let structure = data.structure instanceof Term ? data.structure.content[0] : data.structure;
    if(!(structure instanceof Expression)) return null;

    let structContent = structure.content.map(t => termToFrac(t));

    let den = new Term([]);

    for(let curTerm of structContent){
        let frac = curTerm.content[0] as Frac;
        let simlified = simplifyFrac(new Term([new Frac(frac.denomerator.copy(), den.copy())]));
        let content = (simlified.content[0] as Frac).numerator.content
            .filter(m => !(m instanceof Exponent) || m.exponent.content.length > 1 || m.exponent.content[0].sign == "+");
        den = multTerms(den, new Term(content.map(m => m.copy())));
    }

    let numContent: Term[] = [];
    for(let curTerm of structContent){
        let curMult = multTerms(den, reverseTerm((curTerm.content[0] as Frac).denomerator));
        let curNum = (curTerm.content[0] as Frac).numerator;
        if(curTerm.sign == '-') curNum = changeTermSign(curNum);
        numContent.push(multTerms(curNum, curMult));
    }

    let newStruct = new Term([new Frac(new Term([new Expression(numContent)]), den)]);
    return [
        new Formula([replace(data.formula.equalityParts[data.partIndex], data.structure, newStruct)])
    ]
});


