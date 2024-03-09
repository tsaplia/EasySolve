import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { CanvasLine } from "src/app/models/canvasLine";
import { availibleActions } from "src/app/modules/math-actions/actions";
import { selected } from "src/app/modules/math-actions/selection/selected";
import { Formula } from "src/app/modules/math-structures/formula";
import { StorageService } from "src/app/services/storage.service";
import templates from "src/assets/actions.json";

declare let MathJax: any;

@Component({
  selector: 'app-interaction',
  templateUrl: 'interaction.component.html',
  styleUrls: ['interaction.component.scss']
})

export class InteractionComponent implements OnInit {
  templates = templates;
  private _lines: CanvasLine[] = [];

  @Output() ActionEvent = new EventEmitter<Formula>();


  get lines(): CanvasLine[] {
    if(this.storage.selectedLine == null) { 
      if(this._lines.length != 0){
        this._lines = [];
        this.updateMJ();
      }  
    }
    else {
      if(this._lines.length == 0) {
        this._lines.push(this.storage.selectedLine);
        this.updateMJ();
      }
      else {
        if(this._lines[0] != this.storage.selectedLine) {
          this._lines[0] = this.storage.selectedLine;
          this.updateMJ();
        }
      }
    }
    return this._lines;
  }

  constructor(private cdRef: ChangeDetectorRef,
              private storage: StorageService) { }
  ngOnInit(): void {
  }

  updateMJ() { // update MathJax  
    this.cdRef.detectChanges();
    MathJax.typeset([document.getElementById("interaction")]);
  }

  useTemplate(id: string) {
    let action = availibleActions.get(id);
    if(!action) return;
    let formula = action();
    if(formula) {
      this.ActionEvent.emit(formula);
      selected.clear();
    }
  }
}