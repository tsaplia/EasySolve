class Expression extends Multiplier{
    content: Term[]
    constructor(content: Term[]) {
        super();
        this.content = content; // inner terms of block
    }

    toTex(): string {
        let str = "";
        for (let i = 0; i < this.content.length; i++) {
            if (i != 0 || this.content[i].sign != "+") {
                str += this.content[i].sign;
            }

            str += this.content[i].toTex();
        }

        console.assert(this.content.length, "Empty block content");

        return str;
    }

    isEqual(other: Multiplier): boolean {
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

    copy(): Expression {
        return new Expression(this.content.map((term) => term.copy()));
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

    static wrap(struct: Multiplier | Term, sign: '+' | '-' = "+"): Expression {
        if (struct instanceof Term) {
            return new Expression([struct]);
        }

        return new Expression([new Term([struct], sign)]);
    }
}