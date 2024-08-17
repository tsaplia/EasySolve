import type { FormulaActionConfig } from "src/app/models/types";

export let templates: FormulaActionConfig[] = [
    {
        id: "algebra-1",
        categoryId: 2,
        template: true,
        type: "expression",
        body: [
            "\\left([a]+[b]\\right)^2=>[a]^2+2[a][b]+[b]^2",
            "[a]^2+2[a][b]+[b]^2=>\\left([a]+[b]\\right)^2",
            "\\left([a]-[b]\\right)^2=>[a]^2-2[a][b]+[b]^2",
            "[a]^2-2[a][b]+[b]^2=>\\left([a]-[b]\\right)^2"
        ],
        name: "$\\left(a\\pm b\\right)^2=a^2\\pm 2ab+b^2$"
    },
    {
        id: "algebra-2",
        categoryId: 2,
        template: true,
        type: "expression",
        body: [
            "[a]^2-[b]^2=>\\left([a]-[b]\\right)\\left([a]+[b]\\right)",
            "\\left([a]-[b]\\right)\\left([a]+[b]\\right)=>[a]^2-[b]^2"
        ],
        name: "$a^2-b^2=\\left(a-b\\right)\\left(a+b\\right)$"
    },
    {
        id: "formula-1",
        categoryId: 3,
        template: true,
        type: "formula",
        body: ["[a]=[b];[c]=[d]=>[a]+[c]=[b]+[d]"],
        name: "Add equations"
    },
    {
        id: "formula-2",
        categoryId: 3,
        template: true,
        type: "formula",
        body: ["[a]=[b];[c]=[d]=>[a]-[c]=[b]-[d]"],
        name: "Subtract equations"
    },
    {
        id: "formula-3",
        categoryId: 3,
        template: true,
        type: "formula",
        body: ["[a]=[b]=>[_in][a]=[_in][b]"],
        name: "Multiply by k",
        requireInput: true,
        simp: { "a": "distribute", "b": "distribute" }
    },
    {
        id: "sub-1",
        categoryId: 4,
        template: false,
        type: "formula",
        name: "Subtitute from"
    },
    {
        id: "sub-2",
        categoryId: 4,
        template: false,
        type: "expression",
        name: "Subtitute to"
    },
    {
        id: "group",
        categoryId: 5,
        template: false,
        type: "expression",
        name: "Group"
    },
    {
        id: "move-l",
        categoryId: 5,
        template: false,
        type: "expression",
        name: "Move left"
    },
    {
        id: "move-r",
        categoryId: 5,
        template: false,
        type: "expression",
        name: "Move Right"
    },
    {
        id: "change-part",
        categoryId: 5,
        template: false,
        type: "formula",
        name: "To another part"
    },
    {
        id: "like-terms",
        categoryId: 6,
        template: false,
        type: "expression",
        name: "Collect like terms"
    },
    {
        id: "simp-frac",
        categoryId: 6,
        template: false,
        type: "expression",
        name: "Flip fraction"
    },
    {
        id: "simp-term",
        categoryId: 6,
        template: false,
        type: "expression",
        name: "Simplify term"
    },
    {
        id: "distribute",
        categoryId: 1,
        template: false,
        type: "expression",
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
        name: "Separate multiplier"
    },
    {
        id: "toCDen",
        categoryId: 1,
        template: false,
        type: "expression",
        name: "To common denominator"
    },
    {
        id: "calc",
        categoryId: 1,
        template: false,
        type: "expression",
        name: "Calculate"
    },
    {
        id: "powers-1",
        categoryId: 7,
        template: true,
        body: [
            "[a]^{[n]}[a]^{[m]}=>[a]^{[n]+[m]}",
            "[a]^{[n]}[a]=>[a]^{[n]+1}",
            "[a][a]=>a^2",
            "[a]^{[n]+[m]}=>[a]^{[n]}[a]^{[m]}",
            "[a]^{[n]-[m]}=>[a]^{[n]}[a]^{-[m]}"
        ],
        type: "expression",
        name: "$a^n\\cdot a^m=a^{n+m}$"
    },
    {
        id: "powers-2",
        categoryId: 7,
        template: true,
        body: [
            "\\frac{[a]^{[n]}}{[a]^{[m]}}=>[a]^{[n]-[m]}",
            "\\frac{[a]^{[n]}}{[a]}=>[a]^{[n]-1}",
            "\\frac{[a]}{[a]^{[m]}}=>[a]^{1-[m]}",
            "\\frac{[a]}{[a]}=>1",
            "[a]^{[n]-[m]}=>\\frac{[a]^{[n]}}{[a]^{[m]}}"
        ],
        type: "expression",
        name: "$\\frac{a^n}{a^m}=a^{n-m}$"
    },
    {
        id: "powers-3",
        categoryId: 7,
        template: true,
        body: [
            "\\left([a]^{[n]}\\right)^{[m]}=>[a]^{[n][m]}",
            "[a]^{[n][m]}=>\\left([a]^{[n]}\\right)^{[m]}"
        ],
        type: "expression",
        name: "$\\left(a^n\\right)^m=a^{n\\cdot m}$"
    },
    {
        id: "powers-4",
        categoryId: 7,
        template: true,
        body: [
            "[a]^{[n]}[b]^{[n]}=>\\left([a][b]\\right)^{[n]}",
            "\\left([a][b]\\right)^{[n]}=>[a]^{[n]}[b]^{[n]}"
        ],
        type: "expression",
        name: "$a^n\\cdot b^n=\\left(ab\\right)^n$"
    },
    {
        id: "powers-5",
        categoryId: 7,
        template: true,
        body: [
            "\\frac{[a]^{[n]}}{[b]^{[n]}}=>\\left(\\frac{[a]}{[b]}\\right)^{[n]}",
            "\\left(\\frac{[a]}{[b]}\\right)^{[n]}=>\\frac{[a]^{[n]}}{[b]^{[n]}}"
        ],
        type: "expression",
        name: "$\\frac{a^n}{b^n}=\\left(\\frac{a}{b}\\right)^n$"
    },
    {
        id: "powers-6",
        categoryId: 7,
        template: true,
        body: [
            "[a]^{-[n]}=>\\frac{1}{[a]^{[n]}}",
            "[a]^{[n]}=>\\frac{1}{[a]^{-[n]}}"
        ],
        type: "expression",
        name: "$a^{-n}=\\frac{1}{a^n}$"
    },
    {
        id: "powers-7",
        categoryId: 7,
        template: true,
        body: ["\\left(\\frac{[a]}{[b]}\\right)^{-[n]}=>\\left(\\frac{[b]}{[a]}\\right)^{[n]}"],
        type: "expression",
        name: "$\\left(\\frac{a}{b}\\right)^{-n}=\\left(\\frac{b}{a}\\right)^n$"
    },
    {
        id: "powers-8",
        categoryId: 7,
        template: true,
        body: [
            "[x]^0=>1",
            "[x]^1=>[x]",
        ],
        type: "expression",
        name: "$x^0=1$; $x^1=x$"
    },
    {
        id: "roots-1",
        categoryId: 8,
        template: true,
        body: [
            "\\sqrt[[n]]{[a]}\\sqrt[[n]]{[b]}=>\\sqrt[[n]]{[a][b]}",
            "\\sqrt[[n]]{[a][b]}=>\\sqrt[[n]]{[a]}\\sqrt[[n]]{[b]}"
        ],
        type: "expression",
        name: "$\\sqrt[n]{a}\\sqrt[n]{b}=\\sqrt[n]{ab}$"
    },
    {
        id: "roots-2",
        categoryId: 8,
        template: true,
        body: [
            "\\frac{\\sqrt[[n]]{[a]}}{\\sqrt[[n]]{[b]}}=>\\sqrt[[n]]{\\frac{[a]}{[b]}}",
            "\\sqrt[[n]]{\\frac{[a]}{[b]}}=>\\frac{\\sqrt[[n]]{[a]}}{\\sqrt[[n]]{[b]}}"
        ],
        type: "expression",
        name: "$\\frac{\\sqrt[n]{a}}{\\sqrt[n]{b}}=\\sqrt[n]{\\frac{a}{b}}$"
    },
    {
        id: "roots-5",
        categoryId: 8,
        template: true,
        body: [
            "\\sqrt[[n]]{[a]^{[n]}}=>[a]",
            "\\sqrt[[n]]{[a]^{[m]}}=>[a]^{\\frac{[m]}{[n]}}",
            "\\sqrt[[n]]{[a]}=>[a]^{\\frac{1}{[n]}}",
            "[a]^{\\frac{1}{[n]}=>\\sqrt[[n]]{[a]}",
            "[a]^{\\frac{[m]}{[n]}}=>\\sqrt[[n]]{[a]^{[m]}}"
        ],
        type: "expression",
        name: "$\\sqrt[n]{a^m}=a^{\\frac{m}{n}}$"
    },
    {
        id: "roots-6",
        categoryId: 8,
        template: true,
        body: [
            "[a]\\sqrt[[n]]{[b]}=>\\sqrt[[n]]{[a]^{[n]}[b]}"
        ],
        type: "expression",
        name: "$a\\sqrt[n]{b}=\\sqrt[n]{a^nb}$"
    },
    {
        id: "roots-3",
        categoryId: 8,
        template: true,
        body: [
            "\\sqrt[[n]]{\\sqrt[[m]]{[a]}}=>\\sqrt[[n][m]]{[a]}",
            "\\sqrt[[n][m]]{[a]}=>\\sqrt[[n]]{\\sqrt[[m]]{[a]}}"
        ],
        type: "expression",
        name: "$\\sqrt[n]{\\sqrt[m]{a}}=\\sqrt[n\\cdot m]{a}$"
    },
    {
        id: "roots-4",
        categoryId: 8,
        template: true,
        body: [
            "\\left(\\sqrt[[n]]{[a]}\\right)^{[m]}=>\\sqrt[[n]]{[a]^{[m]}}",
            "\\sqrt[[n]]{[a]^{[m]}}=>\\left(\\sqrt[[n]]{[a]}\\right)^{[m]}"
        ],
        type: "expression",
        name: "$\\left(\\sqrt[n]{a}\\right)^m=\\sqrt[n]{a^m}$"
    }
];
