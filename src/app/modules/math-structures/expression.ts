import { MathStruct, Multiplier } from "./math-structure";
import { Term } from "./term";


export class Expression extends Multiplier{
    content: Term[]
    constructor(content: Term[]) {
        super();
        this.content = content; // inner terms of block
        this.content.forEach((term)=>term.parent = this);
    }

    override toTex(): string {
        let str = "";
        for (let i = 0; i < this.content.length; i++) {
            if (i != 0 || this.content[i].sign != "+") {
                str += this.content[i].sign;
            }

            str += this.content[i].toTex();
        }

        console.assert(!!this.content.length, "Empty block content");

        return str;
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
        return new Expression(this.content.map((term) => term.copy()));
    }

    override get children(): MathStruct[] {
        return this.content;
    }

    override changeStructure(callback: (struct: MathStruct, ...args: any[]) => MathStruct, ...args: any[]): Expression {
        return new Expression(this.content.map((term) => callback(term, ...args) as Term));
    }

    /** remove all plus-terms with only block multiplier */
    // !!: may be changed
    removeExtraBlocks() {
        let modified = false;
        for (let term of this.content) {
            if (term.content.length == 1 && term.content[0] instanceof Expression && term.sign == "+") {
                this.content.splice(this.content.indexOf(term), 1, ...term.content[0].content);
                modified = true;
            }
        }

        return modified;
    }
}