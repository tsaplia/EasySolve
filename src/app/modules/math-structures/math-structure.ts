abstract class MathStructure{
    abstract toTex(): string;
    abstract isEqual(other: MathStructure): boolean;
    abstract copy(): MathStructure
}

abstract class Multiplier extends MathStructure {}
