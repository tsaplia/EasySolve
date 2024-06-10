import { SubPartModes } from "../modules/math-actions/templates/part-substitution";

export interface FormulaAction {
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