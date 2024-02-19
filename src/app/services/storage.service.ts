import { Injectable } from "@angular/core";
import { CanvasLine } from "../models/canvasLine";

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
    this._lines = lines;
  }
  deleteLine(index: number) {
    this._lines.splice(index, 1);
  }
  clearLines() {
    this._lines = [];
  }

  get selectedLine(): CanvasLine | null {
    return this._selectedLine;
  }
  set selectedLine(line: CanvasLine | null) {
    this._selectedLine = line;
  }
}