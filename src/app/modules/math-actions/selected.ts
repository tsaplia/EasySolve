import { MathStruct } from "../math-structures/math-structure";

export const selected: Map<Element, MathStruct> = new Map();

function addSelected(struct: MathStruct, elem: Element){
    selected.set(elem, struct);
    elem.classList.add("selected");
}

function removeSelected(elem: Element){
    selected.delete(elem);
    elem.classList.remove("selected");
}

export function setListener(struct: MathStruct, elem: HTMLElement){
    elem.addEventListener("click", (event) => {
        console.log(selected)
        if(selected.has(elem)){
            removeSelected(elem);
        }else{
            addSelected(struct, elem);
        }
        event.stopPropagation();
    });
    elem.addEventListener('mouseenter', (event) => {
        let mouseEvent = event as MouseEvent;
        if(mouseEvent.buttons !== 1) return;
        if(mouseEvent.ctrlKey){
            removeSelected(elem);
        }else{
            addSelected(struct, elem);
        }
        event.stopPropagation();
    });
}