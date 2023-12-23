import { ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { FormulaModelComponent } from "../formula-model/formula-model.component";
import { timeInterval } from "rxjs";
import { MathQuillService } from "src/app/services/mathquill.service";

declare let MathJax: any;


@Component({
  selector: 'main-component',
  templateUrl: 'main.component.html',
  styleUrls: ['main.component.scss']
})
export class MainComponent implements OnInit {
  @ViewChild("render") qqq: ElementRef;
  //@ViewChild("math-field") mathFieldSpan: ElementRef;
  
  text: string = "";
  lines: string[] = [];
  mathField: any;
  
  constructor(private dialog: MatDialog, private renderer: Renderer2, private cdRef: ChangeDetectorRef, private MQ: MathQuillService) {}

  ngOnInit(): void {
    //this.mathField = this.MQ.createMathField(document.getElementById("math-field") as HTMLSpanElement);
    //mathField.latex() - get input latex
    //MathJax.typeset([document.getElementById("render")]);
  }
  
  openAddFunction() {
    var formulaDialog = this.dialog.open(FormulaModelComponent);
    formulaDialog.afterClosed().subscribe(resp => {
      if(!resp) return;
      this.lines.push(resp.formula);
      this.cdRef.detectChanges();
      MathJax.typeset([document.getElementById((this.lines.length-1).toString())]);
    });
  }

  clear() {
    this.lines = [];
    this.cdRef.detectChanges();
  }
}