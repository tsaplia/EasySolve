import { Expression } from "./expression";
import { MathStruct, Multiplier } from "./math-structure";
import { Num } from "./number";

export class Sqrt extends Multiplier {
    content: Multiplier;
    root: Expression
    constructor(content: Multiplier, root: Expression = Expression.wrap(new Num(2))) {
        super();
        this.root = root;
        this.content = content; 
        this.content.parent = this.root.parent = this;
    }

    override toTex(): string {
        let content = this.content.toTex();

        return `\\sqrt${this.root.toTex() === "2" ? "" : `[${this.root.toTex()}]`}{${content}}`;
    }

    override isEqual(other: Multiplier): boolean {
        if (!(other instanceof Sqrt)) return false;

        return this.root.isEqual(other.root) && this.content.isEqual(other.content);
    }

    override copy(): Sqrt {
        return new Sqrt(this.content.copy(), this.root.copy());
    }

    override get children(): MathStruct[] {
        return [this.content, this.root];
    }

    override changeStructure(callback: (struct: MathStruct, ...args: any[]) => MathStruct, ...args: any[]): Sqrt {
        return new Sqrt(callback(this.content, ...args), callback(this.root, ...args) as Expression);
    }
}