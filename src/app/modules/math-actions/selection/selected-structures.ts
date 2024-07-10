/* eslint-disable @typescript-eslint/ban-types */
import { Expression } from "../../math-structures/expression";
import { Formula } from "../../math-structures/formula";
import { Frac } from "../../math-structures/fraction";
import { type MathStruct, type Multiplier } from "../../math-structures/math-structure";
import { Term } from "../../math-structures/term";
import { getParents, toExpression } from "../general-actions";

export interface StructureData {
    formula: Formula
    structure: Multiplier | Term
    partIndex: number
    grouped: boolean
}

export class SelectedStructures extends Set<MathStruct> {
    _listeners: Function[] = [];

    /* change listeners */
    addListener(listener: Function): void {
        this._listeners.push(listener);
    }

    private _activateListeners(): void {
        this._listeners.forEach(listener => listener());
    }

    override add(struct: MathStruct): this {
        this._activateListeners();
        return super.add(struct);
    }

    override delete(struct: MathStruct): boolean {
        this._activateListeners();
        return super.delete(struct);
    }

    override clear(): void {
        this._activateListeners();
        return super.clear();
    }

    get type(): "formula" | "structure" | null {
        if (!this.size) return null;
        if (Array.from(this.values()).every(struct => struct instanceof Formula && struct.equalityParts.length >= 2)) {
            return "formula";
        }
        let parent: MathStruct | null = this.values().next().value.parent;
        if (!parent || (parent instanceof Formula)) return this.size == 1 ? "structure" : null;
        // if selected elements have common parent
        if (Array.from(this.values()).every(struct => struct.parent == parent)) return "structure";
        // if selected elements are parts of a fraction
        return Array.from(this.values()).every(struct =>
            struct.parent instanceof Frac || struct.parent?.parent instanceof Frac) ?
            "structure" :
            null;
    }

    get formulas(): Formula[] | null {
        if (this.type != "formula") return null;
        return Array.from(this.values()) as Formula[];
    }

    get structures(): MathStruct[] | null {
        if (this.type != "structure") return null;
        return Array.from(this.values());
    }

    get structuresParent(): { formula: Formula, partIndex: number } | null {
        if (this.type != "structure") return null;
        let selStruct: MathStruct = this.values().next().value;
        let parents = [selStruct, ...getParents(selStruct)];
        let formula = parents.at(-1);
        if (!(formula instanceof Formula)) throw new Error("Formula not found");
        let partIndex = formula.equalityParts.indexOf(parents.at(-2) as Expression || formula.equalityParts[0]);
        return { formula, partIndex };
    }

    getStructureData(): StructureData {
        if (this.type != "structure") throw new Error("Selected type must be 'structure'");
        let structures: MathStruct[] = Array.from(this.values());

        let parents = [structures[0], ...getParents(structures[0])];
        let formula = getParents(structures[0]).at(-1) ?? structures[0];
        if (!(formula instanceof Formula)) throw new Error("Formula not found");
        let partIndex = formula.equalityParts.indexOf(parents.at(-2) as Expression || formula.equalityParts[0]);
        if (partIndex == -1) throw new Error("Equality part not found");

        // if we don't have groupping
        if (structures.length == 1) {
            // check if we nees groupping for term  with "-" sign
            if ((!(structures[0] instanceof Term) || structures[0].sign == "+" || !(structures[0].parent instanceof Expression))) {
                let structure = structures[0] instanceof Formula ? structures[0].equalityParts[0] : structures[0];
                return { formula, structure, partIndex, grouped: false };
            }
        }
        let newStructs: Array<Term | Multiplier>;
        if (structures.every(struct => struct.parent == parents[1])) {
            // if selected elements have common parent
            structures = parents[1].children.filter(struct => structures.includes(struct));
            if (structures[0] instanceof Term) {
                newStructs = [new Term([new Expression(structures.map(struct => struct.copy() as Term))])];
            } else {
                newStructs = [new Expression([new Term(structures.map(struct => struct.copy() as Multiplier))])];
            }
        } else {
            // if selected elements are parts of a fraction
            let frac = structures[0].parent instanceof Frac ? structures[0].parent : structures[0].parent?.parent as Frac;
            let splitTerm = (term: Term): [Term, Term | null] => {
                if (structures.includes(term)) return [term.copy(), null];
                let sel = term.content.filter(s => structures.includes(s)).map(s => s.copy());
                let rest = term.content.filter(s => !structures.includes(s)).map(s => s.copy());
                return [new Term(sel), new Term(rest, term.sign)];
            };
            let [selNum, restNum] = splitTerm(frac.numerator);
            let [selDen, restDen] = splitTerm(frac.denomerator);
            if (!restNum) restNum = new Term([]);
            newStructs = [new Frac(selNum, selDen)];
            if (restDen) newStructs.push(new Frac(restNum, restDen));
            else if (restNum.sign == "+") newStructs.push(...restNum.content.map(struct => struct.copy()));
            else newStructs.push(toExpression(restNum));
            structures = [frac];
        }

        const callback = (struct: MathStruct): MathStruct => {
            if (struct != structures[0].parent) return struct.changeStructure(callback);
            let children = struct.children.filter(c => !structures.includes(c)).map(c => c.copy());
            children.splice(struct.children.indexOf(structures[0]), 0, ...newStructs);
            if (struct instanceof Term) {
                return new Term(children);
            } else {
                return new Expression(children as Term[]);
            }
        };
        return {
            formula: formula.changeStructure(callback), structure: newStructs[0], partIndex, grouped: true
        };
    }
}
