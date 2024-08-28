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
        // "\\sum_{n=0}^\\infty {\\mathtip{x}{\\text{converges for }|x|\\lt 1 }}^n = \\frac{1}{1-x}" // example
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
        name: "Add equations",
        description: "\\text{Eg: } a=b;c=d\\ \\Rightarrow\\ a+c=b+d"
    },
    {
        id: "formula-2",
        categoryId: 3,
        template: true,
        type: "formula",
        body: ["[a]=[b];[c]=[d]=>[a]-[c]=[b]-[d]"],
        name: "Subtract equations",
        description: "\\text{Eg: } a=b;c=d\\ \\Rightarrow\\ a-c=b-d"
    },
    {
        id: "formula-3",
        categoryId: 3,
        template: true,
        type: "formula",
        body: ["[a]=[b]=>[_in][a]=[_in][b]"],
        name: "Multiply by k",
        requireInput: true,
        simp: { "a": "distribute", "b": "distribute" },
        description: "\\text{Eg: } x+y=5;\\text{ input:}2\\ \\Rightarrow\\ 2x+2y=10"
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
        name: "Group",
        description: "\\text{Add extra brackets around selected multipliers or terms}"
    },
    {
        id: "move-l",
        categoryId: 5,
        template: false,
        type: "expression",
        name: "Move left",
        description: "\\text{Change the position of a multiplier or term to the left}"
    },
    {
        id: "move-r",
        categoryId: 5,
        template: false,
        type: "expression",
        name: "Move Right",
        description: "\\text{Change the position of a multiplier or term to the right}"
    },
    {
        id: "change-part",
        categoryId: 5,
        template: false,
        type: "formula",
        name: "To another part",
        description: "\\text{Eg. } x+y-5=0 \\Rightarrow x+y=5"
    },
    {
        id: "like-terms",
        categoryId: 6,
        template: false,
        type: "expression",
        name: "Collect like terms",
        description: "\\text{Eg: }2x+3y-x-2y\\Rightarrow x+y"
    },
    {
        id: "simp-frac",
        categoryId: 6,
        template: false,
        type: "expression",
        name: "Flip fraction",
        description: "\\text{Removes fraction inside other fraction}"
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
        name: "Open brackets",
        description: "\\text{Eg: }y\\left(x+5\\right)\\Rightarrow xy+5y"
    },
    {
        id: "move-out",
        categoryId: 1,
        template: false,
        type: "expression",
        name: "Move out of breacket",
        requireInput: true,
        description: "\\text{Eg: } xy+5x;\\text{ input:}y\\ \\Rightarrow\\ y\\left(x+5\\right)"
    },
    {
        id: "separate",
        categoryId: 1,
        template: false,
        type: "formula",
        name: "Separate multiplier",
        description: "\\text{Eg: } \\frac{5x}{y}=z \\Rightarrow x=\\frac{yz}{5}"
    },
    {
        id: "toCDen",
        categoryId: 1,
        template: false,
        type: "expression",
        name: "To common denominator",
        description: "\\text{Eg: } \\frac{1}{2x}+\\frac{1}{4y} \\Rightarrow \\frac{2y+x}{4xy}"
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
    },
    {
        id: "tan",
        categoryId: 9,
        template: true,
        body: [
            "\\tan\\left([x]\\right)=>\\frac{\\sin\\left([x]\\right)}{\\cos\\left([x]\\right)}",
            "\\frac{\\sin\\left([x]\\right)}{\\cos\\left([x]\\right)}=>\\tan\\left([x]\\right)"
        ],
        type: "expression",
        name: "$\\tan(x)=\\frac{\\sin(x)}{\\cos(x)}$"
    },
    {
        id: "cot",
        categoryId: 9,
        template: true,
        body: [
            "\\cot\\left([x]\\right)=>\\frac{\\cos\\left([x]\\right)}{\\sin\\left([x]\\right)}",
            "\\frac{\\cos\\left([x]\\right)}{\\sin\\left([x]\\right)}=>\\cot\\left([x]\\right)"
        ],
        type: "expression",
        name: "$\\cot(x)=\\frac{\\cos(x)}{\\sin(x)}$"
    },
    {
        id: "tan*cot",
        categoryId: 9,
        template: true,
        body: [
            "\\tan\\left([x]\\right)\\cot\\left([x]\\right)=>1",
            "\\tan\\left([x]\\right)=>\\frac{1}{\\cot\\left([x]\\right)}",
            "\\frac{1}{\\cot\\left([x]\\right)}=>\\tan\\left([x]\\right)",
            "\\cot\\left([x]\\right)=>\\frac{1}{\\tan\\left([x]\\right)}",
            "\\frac{1}{\\tan\\left([x]\\right)}=>\\cot\\left([x]\\right)",
        ],
        type: "expression",
        name: "$\\tan(x) \\cot(x)=1$"
    },
    {
        id: "sin2+cos2",
        categoryId: 9,
        template: true,
        body: [
            "\\sin\\left([x]\\right)^2+\\cos\\left([x]\\right)^2=>1",
            "\\sin\\left([x]\\right)^2=>1-\\cos\\left([x]\\right)^2",
            "1-\\cos\\left([x]\\right)^2=>\\sin\\left([x]\\right)^2",
            "\\cos\\left([x]\\right)^2=>1-\\sin\\left([x]\\right)^2",
            "1-\\sin\\left([x]\\right)^2=>\\cos\\left([x]\\right)^2"
        ],
        type: "expression",
        name: "$\\sin(x)^2+\\cos(x)^2=1$"
    },
    {
        id: "tan2",
        categoryId: 9,
        template: true,
        body: [
            "1+\\tan\\left([x]\\right)^2=>\\frac{1}{\\cos\\left([x]\\right)^2}",
            "\\frac{1}{\\cos\\left([x]\\right)^2}=>1+\\tan\\left([x]\\right)^2"
        ],
        type: "expression",
        name: "$1+\\tan(x)^2=\\frac{1}{\\cos(x)^2}$"
    },
    {
        id: "cot2",
        categoryId: 9,
        template: true,
        body: [
            "1+\\cot\\left([x]\\right)^2=>\\frac{1}{\\sin\\left([x]\\right)^2}",
            "\\frac{1}{\\sin\\left([x]\\right)^2}=>1+\\cot\\left([x]\\right)^2"
        ],
        type: "expression",
        name: "$1+\\cot(x)^2=\\frac{1}{\\sin(x)^2}$"
    },
    {
        id: "sin(x+y)",
        categoryId: 9,
        template: true,
        body: [
            "\\sin\\left([x]+[y]\\right)=>\\sin\\left([x]\\right)\\cos\\left([y]\\right)+\\cos\\left([x]\\right)\\sin\\left([y]\\right)",
            "\\sin\\left([x]\\right)\\cos\\left([y]\\right)+\\cos\\left([x]\\right)\\sin\\left([y]\\right)=>\\sin\\left([x]+[y]\\right)",
            "\\sin\\left([x]-[y]\\right)=>\\sin\\left([x]\\right)\\cos\\left([y]\\right)-\\cos\\left([x]\\right)\\sin\\left([y]\\right)",
            "\\sin\\left([x]\\right)\\cos\\left([y]\\right)-\\cos\\left([x]\\right)\\sin\\left([y]\\right)=>\\sin\\left([x]-[y]\\right)"
        ],
        type: "expression",
        name: "$\\sin\\left(\\alpha+\\beta\\right)=\\sin\\left(\\alpha\\right)\\cos\\left(\\beta\\right)+\\cos\\left(\\alpha\\right)\\sin\\left(\\beta\\right)$"
    },
    {
        id: "cos(x+y)",
        categoryId: 9,
        template: true,
        body: [
            "\\cos\\left([x]+[y]\\right)=>\\cos\\left([x]\\right)\\cos\\left([y]\\right)-\\sin\\left([x]\\right)\\sin\\left([y]\\right)",
            "\\cos\\left([x]\\right)\\cos\\left([y]\\right)-\\sin\\left([x]\\right)\\sin\\left([y]\\right)=>\\cos\\left([x]+[y]\\right)",
            "\\cos\\left([x]-[y]\\right)=>\\cos\\left([x]\\right)\\cos\\left([y]\\right)+\\sin\\left([x]\\right)\\sin\\left([y]\\right)",
            "\\cos\\left([x]\\right)\\cos\\left([y]\\right)+\\sin\\left([x]\\right)\\sin\\left([y]\\right)=>\\cos\\left([x]-[y]\\right)"
        ],
        type: "expression",
        name: "$\\cos\\left(\\alpha+\\beta\\right)=\\cos\\left(\\alpha\\right)\\cos\\left(\\beta\\right)-\\sin\\left(\\alpha\\right)\\sin\\left(\\beta\\right)$"
    },
    {
        id: "tan(x+y)",
        categoryId: 9,
        template: true,
        body: [
            "\\tan\\left([x]+[y]\\right)=>\\frac{\\tan\\left([x]\\right)+\\tan\\left([y]\\right)}{1-\\tan\\left([x]\\right)\\tan\\left([y]\\right)}",
            "\\frac{\\tan\\left([x]\\right)+\\tan\\left([y]\\right)}{1-\\tan\\left([x]\\right)\\tan\\left([y]\\right)}=>\\tan\\left([x]+[y]\\right)",
            "\\tan\\left([x]-[y]\\right)=>\\frac{\\tan\\left([x]\\right)-\\tan\\left([y]\\right)}{1+\\tan\\left([x]\\right)\\tan\\left([y]\\right)}",
            "\\frac{\\tan\\left([x]\\right)-\\tan\\left([y]\\right)}{1+\\tan\\left([x]\\right)\\tan\\left([y]\\right)}=>\\tan\\left([x]-[y]\\right)"
        ],
        type: "expression",
        name: "$\\tan\\left(\\alpha+\\beta\\right)=\\frac{\\tan\\left(\\alpha\\right)+\\tan\\left(\\beta\\right)}{1-\\tan\\left(\\alpha\\right)\\tan\\left(\\beta\\right)}$"
    },
    {
        id: "cot(x+y)",
        categoryId: 9,
        template: true,
        body: [
            "\\cot\\left([x]+[y]\\right) => \\frac{\\cot\\left([x]\\right)\\cot\\left([y]\\right)-1}{\\cot\\left([x]\\right)+\\cot\\left([y]\\right)}",
            "\\frac{\\cot\\left([x]\\right)\\cot\\left([y]\\right)-1}{\\cot\\left([x]\\right)+\\cot\\left([y]\\right)} => \\cot\\left([x]+[y]\\right)",
            "\\cot\\left([x]-[y]\\right) => \\frac{\\cot\\left([x]\\right)\\cot\\left([y]\\right)+1}{\\cot\\left([y]\\right)-\\cot\\left([x]\\right)}",
            "\\frac{\\cot\\left([x]\\right)\\cot\\left([y]\\right)+1}{\\cot\\left([y]\\right)-\\cot\\left([x]\\right)} => \\cot\\left([x]-[y]\\right)"
        ],
        type: "expression",
        name: "$\\cot\\left(\\alpha+\\beta\\right) = \\frac{\\cot\\left(\\alpha\\right)\\cot\\left(\\beta\\right)-1}{\\cot\\left(\\alpha\\right)+\\cot\\left(\\beta\\right)}$"
    },
    {
        id: "sin2x",
        categoryId: 9,
        template: true,
        subactions: ["sin2x-1", "sin2x-2"],
        type: "expression",
        name: "$\\sin\\left(2x\\right)=$"
    },
    {
        id: "sin2x-2",
        categoryId: -1,
        template: true,
        body: [
            "\\sin\\left(2[x]\\right)=>\\frac{2\\tan\\left([x]\\right)}{1+\\tan\\left([x]\\right)^2}",
            "\\frac{2\\tan\\left([x]\\right)}{1+\\tan\\left([x]\\right)^2}=>\\sin\\left(2[x]\\right)"
        ],
        type: "expression",
        name: "$\\frac{2\\tan\\left(x\\right)}{1+\\tan\\left(x\\right)^2}$"
    },
    {
        id: "sin2x-1",
        categoryId: -1,
        template: true,
        body: [
            "\\sin\\left(2[x]\\right)=>2\\sin\\left([x]\\right)\\cos\\left([x]\\right)",
            "2\\sin\\left([x]\\right)\\cos\\left([x]\\right)=>\\sin\\left(2[x]\\right)"
        ],
        type: "expression",
        name: "$2\\sin\\left(x\\right)\\cos\\left(x\\right)$"
    },
    {
        id: "cos2x",
        categoryId: 9,
        template: true,
        subactions: ["cos2x-1", "cos2x-2", "cos2x-3", "cos2x-4"],
        type: "expression",
        name: "$\\cos\\left(2x\\right)=$"
    },
    {
        id: "cos2x-1",
        categoryId: -1,
        template: true,
        body: [
            "\\cos\\left(2[x]\\right)=>\\cos\\left([x]\\right)^2-\\sin\\left([x]\\right)^2",
            "\\cos\\left([x]\\right)^2-\\sin\\left([x]\\right)^2=>\\cos\\left(2[x]\\right)"
        ],
        type: "expression",
        name: "$\\cos\\left(x\\right)^2-\\sin\\left(x\\right)^2$"
    },
    {
        id: "cos2x-2",
        categoryId: -1,
        template: true,
        body: [
            "\\cos\\left(2[x]\\right)=>2\\cos\\left([x]\\right)^2-1",
            "2\\cos\\left([x]\\right)^2-1=>\\cos\\left(2[x]\\right)"
        ],
        type: "expression",
        name: "$2\\cos\\left(x\\right)^2-1$"
    },
    {
        id: "cos2x-3",
        categoryId: -1,
        template: true,
        body: [
            "\\cos\\left(2[x]\\right)=>1-2\\sin\\left([x]\\right)^2",
            "1-2\\sin\\left([x]\\right)^2=>\\cos\\left(2[x]\\right)"
        ],
        type: "expression",
        name: "$1-2\\sin\\left(x\\right)^2$"
    },
    {
        id: "cos2x-4",
        categoryId: -1,
        template: true,
        body: [
            "\\cos\\left(2[x]\\right)=>\\frac{1-\\tan\\left([x]\\right)^2}{1+\\tan\\left([x]\\right)^2}",
            "\\frac{1-\\tan\\left([x]\\right)^2}{1+\\tan\\left([x]\\right)^2}=>\\cos\\left(2[x]\\right)"
        ],
        type: "expression",
        name: "$\\frac{1-\\tan\\left(x\\right)^2}{1+\\tan\\left(x\\right)^2}$"
    },
    {
        id: "tan2x",
        categoryId: 9,
        template: true,
        body: [
            "\\tan\\left(2[x]\\right)=>\\frac{2\\tan\\left([x]\\right)}{1-\\tan\\left([x]\\right)^2}",
            "\\frac{2\\tan\\left([x]\\right)}{1-\\tan\\left([x]\\right)^2}=>\\tan\\left(2[x]\\right)"
        ],
        type: "expression",
        name: "$\\tan\\left(2x\\right)=\\frac{2\\tan\\left(x\\right)}{1-\\tan\\left(x  \\right)^2}$"
    },
    {
        id: "sin^2",
        categoryId: 10,
        template: true,
        body: [
            "\\sin\\left([x]\\right)^2=>\\frac{1-\\cos\\left(2[x]\\right)}{2}",
            "\\frac{1-\\cos\\left(2[x]\\right)}{2}=>\\sin\\left([x]\\right)^2"
        ],
        type: "expression",
        name: "$\\sin(x)^2=\\frac{1-\\cos(2x)}{2}$"
    },
    {
        id: "cos^2",
        categoryId: 10,
        template: true,
        body: [
            "\\cos\\left([x]\\right)^2=>\\frac{1+\\cos\\left(2[x]\\right)}{2}",
            "\\frac{1+\\cos\\left(2[x]\\right)}{2}=>\\cos\\left([x]\\right)^2"
        ],
        type: "expression",
        name: "$\\cos(x)^2=\\frac{1+\\cos(2x)}{2}$"
    },
    {
        id: "tan^2",
        categoryId: 10,
        template: true,
        body: [
            "\\tan\\left([x]\\right)^2=>\\frac{1-\\cos\\left(2[x]\\right)}{1+\\cos\\left(2[x]\\right)}",
            "\\frac{1-\\cos\\left(2[x]\\right)}{1+\\cos\\left(2[x]\\right)}=>\\tan\\left([x]\\right)^2"
        ],
        type: "expression",
        name: "$\\tan(x)^2=\\frac{1-\\cos(2x)}{1+\\cos(2x)}$"
    },
    {
        id: "sin+sin",
        categoryId: 10,
        template: true,
        body: [
            "\\sin\\left([x]\\right)+\\sin\\left([y]\\right)=>2\\sin\\left(\\frac{[x]+[y]}{2}\\right)\\cos\\left(\\frac{[x]-[y]}{2}\\right)"
        ],
        type: "expression",
        name: "$\\sin\\left(x\\right)+\\sin\\left(y\\right) = 2\\sin\\left(\\frac{x+y}{2}\\right)\\cos\\left(\\frac{x-y}{2}\\right)$"
    },
    {
        id: "sin-sin",
        categoryId: 10,
        template: true,
        body: [
            "\\sin\\left([x]\\right)-\\sin\\left([y]\\right)=>2\\cos\\left(\\frac{[x]+[y]}{2}\\right)\\sin\\left(\\frac{[x]-[y]}{2}\\right)"
        ],
        type: "expression",
        name: "$\\sin\\left(x\\right)-\\sin\\left(y\\right) = 2\\cos\\left(\\frac{x+y}{2}\\right)\\sin\\left(\\frac{x-y}{2}\\right)$"
    },
    {
        id: "cos+cos",
        categoryId: 10,
        template: true,
        body: [
            "\\cos\\left([x]\\right)+\\cos\\left([y]\\right)=>2\\cos\\left(\\frac{[x]+[y]}{2}\\right)\\cos\\left(\\frac{[x]-[y]}{2}\\right)"
        ],
        type: "expression",
        name: "$\\cos\\left(x\\right)+\\cos\\left(y\\right) = 2\\cos\\left(\\frac{x+y}{2}\\right)\\cos\\left(\\frac{x-y}{2}\\right)$"
    },
    {
        id: "cos-cos",
        categoryId: 10,
        template: true,
        body: [
            "\\cos\\left([x]\\right)-\\cos\\left([y]\\right)=>-2\\sin\\left(\\frac{[x]+[y]}{2}\\right)\\sin\\left(\\frac{[x]-[y]}{2}\\right)"
        ],
        type: "expression",
        name: "$\\cos\\left(x\\right)-\\cos\\left(y\\right) = -2\\sin\\left(\\frac{x+y}{2}\\right)\\sin\\left(\\frac{x-y}{2}\\right)$"
    },
    {
        id: "tan+-tan",
        categoryId: 10,
        template: true,
        body: [
            "\\tan\\left([x]\\right) + \\tan\\left([y]\\right) => \\frac{\\sin\\left([x]+[y]\\right)}{\\cos\\left([x]\\right)\\cos\\left([y]\\right)}",
            "\\tan\\left([x]\\right) - \\tan\\left([y]\\right) => \\frac{\\sin\\left([x]-[y]\\right)}{\\cos\\left([x]\\right)\\cos\\left([y]\\right)}",
        ],
        type: "expression",
        name: "$\\tan(x) \\pm \\tan(y) = \\frac{\\sin(x \\pm y)}{\\cos(x)\\cos(y)}$"
    },
    {
        id: "cot+-cot",
        categoryId: 10,
        template: true,
        body: [
            "\\cot\\left([x]\\right) + \\cot\\left([y]\\right) => \\frac{\\sin\\left([y]+[x]\\right)}{\\sin\\left([x]\\right)\\sin\\left([y]\\right)}",
            "\\cot\\left([x]\\right) - \\cot\\left([y]\\right) => \\frac{\\sin\\left([y]-[x]\\right)}{\\sin\\left([x]\\right)\\sin\\left([y]\\right)}",
        ],
        type: "expression",
        name: "$\\cot(x) \\pm \\cot(y) = \\frac{\\sin(y \\pm x)}{\\sin(x)\\sin(y)}$"
    },    
    {
        id: "sin*sin",
        categoryId: 10,
        template: true,
        body: [
            "\\sin\\left([x]\\right)\\sin\\left([y]\\right)=>\\frac{1}{2}\\left(\\cos\\left([x]-[y]\\right)-\\cos\\left([x]+[y]\\right)\\right)"
        ],
        type: "expression",
        name: "$\\sin\\left(x\\right)\\sin\\left(y\\right)=\\frac{1}{2}\\left(\\cos\\left(x-y\\right)-\\cos\\left(x+y\\right)\\right)$"
    },
    {
        id: "cos*cos",
        categoryId: 10,
        template: true,
        body: [
            "\\cos\\left([x]\\right)\\cos\\left([y]\\right)=>\\frac{1}{2}\\left(\\cos\\left([x]+[y]\\right)+\\cos\\left([x]-[y]\\right)\\right)"
        ],
        type: "expression",
        name: "$\\cos\\left(x\\right)\\cos\\left(y\\right)=\\frac{1}{2}\\left(\\cos\\left(x+y\\right)+\\cos\\left(x-y\\right)\\right)$"
    },
    {
        id: "sin*cos",
        categoryId: 10,
        template: true,
        body: [
            "\\sin\\left([x]\\right)\\cos\\left([y]\\right)=>\\frac{1}{2}\\left(\\sin\\left([x]-[y]\\right)+\\sin\\left([x]+[y]\\right)\\right)"
        ],
        type: "expression",
        name: "$\\sin\\left(x\\right)\\cos\\left(y\\right)=\\frac{1}{2}\\left(\\sin\\left(x-y\\right)+\\sin\\left(x+y\\right)\\right)$"
    }
];
