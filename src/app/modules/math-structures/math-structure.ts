import { Expression } from "./expression";
import { Term } from "./term";

export abstract class MathStruct{
    parent: MathStruct | null = null;
    abstract toTex(): string;
    abstract isEqual(other: MathStruct): boolean;
    abstract copy(): MathStruct;
    abstract get children(): MathStruct[];
    abstract changeStructure(callback: (struct: MathStruct, ...args: any[])=>MathStruct , ...args: any[]): MathStruct;
}

export abstract class Multiplier extends MathStruct {
    static toMultiplier(struct: MathStruct): Multiplier {
        if(struct instanceof Term){
            return struct.sign == "+" && struct.content.length==0 ? struct.content[0].copy() : new Expression([struct.copy()]);
        }if(struct instanceof Expression){
            return struct.content.length==0 ? Multiplier.toMultiplier(struct.content[0]) : struct.copy();
        }
        return struct.copy();
    }
}
