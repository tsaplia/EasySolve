export const availibleLetters = [
    "alpha", "nu", "beta", "xi", "Xi", "gamma", "Gamma", "delta", "Delta", "pi", "Pi", "epsilon", "rho",
    "varrho", "zeta", "sigma", "Sigma", "eta", "tau", "theta", "Theta", "upsilon", "Upsilon", "iota", "phi",
    "Phi", "kappa", "chi", "lambda", "Lambda", "psi", "Psi", "mu", "omega", "Omega"
];

export const availibleMathFunc = {
    "sin": Math.sin,
    "cos": Math.cos,
    "tan": Math.tan,
    "cot": (num: number) => 1 / Math.tan(num),
    "arcsin": Math.asin,
    "arccos": Math.acos,
    "arctan": Math.atan
};

export const mathConstants = {
    "\\pi": Math.PI,
    "e": Math.E
};

export const formulaTemplate = /^\$[^$]*\$$/;

export const PRECISION = 1e4;

export const MAX_PRECISION = 1e8;
