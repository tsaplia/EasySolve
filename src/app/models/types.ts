import { SubPartModes } from "../modules/math-actions/templates/part-substitution";
import { Multiplier } from "../modules/math-structures/math-structure";
import { Term } from "../modules/math-structures/term";

export type FormulaReplacement = {from: Term | Multiplier, to: Term | Multiplier}

export type Simplification = "like-terms" | "distribute" | "frac";

export type Simplifications = {[key: string]: Simplification}

export interface FormulaActionConfig {
    id: string,
    categoryId: number,
    template: boolean,
    type: "formula" | "expression",
    name: string,
    body?: string[],
    requireInput?: boolean
    simp?: Simplifications
}

export interface FormulaDefinition {
    id: string,
    categoryId: number,
    text: string
    formula: string;
}

export interface HotkeyConfigs {
    id: string,
    key: string,
    ctrl: boolean,
    alt: boolean,
    shift: boolean
}

export interface ActionHotkeyConfig extends HotkeyConfigs {
    options: {
        mode: SubPartModes,
        requireInput?: boolean
    }
}