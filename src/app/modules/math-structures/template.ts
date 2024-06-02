import { Expression } from "./expression";

export class Template {
    readonly from: Expression;
    readonly to: Expression;
    constructor(from: Expression, to: Expression) {
        this.from = from;
        this.to = to;
    }

    toTex(): string {
        return `${this.from.toTex()}=>${this.to.toTex()}`
    }
}