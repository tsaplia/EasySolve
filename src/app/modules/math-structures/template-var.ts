import { MatchResult } from "./match-result";
import { MathStruct, Multiplier } from "./math-structure";


export class TemplateVar extends Multiplier {
    name: string
    constructor(name: string) {
        super();
        this.name = name;
    }
    isEqual(other: Multiplier): boolean {
        if (!(other instanceof TemplateVar)) return false;
        return this.name === other.name;
    }

    match(other: MathStruct): MatchResult | null {
        return new MatchResult({[this.name]: other});
    }

    substitute(match: MatchResult): Multiplier {
        if(!match.get(this.name)) throw new Error("Template variable not found");
        return (match.get(this.name) as Multiplier).copy();
    }

    toTex(): string {
        return `[${this.name}]`;
    }

    copy(): TemplateVar {
        return new TemplateVar(this.name);
    }
}
