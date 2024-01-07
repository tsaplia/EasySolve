import { Expression } from "./expression";
import { MatchResult } from "./match-result";
import { MathStruct, Multiplier } from "./math-structure";
import { Num } from "./number";

export class Sqrt extends Multiplier {
    content: Multiplier;
    root: Expression
    constructor(content: Multiplier, root: Expression = Expression.wrap(new Num(2))) {
        super();
        this.root = root;
        this.content = content; 
    }

    override toTex(): string {
        let content = this.content.toTex();

        return `\\sqrt${this.root.toTex() === "2" ? "" : `[${this.root.toTex()}]`}{${content}}`;
    }

    override isEqual(other: Multiplier): boolean {
        if (!(other instanceof Sqrt)) return false;

        return this.root.isEqual(other.root) && this.content.isEqual(other.content);
    }

    override match(other: Multiplier): MatchResult | null {
        if(!(other instanceof Sqrt)) return null;
        const contentMatch = this.content.match(other.content);
        if(!contentMatch) return null;
        const rootMatch = this.root.match(other.root);
        if(!rootMatch || !contentMatch.extend(rootMatch)) return null;
        return contentMatch;
    }

    override substitute(match: MatchResult): Sqrt {
        return new Sqrt(this.content.substitute(match), this.root.substitute(match));
    }

    override copy(): Sqrt {
        return new Sqrt(this.content.copy(), this.root.copy());
    }
}