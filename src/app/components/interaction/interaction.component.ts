import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from "@angular/core";
import { CanvasLine } from "src/app/models/canvasLine";
import { availibleActions } from "src/app/modules/math-actions/actions";
import { Formula } from "src/app/modules/math-structures/formula";
import templates from "src/assets/templates.json";

declare let MathJax: any;

@Component({
  selector: 'app-interaction',
  templateUrl: 'interaction.component.html',
  styleUrls: ['interaction.component.scss']
})

export class InteractionComponent {
  templates = templates;
  _line: CanvasLine[] = [];

  @Output() ActionEvent = new EventEmitter<Formula>();

  @Input() set line(value: CanvasLine) {
    if(!value) return;
    
    if(this._line.length == 0) this._line.push(value); 
    else if(this._line[0].id == value.id) this._line = [];
    else this._line[0] = value;

    

    this.updateMJ();
    this.cdRef.detectChanges();
  }

  constructor(private cdRef: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.updateMJ();
    console.log(templates);
  }
  
  updateMJ() { // update MathJax  
    this.cdRef.detectChanges();
    MathJax.typeset([document.getElementById("interaction")]);
  }

  useTemplate(id: string) {
    let action = availibleActions.get(id);
    if(!action) return;
    let formula = action();
    console.log(formula?.toTex(), "new formula");
    if(formula) this.ActionEvent.emit(formula);
  }

}