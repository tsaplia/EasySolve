import { type MathStruct, Multiplier } from "./math-structure";

export class Unit extends Multiplier {
    readonly name: string;
    constructor(name: string) {
        super();

        this.name = name;
    }

    override toTex(): string {
        return `\\text{${this.name}}`;
    }

    override calculate(): number {
        throw new Error("Units of measure cannot be calculated");
    }

    override isEqual(other: Multiplier): boolean {
        if (!(other instanceof Unit)) return false;

        return this.name === other.name;
    }

    override copy(): Unit {
        return new Unit(this.name);
    }

    override get children(): MathStruct[] {
        return [];
    }

    override changeStructure(): Unit {
        return new Unit(this.name);
    }

    override valueOf(): string {
        return this.name;
    }
}
