import { readonlyArray } from "src/app/configs/utils";
import { Expression } from "./expression";
import { MathStruct, Multiplier } from "./math-structure";
import { Num } from "./number";


export class Term extends MathStruct {
    readonly sign: "+" | "-";
    readonly content: Multiplier[];
    constructor(content: Multiplier[], sign: '+' | '-' = '+') {
        super();
        this.sign = sign; // plus(+) or minus(-)
        this.content = readonlyArray(content); // inner multipliers
        if(this.content.length == 0) this.content = [new Num(1)];
        this.content.forEach((mult)=>mult.parent = this);
    }

    override toTex(): string {
        let str = this.sign;
        for (let i = 0; i < this.content.length; i++) {
            if (!isNaN(Number(this.content[i].toTex()[0])) && !(this.content[i] instanceof Expression) && i > 0) {
                str += "\\cdot ";
            }
            if (this.content[i] instanceof Expression) {
                str += `\\left(${this.content[i].toTex()}\\right)`;
            } else {
                str += this.content[i].toTex();
            }
        }
        return str;
    }

    override copy(): Term {
        return new Term(this.content.map((mult) => mult.copy()), this.sign);
    }

    override calculate(): number {
        let content = this.content.reduce((acc, cur)=> acc * cur.calculate(), 1);
        return this.sign == "+" ? content : -content;
    }

    override isEqual(other: MathStruct): boolean {
        if (!(other instanceof Term) || this.sign != other.sign || 
            this.content.length != other.content.length) return false;
        // !!:attention code deleted
        for (let i = 0; i < this.content.length; i++) {
            if (!this.content[i].isEqual(other.content[i])) {
                return false;
            }
        }

        return true;
    }

    override get children(): MathStruct[] {
        return [...this.content];
    }

    override changeStructure(callback: (struct: MathStruct) => MathStruct): Term {
        return new Term(this.content.map((mult) => callback(mult)), this.sign);
    }
}