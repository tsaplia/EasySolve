export abstract class MathStruct{
    parent: MathStruct | null = null;
    abstract toTex(): string;
    abstract isEqual(other: MathStruct): boolean;
    abstract copy(): MathStruct;
    abstract get children(): MathStruct[];
    abstract changeStructure(callback: (struct: MathStruct, ...args: any[])=>MathStruct , ...args: any[]): MathStruct;
}

export abstract class Multiplier extends MathStruct {}
