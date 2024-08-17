import { KeyboardLayout } from "src/app/models/keyboardLayout";

export const keyboardLayouts: KeyboardLayout[] = [
    {
        name: "123",
        keys: [
            {
                config: [ { text: "1" } ],
                colClass: "col-10-1"                    
            },
            {
                config: [ { text: "2" } ],
                colClass: "col-10-1"
            },
            {
                config: [ { text: "3" } ],
                colClass: "col-10-1"
            },
            {
                config: [ { text: "4" } ],
                colClass: "col-10-1"
            },
            {
                config: [ { text: "5" } ],
                colClass: "col-10-1"
            },
            {
                config: [ { text: "6" } ],
                colClass: "col-10-1"
            },
            {
                config: [ { text: "7" } ],
                colClass: "col-10-1"
            },
            {
                config: [ { text: "8" } ],
                colClass: "col-10-1"
            },
            {
                config: [ { text: "9" } ],
                colClass: "col-10-1"
            },
            {
                config: [ { text: "0" } ],
                colClass: "col-10-1"
            },
            {
                config: [ { text: "+" } ],
                colClass: "col-10-1"
            },
            {
                config: [ { text: "-" } ],
                colClass: "col-10-1"
            },
            {
                config: [ { text: "=" } ],
                colClass: "col-10-1"
            },
            {
                config: [ { text: "(" } ],
                colClass: "col-10-1"
            },
            {
                config: [ { text: ")" } ],
                colClass: "col-10-1"
            },
            {
                config: [ 
                    { text: "\\sqrt", label: "$\\sqrt{}$" },
                    { text: "\\sqrt[3]{}", label: "$\\sqrt[3]{}$", cmd: "write" }
                ],
                colClass: "col-10-1"
            },
            {
                config: [ { text: "\\sqrt[]{}", label: "$\\sqrt[n]{}$", cmd: "write" } ],
                colClass: "col-10-1"
            },
            {
                config: [
                    { text: "\\sin (", label: "$\\sin$" },
                    { text: "\\arcsin (", label: "$\\arcsin$" }
                ],
                colClass: "col-10-1"
            },
            {
                config: [
                    { text: "\\cos (", label: "$\\cos$" },
                    { text: "\\arccos (", label: "$\\arccos$" }
                ],
                colClass: "col-10-1"
            },
            {
                config: [ {text: "\\theta", label: "$\\theta$"} ],
                colClass: "col-10-1"
            },
            {
                config: [ {text: "*", label: "$\\times$" } ],
                colClass: "col-10-1"
            },
            {
                config: [ {text: "/", label: "$\\div$" } ],
                colClass: "col-10-1"
            },
            {
                config: [ { text: "." } ],
                colClass: "col-10-1"
            },
            {
                config: [ {text: "_", label: "$a_b$" } ],
                colClass: "col-10-1"
            },
            {
                config: [ { text: "\\vec", label: "$\\vec{a}$" } ],
                colClass: "col-10-1"
            },
            {
                config: [
                    { text: "^2", label: "$a^2$", cmd: "write"},
                    { text: "^3", label: "$a^3$", cmd: "write"}
                ],
                colClass: "col-10-1"
            },
            {
                config: [ { text: "^", label: "$a^n$" } ],
                colClass: "col-10-1"
            },
            {
                config: [
                    { text: "\\tan (", label: "$\\tan$" },
                    { text: "\\arctan (", label: "$\\arctan$" }
                ],
                colClass: "col-10-1"
            },
            {
                config: [
                    { text: "\\cot (", label: "$\\cot$" },
                ],
                colClass: "col-10-1"
            },
            {
                config: [ { text: "\\pi", label: "$\\pi$" } ],
                colClass: "col-10-1"
            }
        ]
    },
    {
        name: "abc",
        keys: [
            {
                config: [
                    { text: "q" },
                    { text: "Q" }
                ],
                colClass: "col-10-1"
            },
            {
                config: [
                    { text: "w" },
                    { text: "W" }
                ],
                colClass: "col-10-1"
            },
            {
                config: [
                    { text: "e" },
                    { text: "E" }
                ],
                colClass: "col-10-1"
            },
            {
                config: [
                    { text: "r" },
                    { text: "R" }
                ],
                colClass: "col-10-1"
            },
            {
                config: [
                    { text: "t" },
                    { text: "T" }
                ],
                colClass: "col-10-1"
            },
            {
                config: [
                    { text: "y" },
                    { text: "Y" }
                ],
                colClass: "col-10-1"
            },
            {
                config: [
                    { text: "u" },
                    { text: "U" }
                ],
                colClass: "col-10-1"
            },
            {
                config: [
                    { text: "i" },
                    { text: "I" }
                ],
                colClass: "col-10-1"
            },
            {
                config: [
                    { text: "o" },
                    { text: "O" }
                ],
                colClass: "col-10-1"
            },
            {
                config: [
                    { text: "p" },
                    { text: "P" }
                ],
                colClass: "col-10-1"
            },
            {
                config: [
                    { text: "a" },
                    { text: "A" }
                ],
                colClass: "col-10-1"
            },
            {
                config: [
                    { text: "s" },
                    { text: "S" }
                ],
                colClass: "col-10-1"
            },
            {
                config: [
                    { text: "d" },
                    { text: "D" }
                ],
                colClass: "col-10-1"
            },
            {
                config: [
                    { text: "f" },
                    { text: "F" }
                ],
                colClass: "col-10-1"
            },
            {
                config: [
                    { text: "g" },
                    { text: "G" }
                ],
                colClass: "col-10-1"
            },
            {
                config: [
                    { text: "h" },
                    { text: "H" }
                ],
                colClass: "col-10-1"
            },
            {
                config: [
                    { text: "j" },
                    { text: "J" }
                ],
                colClass: "col-10-1"
            },
            {
                config: [
                    { text: "k" },
                    { text: "K" }
                ],
                colClass: "col-10-1"
            },
            {
                config: [
                    { text: "l" },
                    { text: "L" }
                ],
                colClass: "col-10-1"
            },
            {
                config: [
                    { text: "'", label: "$'$" }
                ],
                colClass: "col-10-1"
            },
            {
                config: [ {text: "_", label: "$a_b$" } ],
                colClass: "col-10-1"
            },
            {
                config: [
                    { text: "z" },
                    { text: "Z" }
                ],
                colClass: "col-10-1"
            },
            {
                config: [
                    { text: "x" },
                    { text: "X" }
                ],
                colClass: "col-10-1"
            },
            {
                config: [
                    { text: "c" },
                    { text: "C" }
                ],
                colClass: "col-10-1"
            },
            {
                config: [
                    { text: "v" },
                    { text: "V" }
                ],
                colClass: "col-10-1"
            },
            {
                config: [
                    { text: "b" },
                    { text: "B" }
                ],
                colClass: "col-10-1"
            },
            {
                config: [
                    { text: "n" },
                    { text: "N" }
                ],
                colClass: "col-10-1"
            },
            {
                config: [
                    { text: "m" },
                    { text: "M" }
                ],
                colClass: "col-10-1"
            },
            {
                config: [
                    { text: ".", label: "$.$" }
                ],
                colClass: "col-10-1"
            },
            {
                config: [
                    { text: "\\vec", label: "$\\vec{a}$" }
                ],
                colClass: "col-10-1"
            }
        ]
    },
    {
        name: "$\\alpha \\beta \\gamma$",
        keys: [
            {
                config: [
                    { text: "\\alpha", label: "$\\alpha$" },
                    { text: "A" }
                ],
                colClass: "col-10-1"
            },
            {
                config: [
                    { text: "\\beta", label: "$\\beta$" },
                    { text: "B" }
                ],
                colClass: "col-10-1"
            },
            {
                config: [
                    { text: "\\gamma", label: "$\\gamma$" },
                    { text: "\\Gamma", label: "$\\Gamma$" }
                ],
                colClass: "col-10-1"
            },
            {
                config: [
                    { text: "\\delta", label: "$\\delta$" },
                    { text: "\\Delta", label: "$\\Delta$" }
                ],
                colClass: "col-10-1"
            },
            {
                config: [
                    { text: "\\epsilon", label: "$\\epsilon$" },
                    { text: "E" }
                ],
                colClass: "col-10-1"
            },
            {
                config: [
                    { text: "\\zeta", label: "$\\zeta$" },
                    { text: "Z" }
                ],
                colClass: "col-10-1"
            },
            {
                config: [
                    { text: "\\eta", label: "$\\eta$" },
                    { text: "H" }
                ],
                colClass: "col-10-1"
            },
            {
                config: [
                    { text: "\\theta", label: "$\\theta$" },
                    { text: "\\Theta", label: "$\\Theta$" }
                ],
                colClass: "col-10-1"
            },
            {
                config: [
                    { text: "\\iota", label: "$\\iota$" },
                    { text: "I" }
                ],
                colClass: "col-10-1"
            },
            {
                config: [
                    { text: "\\kappa", label: "$\\kappa$" },
                    { text: "K" }
                ],
                colClass: "col-10-1"
            },
            {
                config: [
                    { text: "\\lambda", label: "$\\lambda$" },
                    { text: "\\Lambda", label: "$\\Lambda$" }
                ],
                colClass: "col-10-1"
            },
            {
                config: [
                    { text: "\\mu", label: "$\\mu$" },
                    { text: "M" }
                ],
                colClass: "col-10-1"
            },
            {
                config: [
                    { text: "\\nu", label: "$\\nu$" },
                    { text: "N" }
                ],
                colClass: "col-10-1"
            },
            {
                config: [
                    { text: "\\xi", label: "$\\xi$" },
                    { text: "\\Xi", label: "$\\Xi$" }
                ],
                colClass: "col-10-1"
            },
            {
                config: [
                    { text: "o" },
                    { text: "O" }
                ],
                colClass: "col-10-1"
            },
            {
                config: [
                    { text: "\\pi", label: "$\\pi$" },
                    { text: "\\Pi", label: "$\\Pi$" }
                ],
                colClass: "col-10-1"
            },
            {
                config: [
                    { text: "\\rho", label: "$\\rho$" },
                    { text: "P" }
                ],
                colClass: "col-10-1"
            },
            {
                config: [
                    { text: "\\sigma", label: "$\\sigma$" },
                    { text: "\\Sigma", label: "$\\Sigma$" }
                ],
                colClass: "col-10-1"
            },
            {
                config: [
                    { text: "\\tau", label: "$\\tau$" },
                    { text: "T" }
                ],
                colClass: "col-10-1"
            },
            {
                config: [
                    { text: "\\upsilon", label: "$\\upsilon$" },
                    { text: "\\Upsilon", label: "$\\Upsilon$" }
                ],
                colClass: "col-10-1"
            },
            {
                config: [
                    { text: "\\phi", label: "$\\phi$" },
                    { text: "\\Phi", label: "$\\Phi$" }
                ],
                colClass: "col-10-1"
            },
            {
                config: [
                    { text: "\\chi", label: "$\\chi$" },
                    { text: "X" }
                ],
                colClass: "col-10-1"
            },
            {
                config: [
                    { text: "\\psi", label: "$\\psi$" },
                    { text: "\\Psi", label: "$\\Psi$" }
                ],
                colClass: "col-10-1"
            },
            {
                config: [
                    { text: "\\omega", label: "$\\omega$" },
                    { text: "\\Omega", label: "$\\Omega$" }
                ],
                colClass: "col-10-1"
            }
        ]
    }
]
