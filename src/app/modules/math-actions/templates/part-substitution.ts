import { Formula } from "../../math-structures/formula";
import { selected } from "../selection/selected";

export type SubPartModes = {
    newLine: boolean,
    replace: boolean,
    addToEnd: boolean
};

export function availableModes(type?: "formula" | "structure"): SubPartModes{
    let res: SubPartModes = {newLine: false, replace: false, addToEnd: false};
    let selectedType = type || selected.type;
    if(selectedType) res.newLine = true;
    if(selectedType == 'structure'){
        res.replace = true;
        let data = selected.getStructureData();
        if(data.partIndex == data.formula.equalityParts.length - 1) res.addToEnd = true;
    }
    return res;
}

export function useMode(mode: keyof SubPartModes, results: Formula[]): Formula[]{;
    if(!selected.type) throw new Error("Nothing selected");
    if(selected.type == 'formula') return results;
    let data = selected.getStructureData();
    let newPart = results[0].equalityParts[0].copy();
    switch(mode){
        case "newLine": 
            return [new Formula([data.formula.equalityParts[0].copy(), newPart])];
        case "replace": 
            return [new Formula(
                data.formula.equalityParts.map((part, i) => i == data.partIndex ? newPart : part.copy())
            )];
        case "addToEnd": 
            return [new Formula([...data.formula.equalityParts.map(part=>part.copy()), newPart])];
    }
}
