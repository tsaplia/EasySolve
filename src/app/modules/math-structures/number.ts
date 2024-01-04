import { Multiplier, MathStruct, MatchResult } from "./all-structures";

export class Num extends Multiplier {
    value: number;
    constructor(number: number | string) {
        super();

        this.value = Number(number);

        if (this.value < 0) {
            throw new Error("Number must be >= 0");
        }
    }

    toTex(): string {
        return String(this.value);
    }

    isEqual(other: Multiplier): boolean {
        if (!(other instanceof Num)) return false;

        return this.value === other.value;
    }

    match(other: Multiplier): MatchResult | null {
        return this.isEqual(other) ? new MatchResult() : null;
    }

    override substitute(match: MatchResult): MathStruct {
        return this.copy();
    }

    copy(): Num {
        return new Num(this.value);
    }

    override valueOf(): number {
        return this.value;
    }
}