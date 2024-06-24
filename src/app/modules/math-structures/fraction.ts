import { toExpression } from "../math-actions/actions/base-actions";
import { type MathStruct, Multiplier } from "./math-structure";
import { type Term } from "./term";


export class Frac extends Multiplier {
    readonly numerator: Term;
    readonly denomerator: Term;
    constructor(numerator: Term, denomerator: Term) {
        super();
        this.numerator = numerator;
        this.denomerator = denomerator;
        this.numerator.parent = this.denomerator.parent = this;
    }

    override toTex(): string {
        let num = toExpression(this.numerator).toTex();
        let denom = toExpression(this.denomerator).toTex();

        return `\\frac{${num}}{${denom}}`;
    }

    override calculate(): number {
        let num = this.numerator.calculate();
        let den = this.denomerator.calculate();
        if (den === 0) throw new Error("Cannot divide by zero");
        return num / den;
    }

    override isEqual(other: Multiplier): boolean {
        if (!(other instanceof Frac)) return false;

        return this.numerator.isEqual(other.numerator) && this.denomerator.isEqual(other.denomerator);
    }

    override copy(): Frac {
        return new Frac(this.numerator.copy(), this.denomerator.copy());
    }

    override get children(): MathStruct[] {
        return [this.numerator, this.denomerator];
    }

    override changeStructure(callback: (struct: MathStruct) => MathStruct): Frac {
        return new Frac(callback(this.numerator) as Term, callback(this.denomerator) as Term);
    }
}
