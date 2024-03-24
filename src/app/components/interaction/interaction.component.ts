import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { CanvasLine } from "src/app/models/canvasLine";
import { availibleActions } from "src/app/modules/math-actions/actions";
import { clearSelected } from "src/app/modules/math-actions/selection/selected";
import { SubPartModes, availableModes, useMode,  } from "src/app/modules/math-actions/templates/part-substitution";
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
  public selLines: CanvasLine[] = [];
  public availibleModes: SubPartModes = availableModes();

  @Output() ActionEvent = new EventEmitter<Formula[]>();


  set preview(formulas: Formula[]) {
    this._preview = [...formulas];
    this.availibleModes =  this._preview.length > 0 ? availableModes() : {newLine: false, replace: false, addToEnd: false};
    this.updateMJ();
  }
  get preview(): Formula[] { return this._preview; }

  constructor(private cdRef: ChangeDetectorRef,
              private storage: StorageService) { }

  ngDoCheck(){
    let newLines = this.storage.selectedLines;
    if(newLines.length != this.selLines.length || newLines.some((newLine, index) => newLine.line != this.selLines[index].line)) {
      this.selLines = [...newLines];
      this._preview = [];
      this.updateMJ();
    }
  }

  ngAfterViewInit(): void {
      this.updateMJ();
  }

  addOutputToLines(mode: keyof SubPartModes) {
    this.ActionEvent.emit(useMode(mode, this.preview));
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
      console.log("can not use this template");
    }
  }
}