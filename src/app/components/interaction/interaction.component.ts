import { ChangeDetectorRef, Component, Input } from "@angular/core";
import { CanvasLine } from "src/app/models/canvasLine";

declare let MathJax: any;

@Component({
  selector: 'app-interaction',
  templateUrl: 'interaction.component.html',
  styleUrls: ['interaction.component.scss']
})

export class InteractionComponent {

  _line: CanvasLine[] = [];

  @Input() set line(value: CanvasLine) {
    if(!value) return;
    
    if(this._line.length == 0) this._line.push(value); 
    else if(this._line[0].id == value.id) this._line = [];
    else this._line[0] = value;

    

    this.updateMJ();
    this.cdRef.detectChanges();
  }

  constructor(private cdRef: ChangeDetectorRef) {}
  
  updateMJ() { // update MathJax  
    this.cdRef.detectChanges();
    MathJax.typeset([document.getElementById("interaction")]);
  }
// you can rename all this funtions and buttons. Also you can add new if you need.

  btn1() {
    
  }
  btn2() {
    
  }
  btn3() {
    
  }
  btn4() {
    
  }
  btn5() {
    
  }
}