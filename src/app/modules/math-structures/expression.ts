import { readonlyArray } from "src/app/configs/utils";
import { type MathStruct, Multiplier } from "./math-structure";
import { Num } from "./number";
import { Term } from "./term";


export class Expression extends Multiplier {
    readonly content: Term[];
    constructor(content: Term[]) {
        super();
        this.content = readonlyArray(content); // inner terms of block
        if (this.content.length == 0) this.content = [new Term([new Num(0)])];
        this.content.forEach(term => (term.parent = this));
    }

    override toTex(): string {
        let str = "";
        for (let i = 0; i < this.content.length; i++) {
            str += this.content[i].toTex();
        }

        if (this.content[0].sign == "+") str = str.slice(1);

        return str;
    }

    override calculate(): number {
        return this.content.reduce((acc, cur) => acc + cur.calculate(), 0);
    }

    override isEqual(other: Multiplier): boolean {
        if (!(other instanceof Expression) || this.content.length != other.content.length) {
            return false;
        }

        for (let i = 0; i < this.content.length; i++) {
            if (!this.content[i].isEqual(other.content[i])) {
                return false;
            }
        }

        return true;
    }

    override copy(): Expression {
        return new Expression(this.content.map(term => term.copy()));
    }

    override get children(): MathStruct[] {
        return [...this.content];
    }

    override changeStructure(callback: (struct: MathStruct) => MathStruct): Expression {
        return new Expression(this.content.map(term => callback(term) as Term));
    }
}
