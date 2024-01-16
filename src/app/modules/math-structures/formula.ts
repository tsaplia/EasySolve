import { Expression } from "./expression";
import { MathStruct } from "./math-structure";


export class Formula extends MathStruct {
    equalityParts: Expression[];
    constructor(equalityParts:Expression[]) {
        super();
        this.equalityParts = equalityParts;
        this.equalityParts.forEach((part) => part.parent = this);
    }

    override toTex(): string {
        let TeX = "";
        for (let part of this.equalityParts) {
            TeX += (TeX ? "=" : "") + part.toTex();
        }
        return TeX;
    }

    override copy(): Formula {
        return new Formula(this.equalityParts.map((part) => part.copy()));
    }

    override isEqual(other: MathStruct): boolean {
        if (!(other instanceof Formula)) return false;
        if (this.equalityParts.length != other.equalityParts.length) return false;

        for (let i=0; i<this.equalityParts.length; i++) {
            if (!this.equalityParts[i].isEqual(other.equalityParts[i])) return false;
        }
        return true;
    }

    override get children(): MathStruct[] {
        return this.equalityParts;
    }

    override changeStructure(callback: (struct: MathStruct, ...args: any[]) => MathStruct, ...args: any[]): Formula {
        return new Formula(this.equalityParts.map((part) => callback(part, ...args) as Expression));
    }
}