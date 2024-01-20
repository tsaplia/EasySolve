import { Func } from "../../math-structures/function";
import { MathStruct } from "../../math-structures/math-structure";
import { Sqrt } from "../../math-structures/sqrt";

export const selected: Map<HTMLElement, MathStruct> = new Map();
const allStructures: Map<MathStruct, HTMLElement> = new Map();

const disabledTargets = ['(', ')'];

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

function checkParentSelection(struct: MathStruct | null){
    if(!struct || struct instanceof Func || struct instanceof Sqrt) return;
    if(struct.children.every(child => selected.has(allStructures.get(child) as HTMLElement))){ 
        addSelected(struct);
        struct.children.forEach((child)=>removeSelected(child));
        checkParentSelection(struct.parent);
    }
}

function getParents(struct: MathStruct): MathStruct[] {
    let parents: MathStruct[] = [];
    while(struct.parent){
        parents.push(struct.parent);
        struct = struct.parent;
    }
    return parents;
}

function getChildren(struct: MathStruct): MathStruct[] {
    let children: MathStruct[] = [];
    function get(struct: MathStruct){
        struct.children.forEach((child) => {
            children.push(child);
            get(child);
        });
    }
    get(struct);
    return children;
}

export function setListener(struct: MathStruct, elem: HTMLElement){
    let findSelected = (structures: MathStruct[]) => structures.find(struct => selected.has(allStructures.get(struct) as HTMLElement));
    let targetCheck = (t: HTMLElement) => t.localName == "mjx-c" && !disabledTargets.includes(getComputedStyle(t, 'before').content);

    allStructures.set(struct, elem);
    let parents = getParents(struct);
    let children = getChildren(struct);
    elem.addEventListener("click", (event) => {
        if(!targetCheck(event.target as HTMLElement)) return;
        console.log("click", struct);
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
    elem.addEventListener('mouseover', (event) => {
        if(!targetCheck(event.target as HTMLElement) || event.buttons !== 1) return;
        console.log("mouseover", struct);
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