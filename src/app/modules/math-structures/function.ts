class Func extends Multiplier {
    name: string;
    content: Expression;
    constructor(name: string, content: Expression) {
        super();
        this.name = name; // function name like "cos", "sin" ...
        this.content = content; // function argument
    }

    toTex(): string {
        return `\\${this.name}\\left(${this.content.toTex()}\\right)`;
    }

    isEqual(other: Multiplier): boolean {
        if (!(other instanceof Func)) return false;

        return this.name === other.name && this.content.isEqual(other.content);
    }

    copy(): Func {
        return new Func(this.name, this.content.copy());
    }
}