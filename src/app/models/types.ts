export interface FormulaAction {
    id: string,
    categoryId: number,
    template: boolean,
    type: "formula" | "expression",
    body: string | null,
    name: string
}