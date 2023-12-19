class Term extends MathStructure {
    sign: "+" | "-";
    content: Multiplier[];
    constructor(content: Multiplier[], sign: '+' | '-' = '+') {
        super();
        this.sign = sign; // plus(+) or minus(-)
        this.content = content; // inner multipliers
    }

    toTex(): string {
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
        console.assert(this.content.length, "Empty term content");
        return str;
    }

    copy(): Term {
        return new Term(this.content.map((mult) => mult.copy()), this.sign);
    }

    isEqual(other: Term): boolean {
        if (this.sign != other.sign || !(other instanceof Term) ||
            this.content.length != other.content.length) return false;
        // !!:attenion code deleted
        for (let i = 0; i < this.content.length; i++) {
            if (!this.content[i].isEqual(other.content[i])) {
                return false;
            }
        }

        return true;
    }

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