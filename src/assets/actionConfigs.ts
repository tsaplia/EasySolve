import { FormulaActionConfig } from "src/app/models/types";

export let templates: FormulaActionConfig[] = [
  {
    id:"algebra-1",
    categoryId: 1,
    template:true,
    type:"expression",
    body: ["\\left([a]+[b]\\right)^2=>[a]^2+2[a][b]+[b]^2"],
    name:"$\\left(a+b\\right)^2=a^2+2ab+b^2$"
  },
  {
    id: "algebra-2",
    categoryId: 1,
    template: true,
    type:"expression",
    body:["[a]^2-[b]^2=>\\left([a]-[b]\\right)\\left([a]+[b]\\right)"],
    name:"$a^2-b^2=\\left(a-b\\right)\\left(a+b\\right)$"
  },
  {
    id:"formula-1",
    categoryId: 3,
    template:true,
    type:"formula",
    body:["[a]=[b];[c]=[d]=>[a]+[c]=[b]+[d]"],
    name: "Add formulas"
  },
  {
    id: "formula-2",
    categoryId: 3,
    template: true,
    type: "formula",
    body: ["[a]=[b];[c]=[d]=>[a]-[c]=[b]-[d]"],
    name: "Subtract formulas"
  },
  {
    id: "formula-3",
    categoryId: 3,
    template: true,
    type: "formula",
    body: ["[a]=[b]=>[_in][a]=[_in][b]"],
    name: "Multiply by k",
    requireInput: true,
    simp: {"a": "distribute", "b": "distribute"}
  },
  {
    id:"sub-1",
    categoryId: 4,
    template:false,
    type:"formula",
    name: "Subtitute from"
  },
  {
    id:"sub-2",
    categoryId: 4,
    template:false,
    type:"expression",
    name: "Subtitute to"
  },
  {
    id:"group",
    categoryId: 5,
    template:false,
    type:"expression",
    name: "Group"
  },
  {
    id: "move-l",
    categoryId: 5,
    template:false,
    type:"expression",
    name: "Move left"
  },
  {
    id: "move-r",
    categoryId: 5,
    template:false,
    type:"expression",
    name: "Move Right"
  },
  {
    id: "change-part",
    categoryId: 5,
    template:false,
    type:"formula",
    name: "To another part"
  },
  {
    id: "simp-terms",
    categoryId: 6,
    template:false,
    type:"expression",
    name: "Collect like terms"
  },
  {
    id: "simp-frac-1",
    categoryId: 6,
    template: true,
    type: "expression",
    body: [
      "\\frac{\\frac{[a]}{[b]}}{[c]}=>\\frac{[a]}{[b][c]}",
      "\\frac{[a]}{\\frac{[b]}{[c]}}=>\\frac{[a][c]}{[b]}",
    ],
    name: "Simplify fraction"
  }, 
  {
    id: "distribute",
    categoryId: 1,
    template:false,
    type:"expression",
    name: "Open brackets"
  },
  {
    id: "move-out",
    categoryId: 1,
    template: false,
    type: "expression",
    name: "Move out of breacket",
    requireInput: true
  },
  {
    id: "separate",
    categoryId: 1,
    template: false,
    type: "formula",
    name: "Separate multiplier",
  },
  {
    id: "toCDen",
    categoryId: 1,
    template: false,
    type: "expression",
    name: "To common denominator",
  },
  {
    id: "powers-1",
    categoryId: 7,
    template: true,
    body: ["[a]^{[b]}=>\\frac{1}{a^{-[b]}}"],
    type: "expression",
    name: "$a^b=\\frac{1}{a^{-b}}$"
  }
]