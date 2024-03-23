export interface FormulaAction {
    id: string,
    categoryId: number,
    template: boolean,
    type: "formula" | "expression",
    body: string | null,
    name: string
}

export interface FormulaDefinition {
    id: string,
    categoryId: number,
    text: string
    formula: string;
}