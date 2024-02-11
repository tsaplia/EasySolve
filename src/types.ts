interface FormulaAction {
    id: string,
    category: string,
    template: boolean,
    type: "formula" | "expression",
    body: string | null,
    name: string
}