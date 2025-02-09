import { availibleMathFunc } from "src/app/configs/config";
import { type Expression } from "./expression";
import { type MathStruct, Multiplier } from "./math-structure";


export class Func extends Multiplier {
    readonly name: string;
    readonly content: Expression;
    constructor(name: string, content: Expression) {
        super();
        this.name = name; // function name like "cos", "sin" ...
        this.content = content; // function argument
        this.content.parent = this;
    }

    override toTex(): string {
        return `\\${this.name}\\left(${this.content.toTex()}\\right)`;
    }

    override calculate(): number {
        return availibleMathFunc[this.name as keyof typeof availibleMathFunc](this.content.calculate());
    }

    override isEqual(other: Multiplier): boolean {
        if (!(other instanceof Func)) return false;

        return this.name === other.name && this.content.isEqual(other.content);
    }

    override copy(): Func {
        return new Func(this.name, this.content.copy());
    }

    override get children(): MathStruct[] {
        return [this.content];
    }

    override changeStructure(callback: (struct: MathStruct) => MathStruct): Func {
        return new Func(this.name, callback(this.content) as Expression);
    }
}
