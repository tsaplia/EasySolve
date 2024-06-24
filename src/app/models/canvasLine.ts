export class CanvasLine {
    private static currentId = 0;
    id: number;
    type: "text" | "formula";
    line: string;

    constructor(obj?: { type: "text" | "formula", line: string }) {
        if (obj) Object.assign(this, obj);
        this.id = CanvasLine.currentId++;
    }
}
