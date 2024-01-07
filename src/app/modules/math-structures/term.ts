import { Expression } from "./expression";
import { MatchResult } from "./match-result";
import { MathStruct, Multiplier } from "./math-structure";


export class Term extends MathStruct {
    sign: "+" | "-";
    content: Multiplier[];
    constructor(content: Multiplier[], sign: '+' | '-' = '+') {
        super();
        this.sign = sign; // plus(+) or minus(-)
        this.content = content; // inner multipliers
    }

    override toTex(): string {
        let str = "";
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
        console.assert(!!this.content.length, "Empty term content");
        return str;
    }

    override copy(): Term {
        return new Term(this.content.map((mult) => mult.copy()), this.sign);
    }

    override isEqual(other: Term): boolean {
        if (this.sign != other.sign || !(other instanceof Term) ||
            this.content.length != other.content.length) return false;
        // !!:attention code deleted
        for (let i = 0; i < this.content.length; i++) {
            if (!this.content[i].isEqual(other.content[i])) {
                return false;
            }
        }

        return true;
    }

    override match(other: Multiplier): MatchResult | null {
        if(!(other instanceof Term) || this.content.length != other.content.length) return null;
        const result = new MatchResult();
        for (let i = 0; i < this.content.length; i++) {
            const match = this.content[i].match(other.content[i]);
            if (!match || !result.extend(match)) return null;
        }
        return result;
    }

    override substitute(match: MatchResult): Term {
        return new Term(this.content.map((mult) => mult.substitute(match)), this.sign);
    }

    // !!: may be changed
    changeSign() {
        this.sign = this.sign == "+" ? "-" : "+";
    }

    // !!: may be changed
    removeExtraBlocks(start: number = 0, end: number = this.content.length): void {
        for (let i = start; i < end; i++) {
            let mult = this.content[i];
            if (!(mult instanceof Expression) || mult.content.length != 1) continue;

            this.content.splice(this.content.indexOf(mult), 1, ...mult.content[0].content);
            if (mult.content[0].sign == "-") this.changeSign();
        }
    }
}