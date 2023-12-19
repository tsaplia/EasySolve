class Sqrt extends MathStructure {
    content: Multiplier;
    root: Expression
    constructor(content: Multiplier, root: Expression = Expression.wrap(new Num(2))) {
        super();
        this.root = root;
        this.content = content; 
    }

    toTex(): string {
        let content = this.content.toTex();

        return `\\sqrt${this.root.toTex() === "2" ? "" : `[${this.root.toTex()}]`}{${content}}`;
    }

    isEqual(other: Multiplier): boolean {
        if (!(other instanceof Sqrt)) return false;

        return this.root.isEqual(other.root) && this.content.isEqual(other.content);
    }

    copy(): Sqrt {
        return new Sqrt(this.content.copy(), this.root.copy());
    }
}