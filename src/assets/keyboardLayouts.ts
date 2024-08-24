import { KeyboardLayout } from "src/app/models/keyboardLayout";

export const keyboardLayouts: KeyboardLayout[] = [
    {
        name: "123",
        keys: [
            {
                config: [ { text: "1" } ]                    
            },
            {
                config: [ { text: "2" } ]
            },
            {
                config: [ { text: "3" } ]
            },
            {
                config: [ { text: "4" } ]
            },
            {
                config: [ { text: "5" } ]
            },
            {
                config: [ { text: "6" } ]
            },
            {
                config: [ { text: "7" } ]
            },
            {
                config: [ { text: "8" } ]
            },
            {
                config: [ { text: "9" } ]
            },
            {
                config: [ { text: "0" } ]
            },
            {
                config: [ { text: "+" } ]
            },
            {
                config: [ { text: "-" } ]
            },
            {
                config: [ { text: "=" } ]
            },
            {
                config: [ { text: "." } ]
            },
            {
                config: [ 
                    { text: "\\sqrt", label: "$\\sqrt{}$" },
                    { text: "\\sqrt[3]{}", label: "$\\sqrt[3]{}$", cmd: "write" }
                ]
            },
            {
                config: [ { text: "\\sqrt[]{}", label: "$\\sqrt[n]{}$", cmd: "write" } ]
            },
            {
                config: [
                    { text: "\\sin (", label: "$\\sin$" },
                    { text: "\\arcsin (", label: "$\\arcsin$" }
                ],
                colClass: "col-10-2"
            },
            {
                config: [
                    { text: "\\cos (", label: "$\\cos$" },
                    { text: "\\arccos (", label: "$\\arccos$" }
                ],
                colClass: "col-10-2"
            },
            {
                config: [ {text: "*", label: "$\\times$" } ]
            },
            {
                config: [ {text: "/", label: "$\\div$" } ]
            },
            {
                config: [ { text: "(" } ]
            },
            {
                config: [ { text: ")" } ]
            },
            {
                config: [
                    { text: "^2", label: "$a^2$", cmd: "write"},
                    { text: "^3", label: "$a^3$", cmd: "write"}
                ]
            },
            {
                config: [ { text: "^", label: "$a^n$" } ]
            },
            {
                config: [
                    { text: "\\tan (", label: "$\\tan$" },
                    { text: "\\arctan (", label: "$\\arctan$" }
                ],
                colClass: "col-10-2"
            },
            {
                config: [
                    { text: "\\cot (", label: "$\\cot$" },
                ],
                colClass: "col-10-2"
            },
        ]
    },
    {
        name: "abc",
        keys: [
            {
                config: [
                    { text: "q" },
                    { text: "Q" }
                ]
            },
            {
                config: [
                    { text: "w" },
                    { text: "W" }
                ]
            },
            {
                config: [
                    { text: "e" },
                    { text: "E" }
                ]
            },
            {
                config: [
                    { text: "r" },
                    { text: "R" }
                ]
            },
            {
                config: [
                    { text: "t" },
                    { text: "T" }
                ]
            },
            {
                config: [
                    { text: "y" },
                    { text: "Y" }
                ]
            },
            {
                config: [
                    { text: "u" },
                    { text: "U" }
                ]
            },
            {
                config: [
                    { text: "i" },
                    { text: "I" }
                ]
            },
            {
                config: [
                    { text: "o" },
                    { text: "O" }
                ]
            },
            {
                config: [
                    { text: "p" },
                    { text: "P" }
                ]
            },
            {
                config: [
                    { text: "a" },
                    { text: "A" }
                ]
            },
            {
                config: [
                    { text: "s" },
                    { text: "S" }
                ]
            },
            {
                config: [
                    { text: "d" },
                    { text: "D" }
                ]
            },
            {
                config: [
                    { text: "f" },
                    { text: "F" }
                ]
            },
            {
                config: [
                    { text: "g" },
                    { text: "G" }
                ]
            },
            {
                config: [
                    { text: "h" },
                    { text: "H" }
                ]
            },
            {
                config: [
                    { text: "j" },
                    { text: "J" }
                ]
            },
            {
                config: [
                    { text: "k" },
                    { text: "K" }
                ]
            },
            {
                config: [
                    { text: "l" },
                    { text: "L" }
                ]
            },
            {
                config: [
                    { text: "'", label: "$'$" }
                ]
            },
            {
                config: [ {text: "_", label: "$a_b$" } ]
            },
            {
                config: [
                    { text: "z" },
                    { text: "Z" }
                ]
            },
            {
                config: [
                    { text: "x" },
                    { text: "X" }
                ]
            },
            {
                config: [
                    { text: "c" },
                    { text: "C" }
                ]
            },
            {
                config: [
                    { text: "v" },
                    { text: "V" }
                ]
            },
            {
                config: [
                    { text: "b" },
                    { text: "B" }
                ]
            },
            {
                config: [
                    { text: "n" },
                    { text: "N" }
                ]
            },
            {
                config: [
                    { text: "m" },
                    { text: "M" }
                ]
            },
            {
                config: [
                    { text: ".", label: "$.$" }
                ]
            },
            {
                config: [
                    { text: "\\vec", label: "$\\vec{a}$" }
                ]
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
                ]
            },
            {
                config: [
                    { text: "\\beta", label: "$\\beta$" },
                    { text: "B" }
                ]
            },
            {
                config: [
                    { text: "\\gamma", label: "$\\gamma$" },
                    { text: "\\Gamma", label: "$\\Gamma$" }
                ]
            },
            {
                config: [
                    { text: "\\delta", label: "$\\delta$" },
                    { text: "\\Delta", label: "$\\Delta$" }
                ]
            },
            {
                config: [
                    { text: "\\epsilon", label: "$\\epsilon$" },
                    { text: "E" }
                ]
            },
            {
                config: [
                    { text: "\\zeta", label: "$\\zeta$" },
                    { text: "Z" }
                ]
            },
            {
                config: [
                    { text: "\\eta", label: "$\\eta$" },
                    { text: "H" }
                ]
            },
            {
                config: [
                    { text: "\\theta", label: "$\\theta$" },
                    { text: "\\Theta", label: "$\\Theta$" }
                ]
            },
            {
                config: [
                    { text: "\\iota", label: "$\\iota$" },
                    { text: "I" }
                ]
            },
            {
                config: [
                    { text: "\\kappa", label: "$\\kappa$" },
                    { text: "K" }
                ]
            },
            {
                config: [
                    { text: "\\lambda", label: "$\\lambda$" },
                    { text: "\\Lambda", label: "$\\Lambda$" }
                ]
            },
            {
                config: [
                    { text: "\\mu", label: "$\\mu$" },
                    { text: "M" }
                ]
            },
            {
                config: [
                    { text: "\\nu", label: "$\\nu$" },
                    { text: "N" }
                ]
            },
            {
                config: [
                    { text: "\\xi", label: "$\\xi$" },
                    { text: "\\Xi", label: "$\\Xi$" }
                ]
            },
            {
                config: [
                    { text: "o" },
                    { text: "O" }
                ]
            },
            {
                config: [
                    { text: "\\pi", label: "$\\pi$" },
                    { text: "\\Pi", label: "$\\Pi$" }
                ]
            },
            {
                config: [
                    { text: "\\rho", label: "$\\rho$" },
                    { text: "P" }
                ]
            },
            {
                config: [
                    { text: "\\sigma", label: "$\\sigma$" },
                    { text: "\\Sigma", label: "$\\Sigma$" }
                ]
            },
            {
                config: [
                    { text: "\\tau", label: "$\\tau$" },
                    { text: "T" }
                ]
            },
            {
                config: [
                    { text: "\\upsilon", label: "$\\upsilon$" },
                    { text: "\\Upsilon", label: "$\\Upsilon$" }
                ]
            },
            {
                config: [
                    { text: "\\phi", label: "$\\phi$" },
                    { text: "\\Phi", label: "$\\Phi$" }
                ]
            },
            {
                config: [
                    { text: "\\chi", label: "$\\chi$" },
                    { text: "X" }
                ]
            },
            {
                config: [
                    { text: "\\psi", label: "$\\psi$" },
                    { text: "\\Psi", label: "$\\Psi$" }
                ]
            },
            {
                config: [
                    { text: "\\omega", label: "$\\omega$" },
                    { text: "\\Omega", label: "$\\Omega$" }
                ]
            }
        ]
    }
]
