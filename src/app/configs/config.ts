export const availibleLetters = [
  "alpha", "nu", "beta", "xi", "Xi", "gamma", "Gamma", "delta", "Delta", "pi", "Pi", "epsilon", "rho", "varrho",
  "zeta", "sigma", "Sigma", "eta", "tau", "theta", "Theta", "upsilon", "Upsilon", "iota", "phi", "Phi", "kappa",
  "chi", "lambda", "Lambda", "psi", "Psi", "mu", "omega", "Omega",
];

export const availibleMathFunc = {
  "sin": Math.sin, 
  "cos":Math.cos, 
  "tan": Math.tan, 
  "cot": (num: number)=>1/Math.tan(num),
  "arcsin": Math.asin, 
  "arccos":Math.acos, 
  "arctan":Math.atan
}

export class idCounter {
  static id: number = 0;
  static getId(): number {
    this.id+=1;
    return this.id;
  }
}