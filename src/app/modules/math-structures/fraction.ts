import { toExpression } from "../math-actions/structure-actions";
import { Expression } from "./expression";
import { MathStruct, Multiplier } from "./math-structure";
import { Term } from "./term";


export class Frac extends Multiplier {
    numerator: Term;
    denomerator: Term;
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