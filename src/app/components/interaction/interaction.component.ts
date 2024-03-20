import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { CanvasLine } from "src/app/models/canvasLine";
import { availibleActions } from "src/app/modules/math-actions/actions";
import { clearSelected, selected } from "src/app/modules/math-actions/selection/selected";
import { Formula } from "src/app/modules/math-structures/formula";
import { StorageService } from "src/app/services/storage.service";
import templates from "src/assets/actions.json";

declare let MathJax: any;

@Component({
  selector: 'app-interaction',
  templateUrl: 'interaction.component.html',
  styleUrls: ['interaction.component.scss']
})

export class InteractionComponent implements AfterViewInit {
  templates = templates;
  private _preview: Formula[] = [];
  private _lines: CanvasLine[] = [];

  @Output() ActionEvent = new EventEmitter<Formula[]>();


  set preview(formulas: Formula[]) {
    this._preview = [...formulas];
    this.updateMJ();
  }
  get preview(): Formula[] {
    return this._preview;
  }

  get lines() {
    return this._lines;
  }

  constructor(private cdRef: ChangeDetectorRef,
              private storage: StorageService) { }

  ngDoCheck(){
    let newLines = this.storage.selectedLines;
    if(newLines.length != this._lines.length || newLines.some((newLine, index) => newLine.line != this._lines[index].line)) {
      this._lines = [...newLines];
      this.updateMJ();
    }
  }

  ngAfterViewInit(): void {
      this.updateMJ();
  }

  addOutputToLines() {
    this.ActionEvent.emit(this.preview);
    this.preview = [];
    clearSelected();
  }

  updateMJ() { // update MathJax  
    this.cdRef.detectChanges();
    MathJax.typeset([document.getElementById("interaction")]);
  }

  useTemplate(id: string) {
    let action = availibleActions.get(id);
    if(!action) return;
    let formulas = action();
    if(formulas) {
      this.preview = formulas;
    }else{
      alert("can not use this template");
    }
  }
}