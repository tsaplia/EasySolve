import { MathStruct, Expression, MatchResult } from "./all-structures";

export class Formula extends MathStruct {
    equalityParts: Expression[];
    constructor(equalityParts:Expression[]) {
        super();
        this.equalityParts = equalityParts;
    }

    toTex(): string {
        let TeX = "";
        for (let part of this.equalityParts) {
            TeX += (TeX ? "=" : "") + part.toTex();
        }
        return TeX;
    }

    copy(): Formula {
        return new Formula(this.equalityParts.map((part) => part.copy()));
    }

    isEqual(other: MathStruct): boolean {
        if (!(other instanceof Formula)) return false;
        if (this.equalityParts.length != other.equalityParts.length) return false;

        for (let i=0; i<this.equalityParts.length; i++) {
            if (!this.equalityParts[i].isEqual(other.equalityParts[i])) return false;
        }
        return true;
    }

    match(other: MathStruct): MatchResult | null {
        if (!(other instanceof Formula) || this.equalityParts.length != other.equalityParts.length) return null;
        const result = new MatchResult();
        for (let i = 0; i < this.equalityParts.length; i++) {
            const match = this.equalityParts[i].match(other.equalityParts[i]);
            if (!match || !result.extend(match)) return null;
        }
        return result;
    }

    substitute(match: MatchResult): Formula {
        return new Formula(this.equalityParts.map((part) => part.substitute(match)));
    }
}