import { MatchResult } from "./match-result";

export abstract class MathStruct{
    abstract toTex(): string;
    abstract isEqual(other: MathStruct): boolean;
    abstract match(other: MathStruct): MatchResult | null;
    abstract copy(): MathStruct;
    abstract substitute(match: MatchResult): MathStruct;
}

export abstract class Multiplier extends MathStruct {}
