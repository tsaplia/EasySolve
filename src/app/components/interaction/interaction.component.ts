import { ChangeDetectorRef, Component, Input } from "@angular/core";

declare let MathJax: any;

@Component({
  selector: 'app-interaction',
  templateUrl: 'interaction.component.html',
  styleUrls: ['interaction.component.scss']
})

export class InteractionComponent {

  _formula: any[] = [];

  @Input() set formula(value: any) {
    if(this._formula.length == 0) this._formula.push(value); 
    else if(value.index == -1) this._formula = [];
    else this._formula[0] = value;
    this.updateMJ();
    this.cdRef.detectChanges();
  }

  constructor(private cdRef: ChangeDetectorRef) {}
  
  updateMJ() { // update MathJax
    this.cdRef.detectChanges();
    MathJax.typeset([document.getElementById("interaction")]);
  }
}