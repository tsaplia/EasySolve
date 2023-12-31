import { Expression } from "./expression";
import { MatchResult } from "./match-result";
import { MathStruct, Multiplier } from "./math-structure";
import { Term } from "./term";


export class Frac extends Multiplier {
    numerator: Term;
    denomerator: Term;
    constructor(numerator: Term, denomerator: Term) {
        super();
        this.numerator = numerator;
        this.denomerator = denomerator;
    }
    override toTex(): string {
        let num = new Expression([this.numerator]).toTex();
        let denom = new Expression([this.denomerator]).toTex();

        if (this.numerator.content.length == 1 && this.numerator.sign == "+" &&
            this.numerator.content[0] instanceof Expression) {
            num = this.numerator.content[0].toTex();
        }
        if (this.denomerator.content.length == 1 && this.denomerator.sign == "+" &&
            this.denomerator.content[0] instanceof Expression) {
            denom = this.denomerator.content[0].toTex();
        }

        return `\\frac{${num}}{${denom}}`;
    }

    override isEqual(other: Multiplier): boolean {
        if (!(other instanceof Frac)) return false;

        return this.numerator.isEqual(other.numerator) && this.denomerator.isEqual(other.denomerator);
    }

    override match(other: Multiplier): MatchResult | null {
        if (!(other instanceof Frac)) return null;
        let numMatch = this.numerator.match(other.numerator);
        if (!numMatch) return null;
        let denomMatch = this.denomerator.match(other.denomerator);
        if(!denomMatch || !numMatch.extend(denomMatch)) return null;
        return numMatch;
    }

    override substitute(match: MatchResult): Frac {
        return new Frac(this.numerator.substitute(match), this.denomerator.substitute(match));
    }

    override copy(): Frac {
        return new Frac(this.numerator.copy(), this.denomerator.copy());
    }
}