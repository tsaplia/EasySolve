import { Expression } from "./expression";
import { MatchResult } from "./match-result";
import { Multiplier } from "./math-structure";
import { Num } from "./number";



export class Exponent extends Multiplier {
    base: Multiplier
    exponent: Expression
    constructor(base: Multiplier, exponent: Expression) {
        super();
        this.base = base;
        this.exponent = exponent;
    }

    toTex(): string {
        let str = this.base.toTex();
        if (this.base instanceof Expression) {
            str = "\\left("+str+"\\right)";
        }

        if (this.exponent) {
            if (this.exponent.toTex().length == 1) {
                str += `^${this.exponent.toTex()}`;
            } else {
                str += `^{${this.exponent.toTex()}}`;
            }
        }
        return str;
    }

    isEqual(other: Multiplier): boolean {
        if (!(other instanceof Exponent)) return false;

        return ((!this.exponent && !other.exponent) || this.exponent.isEqual(other.exponent)) &&
            this.base.isEqual(other.base);
    }

    match(other: Multiplier): MatchResult | null {
        if (!(other instanceof Exponent)) return null;
        const baseMatch = this.base.match(other.base);
        if(!baseMatch) return null;
        const exponentMatch = this.exponent.match(other.exponent);
        if(!exponentMatch || !baseMatch.extend(exponentMatch)) return null;
        return baseMatch;
    }

    substitute(match: MatchResult): Exponent {
        return new Exponent(this.base.substitute(match), this.exponent.substitute(match));
    }

    copy(): Exponent {
        return new Exponent(this.base.copy(), this.exponent.copy());
    }

    static getExponent(structure: Multiplier): [Multiplier, Expression] {
        if (structure instanceof Exponent) {
            return [structure.base, structure.exponent];
        }

        return [structure, Expression.wrap(new Num(1))];
    }
}