import { Expression } from "../../math-structures/expression";
import { Formula } from "../../math-structures/formula";
import { MathStruct, Multiplier } from "../../math-structures/math-structure";
import { Term } from "../../math-structures/term";
import { getParents } from "../structure-actions";

export class SelectedStructures extends Map<HTMLElement, MathStruct>{
    constructor(){
        super();
    }

    get type(): "formula" | "structure" | null{
        if(!this.size) return null;
        if(Array.from(this.values()).every(struct => struct instanceof Formula && struct.equalityParts.length >= 2)) 
            return "formula";
        let parent: MathStruct | null = this.values().next().value.parent;
        if(!parent) return this.size == 1 ? "structure" : null;
        if(parent instanceof Formula) return null;
        return Array.from(this.values()).every(struct => struct.parent == parent) ? "structure" : null;
    }

    get selectedFormulas(): Formula[] | null{
        if(this.type != "formula") return null;
        return Array.from(this.values()) as Formula[];
    }

    get selectedStructures(): MathStruct[] | null{
        if(this.type != "structure") return null;
        return Array.from(this.values());
    }

    getStructureData(): {formula: Formula, structure: Multiplier | Term}{
        if(this.type != "structure") throw new Error("Selected type must be 'structure'");
        let structures: MathStruct[] = Array.from(this.values());
        let formula = getParents(structures[0]).at(-1) || structures[0];
        if(!(formula instanceof Formula)) throw new Error("Formula not found");
        if(structures.length == 1){
            let structure = structures[0] instanceof Formula ? structures[0].equalityParts[0] : structures[0];
            return {formula, structure};
        }
        let newStruct: Term | Expression;
        if(structures[0] instanceof Term){
            newStruct = new Term([new Expression(structures.map(struct=>struct.copy() as Term))]);
        }else{
            newStruct = new Expression([new Term(structures.map(struct=>struct.copy() as Multiplier))]);
        }

        const callback = (struct: MathStruct): MathStruct => {
            if(struct != structures[0].parent) return struct.changeStructure(callback);
            let children = struct.children.filter(child => !structures.includes(child)).map(child => child.copy());
            children.splice(struct.children.indexOf(structures[0]),0, newStruct);
            if(struct instanceof Term){
                return new Term(children);
            }else{
                return new Expression(children as Term[]);
            }
        }
        return {formula: formula.changeStructure(callback), structure: newStruct};
    }
}