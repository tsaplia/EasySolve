import { toExpression } from "../math-actions/general-actions";
import { Expression } from "./expression";
import { type MathStruct, Multiplier } from "./math-structure";
import { Num } from "./number";


export class Exponent extends Multiplier {
    readonly base: Multiplier;
    readonly exponent: Expression;
    constructor(base: Multiplier, exponent: Expression) {
        super();
        this.base = base;
        this.exponent = exponent;
        exponent.parent = base.parent = this;
    }

    override toTex(): string {
        let str = this.base.toTex();
        if (this.base instanceof Expression) {
            str = "\\left(" + str + "\\right)";
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

    override isEqual(other: Multiplier): boolean {
        if (!(other instanceof Exponent)) return false;

        return ((!this.exponent && !other.exponent) || this.exponent.isEqual(other.exponent)) &&
            this.base.isEqual(other.base);
    }

    override copy(): Exponent {
        return new Exponent(this.base.copy(), this.exponent.copy());
    }

    override calculate(): number {
        return Math.pow(this.base.calculate(), this.exponent.calculate());
    }

    override get children(): MathStruct[] {
        return [this.base, this.exponent];
    }

    override changeStructure(callback: (struct: MathStruct) => MathStruct): Exponent {
        return new Exponent(callback(this.base), callback(this.exponent) as Expression);
    }

    static getExponent(structure: Multiplier): [Multiplier, Expression] {
        if (structure instanceof Exponent) {
            return [structure.base, structure.exponent];
        }

        return [structure, toExpression(new Num(1))];
    }
}
