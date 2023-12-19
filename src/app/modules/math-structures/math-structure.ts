abstract class MathStruct{
    abstract toTex(): string;
    abstract isEqual(other: MathStruct): boolean;
    abstract copy(): MathStruct
}

abstract class Multiplier extends MathStruct {}
