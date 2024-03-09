import { Formula } from "src/app/modules/math-structures/formula";


export class FormulaTemplate {
    from: Formula[];
    to: Formula[];
    constructor(from: Formula[], to: Formula[]) {
        this.from = from;
        this.to = to;
    }

    toTex(): string {
        return this.from.map(x => x.toTex()).join(";") + '=>' + this.to.join(";");
    }
}