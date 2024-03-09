import { Injectable } from "@angular/core";
import { CanvasLine } from "../models/canvasLine";
import { removeStruct, selected } from "../modules/math-actions/selection/selected";

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _lines: CanvasLine[] = [];
  private _selectedLine: CanvasLine | null = null;

  get lines(): CanvasLine[] {
    return this._lines;  
  }
  addLine(line: CanvasLine) {
    this._lines.push(line);
  }
  setLines(lines: CanvasLine[]) {
    this.clearLines();
    this._lines = [...lines];
  }
  deleteLine(index: number) {
    if(index < 0 || index >= this._lines.length) return;
    let deleted = this._lines.splice(index, 1)[0];
    removeStruct(document.querySelector(`#line-${deleted.id}`) as HTMLElement);
  }
  clearLines() {
    this._lines = [];
    selected.clear();
  }

  get selectedLine(): CanvasLine | null {
    if(selected.type != 'structure') {
      this._selectedLine = null;
      return null;
    }
    let text = selected.getStructureData().structure.toTex();
    if(this._selectedLine?.line != text){
      this._selectedLine = new CanvasLine({line: text, type: 'formula'});
    }
    return this._selectedLine;
  }
}