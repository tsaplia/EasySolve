class Frac extends Multiplier {
    numerator: Term;
    denomerator: Term;
    constructor(numerator: Term, denomerator: Term) {
        super();
        this.numerator = numerator;
        this.denomerator = denomerator;
    }
    toTex(): string {
        let num = new Expression([this.numerator]).toTex();
        let denom = new Expression([this.denomerator]).toTex();

        if (this.numerator.content.length == 1 && this.numerator.sign == "+" &&
            this.numerator.content[0] instanceof Expression) {
            num = this.numerator.content[0].toTex();
        }
        if (this.denomerator.content.length == 1 && this.denomerator.sign == "+" &&
            this.denomerator.content[0] instanceof Expression) {
            denom = this.denomerator.content[0].toTex();
        }

        return `\\frac{${num}}{${denom}}`;
    }

    isEqual(other: Multiplier): boolean {
        if (!(other instanceof Frac)) return false;

        return this.numerator.isEqual(other.numerator) && this.denomerator.isEqual(other.denomerator);
    }


    copy(): Frac {
        return new Frac(this.numerator.copy(), this.denomerator.copy());
    }
}