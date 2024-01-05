import { Formula } from "./formula";


export class Template {
    from: Formula;
    to: Formula;
    constructor(from: Formula, to: Formula) {
        this.from = from;
        this.to = to;
    }

    toTex(): string {
        return `${this.from.toTex()}=>${this.to.toTex()}`
    }
}