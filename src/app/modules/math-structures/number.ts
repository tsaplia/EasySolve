class Num extends Multiplier {
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

    copy(): Num {
        return new Num(this.value);
    }

    override valueOf(): number {
        return this.value;
    }
}