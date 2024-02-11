interface FormulaAction {
    id: string,
    category: string,
    action: boolean,
    type: "formula" | "expression",
    body: string | null,
    name: string
}