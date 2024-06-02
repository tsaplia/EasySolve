import {  MathStruct, Multiplier } from "./math-structure";

export class Variable extends Multiplier {
    readonly name: string;
    index: string | null;
    vector: boolean;
    primeCount: number;
    constructor(name: string, index: string | null = null, vector: boolean = false, primeCount: number = 0) {
        super();
        this.name = name;
        this.index = index;
        this.vector = vector;
        this.primeCount = primeCount;
    }

    override toTex(): string {
        let TeX = this.name;
        for (let i=0; i<this.primeCount; i++) TeX+="'";
        if (this.index) {
            TeX += "_" + (this.index.length == 1 ? this.index: `{${this.index}}`);
        }
        if (this.vector) {
            TeX = `\\vec{${TeX}}`;
        }
        return TeX;
    }

    override isEqual(other: Multiplier): boolean {
        if (!(other instanceof Variable)) return false;

        return this.name === other.name && this.vector==other.vector && this.index === other.index && this.primeCount==other.primeCount;
    }

    override copy(): Variable {
        return new Variable(this.name, this.index, this.vector, this.primeCount);
    }

    override get children(): Multiplier[] {
        return [];
    }

    override changeStructure(): Variable {
        return new Variable(this.name, this.index, this.vector, this.primeCount);
    }
}
