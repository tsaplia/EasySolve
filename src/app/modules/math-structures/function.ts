import { Expression } from "./expression";
import { MathStruct, Multiplier } from "./math-structure";


export class Func extends Multiplier {
    name: string;
    content: Expression;
    constructor(name: string, content: Expression) {
        super();
        this.name = name; // function name like "cos", "sin" ...
        this.content = content; // function argument
        this.content.parent = this;
    }

    override toTex(): string {
        return `\\${this.name}\\left(${this.content.toTex()}\\right)`;
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