import { Injectable } from "@angular/core";
import { CanvasLine } from "../models/canvasLine";
import { clearSelected, getSelectedElement, removeStruct, selected } from "../modules/math-actions/selection/selected";

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _lines: CanvasLine[] = [];
  private _selectedLines: CanvasLine[] = [];

  get lines(): CanvasLine[] {
    return this._lines;  
  }
  addLine(line: CanvasLine, index?: number|null, replace?: boolean) {
    if(index!=null && index < this._lines.length && index >= 0) {
      if(replace){
        this.deleteLine(index);
      }
      this._lines.splice(index, 0, line);
    }
    else this._lines.push(line);
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
    clearSelected();
  }

  get selectedLines(): CanvasLine[] {
    if(selected.type == null) {
      this._selectedLines = [];
      return [];
    }
    if(selected.type == 'formula'){
      let selTex = selected.selectedFormulas?.map(formula => formula.toTex());
      for(let i=0; i<this._selectedLines.length; i++) {
        if(selTex?.includes(this._selectedLines[i].line)) {
          selTex.splice(selTex.indexOf(this._selectedLines[i].line), 1);
        }else{
          this._selectedLines.splice(i, 1);
          i--;
        }
      }
      selTex?.forEach(tex => {
        this._selectedLines.push(new CanvasLine({line: `$${tex}$`, type: 'formula'}));
      });
    }
    if(selected.type == 'structure'){
      let tex = selected.getStructureData().structure.toTex();
      if(this._selectedLines?.[0]?.line != tex){
        this._selectedLines = [new CanvasLine({line: `$${tex}$`, type: 'formula'})];
      }
    }
    return this._selectedLines;
  }

  get selectionLineIndex(): number | null {
    let elem = getSelectedElement();
    if(!elem || !elem.id.match(/^line-\d+$/)) return null;
    let id = Number(elem.id.match(/^line-(\d+)$/)?.[1]);
    let index = this._lines.findIndex(line => line.id == id);
    return index == -1 ? null : index;
  }
}