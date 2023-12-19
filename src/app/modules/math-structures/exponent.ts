class Exponent extends MathStructure {
    base: Multiplier
    exponent: Expression
    constructor(base: Multiplier, exponent: Expression) {
        super();
        this.base = base;
        this.exponent = exponent;
    }

    toTex(): string {
        let str = this.base.toTex();
        if (this.base instanceof Expression) {
            str = "\\left("+str+"\\right)";
        }

        if (this.exponent) {
            if (this.exponent.toTex().length == 1) {
                str += `^${this.exponent.toTex()}`;
            } else {
                str += `^{${this.exponent.toTex()}}`;
            }
        }
        return str;
    }

    isEqual(other: Multiplier): boolean {
        if (!(other instanceof Exponent)) return false;

        return ((!this.exponent && !other.exponent) || this.exponent.isEqual(other.exponent)) &&
            this.base.isEqual(other.base);
    }

    copy(): Exponent {
        return new Exponent(this.base.copy(), this.exponent.copy());
    }

    static getExponent(structure: MathStructure): [MathStructure, Expression] {
        if (structure instanceof Exponent) {
            return [structure.base, structure.exponent];
        }

        return [structure, Expression.wrap(new Num(1))];
    }
}