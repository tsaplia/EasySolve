import { Formula } from "../../math-structures/formula";
import { selected } from "../selection/selected";

export type SubPartModes = "newLine" | "replace" | "addToEnd";

export function availableModes(type?: "formula" | "structure") {
    let res = { newLine: false, replace: false, addToEnd: false };
    let selectedType = type ?? selected.type;
    if (selectedType) res.newLine = true;
    if (selectedType == "structure") {
        res.replace = true;
        let data = selected.getStructureData();
        if (data.partIndex == data.formula.equalityParts.length - 1) res.addToEnd = true;
    }
    return res;
}

export function useMode(mode: SubPartModes, results: Formula[]): Formula[] {
    if (!selected.type) throw new Error("Nothing selected");
    if (results[0].equalityParts.length > 1) return results;
    let data = selected.getStructureData();
    let { formula: originalFormula, partIndex } = selected.structuresParent!;
    let newPart = results[0].equalityParts[0].copy();
    switch (mode) {
    case "newLine":
        if (partIndex == 0) return [new Formula([newPart, originalFormula.equalityParts.at(-1)!.copy()])];
        return [new Formula([originalFormula.equalityParts[0].copy(), newPart])];
    case "replace":
        return [new Formula(
            originalFormula.equalityParts.map((part, i) => i == data.partIndex ? newPart : part.copy())
        )];
    case "addToEnd":
        return [new Formula([...originalFormula.equalityParts.map(part => part.copy()), newPart])];
    }
}
