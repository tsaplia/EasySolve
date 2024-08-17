import { toPrecision } from "src/app/configs/utils";
import { type MathStruct, Multiplier } from "./math-structure";
import { MAX_PRECISION, PRECISION } from "src/app/configs/config";


export class Num extends Multiplier {
    readonly value: number;
    constructor(number: number | string) {
        super();

        this.value = toPrecision(Number(number), MAX_PRECISION);

        if (this.value < 0) {
            throw new Error("Number must be >= 0");
        }
    }

    override toTex(): string {
        return String(toPrecision(this.value, PRECISION));
    }

    override calculate(): number {
        return this.value;
    }

    override isEqual(other: Multiplier): boolean {
        if (!(other instanceof Num)) return false;

        return this.value === other.value;
    }

    override copy(): Num {
        return new Num(this.value);
    }

    override get children(): MathStruct[] {
        return [];
    }

    override changeStructure(): Num {
        return new Num(this.value);
    }

    override valueOf(): number {
        return this.value;
    }
}
