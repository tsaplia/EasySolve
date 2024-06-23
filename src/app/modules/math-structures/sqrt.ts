import { toExpression } from "../math-actions/general-actions";
import { Expression } from "./expression";
import { MathStruct, Multiplier } from "./math-structure";
import { Num } from "./number";

export class Sqrt extends Multiplier {
    readonly content: Multiplier;
    readonly root: Expression
    constructor(content: Multiplier, root: Expression = toExpression(new Num(2))) {
        super();
        this.root = root;
        this.content = content; 
        this.content.parent = this.root.parent = this;
    }

    override toTex(): string {
        let content = this.content.toTex();

        return `\\sqrt${this.root.toTex() === "2" ? "" : `[${this.root.toTex()}]`}{${content}}`;
    }

    override calculate(): number {
        let root = this.root.calculate();
        let content = this.content.calculate();
        let sigh = 1;
        if(!Number.isInteger(root) || root <= 0) throw new Error("Root must be integer and > 0");
        if(content < 0){
            if(root % 2 === 0) throw new Error("Root must be >= 0");
            sigh = -1;
            content = -content;
        }
        return sigh * Math.pow(content, 1/root);
    }

    override isEqual(other: Multiplier): boolean {
        if (!(other instanceof Sqrt)) return false;

        return this.root.isEqual(other.root) && this.content.isEqual(other.content);
    }

    override copy(): Sqrt {
        return new Sqrt(this.content.copy(), this.root.copy());
    }

    override get children(): MathStruct[] {
        let res = [this.content];
        if(this.root.toTex() !== "2") res.push(this.root);
        return res;
    }

    override changeStructure(callback: (struct: MathStruct) => MathStruct): Sqrt {
        return new Sqrt(callback(this.content), callback(this.root) as Expression);
    }
}