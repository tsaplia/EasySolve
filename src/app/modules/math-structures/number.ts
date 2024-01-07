import { MatchResult } from "./match-result";
import { MathStruct, Multiplier } from "./math-structure";


export class Num extends Multiplier {
    value: number;
    constructor(number: number | string) {
        super();

        this.value = Number(number);

        if (this.value < 0) {
            throw new Error("Number must be >= 0");
        }
    }

    override toTex(): string {
        return String(this.value);
    }

    override isEqual(other: Multiplier): boolean {
        if (!(other instanceof Num)) return false;

        return this.value === other.value;
    }

    override match(other: Multiplier): MatchResult | null {
        return this.isEqual(other) ? new MatchResult() : null;
    }

    override substitute(match: MatchResult): MathStruct {
        return this.copy();
    }

    override copy(): Num {
        return new Num(this.value);
    }

    override valueOf(): number {
        return this.value;
    }
}