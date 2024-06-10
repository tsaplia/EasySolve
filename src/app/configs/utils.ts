export function readonlyArray<T>(array: T[]) {
    return new Proxy([...array], {
        set() {
            throw new Error("Cannot change term content");
        }
    });
}

export function addFractions(a: [number, number], b: [number, number]): [number, number] {
    let [num, den] = [a[0]*b[1]+b[0]*a[1], a[1]*b[1]];
    let g = gcd(num, den);
    return [num/g, den/g];
}

export function gcd(a: number, b: number): number {
    while(b){
        a = a%b;
        [a, b] = [b, a];
    }
    return a;
}

export function latexWrap(body: string){
    return `\\documentclass{article}
\\usepackage[utf8]{inputenc}
\\begin{document}
${body}
\\end{document}
`;
}

    
