import { Func } from "../../math-structures/function";
import { MathStruct } from "../../math-structures/math-structure";
import { Sqrt } from "../../math-structures/sqrt";
import { Term } from "../../math-structures/term";
import { getParents, getChildren } from "../structure-actions";
import { SelectedStructures } from "./selected-structures";

export const selected: SelectedStructures = new SelectedStructures();
const allStructures: Map<MathStruct, HTMLElement> = new Map();

const disabledTargets = ['(', ')'];

export function clearSelected(){
    Array.from(selected.keys()).forEach(elem => {
        elem.classList.remove("selected");
    });
    selected.clear();
}

function addSelected(struct: MathStruct){
    let elem = allStructures.get(struct) as HTMLElement;
    if(!elem) throw new Error("Element not found");
    selected.set(elem, struct);
    elem.classList.add("selected");
}

function removeSelected(struct: MathStruct){
    let elem = allStructures.get(struct) as HTMLElement;
    if(!elem) throw new Error("Element not found");
    selected.delete(elem);
    elem.classList.remove("selected");
}

// Select element if all children are selected 
function checkParentSelection(struct: MathStruct | null){
    if(!struct || struct instanceof Func || struct instanceof Sqrt) return;
    if(struct.children.every(child => selected.has(allStructures.get(child) as HTMLElement))){ 
        if(struct instanceof Term && struct.sign == '-') return; // do not select term with '- sign
        addSelected(struct);
        struct.children.forEach((child)=>removeSelected(child));
        checkParentSelection(struct.parent);
    }
}

export function removeStruct(elem: HTMLElement): void{
    elem.querySelectorAll('.struct').forEach((structEl)=>{
        selected.delete(structEl as HTMLElement);
        Array.from(allStructures.entries()).forEach(([key, val])=>{
            if(val == structEl) allStructures.delete(key);
        });
    });
}

// get HTML (MJX element) with selected structures
export function getSelectedElement(){
    if(selected.type != "structure") return null;
    let selStruct: MathStruct = selected.values().next().value;
    let formula = getParents(selStruct).at(-1) || selStruct;
    return allStructures.get(formula)?.parentElement?.parentElement as HTMLElement;
}

export function setListener(struct: MathStruct, elem: HTMLElement){
    let findSelected = (structures: MathStruct[]) => structures.find(struct => selected.has(allStructures.get(struct) as HTMLElement));
    let targetCheck = (t: HTMLElement) => t.localName == "mjx-c" && !disabledTargets.includes(getComputedStyle(t, 'before').content);

    elem.classList.add("struct");
    allStructures.set(struct, elem);
    let parents = getParents(struct);
    let children = getChildren(struct);
    elem.addEventListener("click", (event) => {
        if(!targetCheck(event.target as HTMLElement)) return;
        if(selected.has(elem)){
            removeSelected(struct);
            event.stopPropagation();
        }else if(!findSelected(parents)){
            addSelected(struct);
            checkParentSelection(struct.parent);
            children.forEach((child)=>removeSelected(child));
            event.stopPropagation();
        }
    });
    elem.addEventListener('mousemove', (event) => {
        if(!targetCheck(event.target as HTMLElement) || event.buttons !== 1) return;
        if(selected.has(elem)){
            if(event.ctrlKey) removeSelected(struct);
            event.stopPropagation();
        }else if(!findSelected(parents) && !event.ctrlKey){
            addSelected(struct);
            checkParentSelection(struct.parent);
            children.forEach((child)=>removeSelected(child));
            event.stopPropagation();
        }
    });
}