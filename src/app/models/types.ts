export interface FormulaAction {
    id: string,
    categoryId: number,
    template: boolean,
    type: "formula" | "expression",
    name: string,
    body?: string,
    requireInput?: boolean
}

export interface FormulaDefinition {
    id: string,
    categoryId: number,
    text: string
    formula: string;
}