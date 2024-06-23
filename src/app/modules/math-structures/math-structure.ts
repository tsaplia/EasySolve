export abstract class MathStruct{
    private _parent: MathStruct | null = null;
    get parent(): MathStruct | null { 
        return this._parent; 
    }
    set parent(parent: MathStruct | null) {
        if(this._parent) throw new Error("Parent already set");
        this._parent = parent;
    }
    abstract toTex(): string;
    abstract isEqual(other: MathStruct): boolean;
    abstract copy(): MathStruct;
    abstract get children(): MathStruct[];
    abstract changeStructure(callback: (struct: MathStruct)=>MathStruct): MathStruct;
    abstract calculate(): number;
}


export abstract class Multiplier extends MathStruct {}