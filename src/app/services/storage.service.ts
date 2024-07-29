/* eslint-disable angular/document-service */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Injectable } from "@angular/core";
import { CanvasLine } from "../models/canvasLine";
import { clearSelected, getSelectedElement, removeStruct, selected } from "../modules/math-actions/selection/selected";

@Injectable({
    providedIn: "root"
})
export class StorageService {
    private _lines: CanvasLine[] = [];
    private _selectedLines: string[] = [];
    private _selectionChanged: boolean = false;

    constructor() {
        const lines = localStorage.getItem("lines");
        if (lines !== null) {
            if (JSON.parse(lines).length > 0) {
                this._lines = JSON.parse(lines);
                CanvasLine.currentId = this._lines.sort((a, b) => a.id - b.id)[this._lines.length - 1].id + 1;
            }
        }

        selected.addListener(() => {
            this._selectionChanged = true;
        });
    }

    get lines(): CanvasLine[] {
        return this._lines;
    }

    addLine(line: CanvasLine, index?: number | null, replace?: boolean): void {
        if (index != null && index < this._lines.length && index >= 0) {
            if (replace) {
                this.deleteLine(index);
            }
            this._lines.splice(index, 0, line);
        } else this._lines.push(line);

        this.updateLines();
    }

    setLines(lines: CanvasLine[]): void {
        this.clearLines();
        this._lines = [...lines];
        CanvasLine.currentId = this._lines.sort((a, b) => a.id - b.id)[this._lines.length - 1].id + 1;

        this.updateLines();
    }

    deleteLine(index: number): void {
        if (index < 0 || index >= this._lines.length) return;
        let deleted = this._lines.splice(index, 1)[0];
        // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
        removeStruct(document.querySelector(`#line-${deleted.id}`) as HTMLElement);

        this.updateLines();
    }

    clearLines(): void {
        this._lines = [];
        CanvasLine.currentId = 0;
        clearSelected();

        this.updateLines();
    }

    updateLines(): void {
        localStorage.setItem("lines", JSON.stringify(this._lines));
    }

    get selectedLines(): string[] {
        if (!this._selectionChanged) return this._selectedLines;

        if (selected.type == null) {
            this._selectedLines = [];
            return [];
        } else if (selected.type == "formula") {
            this._selectedLines = selected.formulas!.map(formula => formula.toTex());
        } else if (selected.type == "structure") {
            this._selectedLines = [selected.getStructureData().structure.toTex()];
        }

        this._selectionChanged = false;
        return this._selectedLines;
    }

    get selectionLineIndex(): number | null {
        let elem = getSelectedElement();
        if (!elem?.id.match(/^line-\d+$/)) return null;
        let id = Number(elem.id.match(/^line-(\d+)$/)?.[1]);
        let index = this._lines.findIndex(line => line.id == id);
        return index == -1 ? null : index;
    }
}
