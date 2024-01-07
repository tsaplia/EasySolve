import { Expression } from "./expression";
import { MatchResult } from "./match-result";
import { MathStruct, Multiplier } from "./math-structure";


export class Func extends Multiplier {
    name: string;
    content: Expression;
    constructor(name: string, content: Expression) {
        super();
        this.name = name; // function name like "cos", "sin" ...
        this.content = content; // function argument
    }

    override toTex(): string {
        return `\\${this.name}\\left(${this.content.toTex()}\\right)`;
    }

    override isEqual(other: Multiplier): boolean {
        if (!(other instanceof Func)) return false;

        return this.name === other.name && this.content.isEqual(other.content);
    }

    override match(other: Multiplier): MatchResult | null {
        if(!(other instanceof Func)) return null;
        if(this.name != other.name) return null;
        return  this.content.match(other.content);
    }

    override substitute(match: MatchResult): Func {
        return new Func(this.name, this.content.substitute(match));
    }

    override copy(): Func {
        return new Func(this.name, this.content.copy());
    }
}