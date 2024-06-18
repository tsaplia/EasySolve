import { Expression } from "@angular/compiler";
import { SubPartModes } from "../modules/math-actions/templates/part-substitution";
import { Formula } from "../modules/math-structures/formula";

export interface FormulaActionConfig {
    id: string,
    categoryId: number,
    template: boolean,
    type: "formula" | "expression",
    name: string,
    body?: string[],
    requireInput?: boolean
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