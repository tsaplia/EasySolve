import { MathStruct, Multiplier } from "./math-structure";


export class TemplateVar extends Multiplier {
    name: string
    constructor(name: string) {
        super();
        this.name = name;
    }
    override isEqual(other: Multiplier): boolean {
        if (!(other instanceof TemplateVar)) return false;
        return this.name === other.name;
    }

    override toTex(): string {
        return `[${this.name}]`;
    }

    override copy(): TemplateVar {
        return new TemplateVar(this.name);
    }

    override get children(): MathStruct[] {
        return [];
    }

    override changeStructure(): TemplateVar {
        return new TemplateVar(this.name);
    }
}
