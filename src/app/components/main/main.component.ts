import { ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { FormulaModelComponent } from "../formula-model/formula-model.component";
import { timeInterval } from "rxjs";
import { formulaFromTeX, templateFromTeX } from "src/app/modules/math-actions/from-tex";
import { useTemplate } from "src/app/modules/math-actions/templete-functions";

declare let MathJax: any;


@Component({
  selector: 'main-component',
  templateUrl: 'main.component.html',
  styleUrls: ['main.component.scss']
})
export class MainComponent implements OnInit {
  @ViewChild("render") qqq: ElementRef;
  // tamplate check

  formula: string = '\\sin\\left(2\\pi\\right)';
  template: string = '\\sin\\left(2x\\right)=>\\sin\\left(x\\right)\\cos\\left(x\\right)';

  result: string = '';

  text: string = "$$ px^2 + qx + r = 0 $$";
  lines: string[] = [];
  mathField: any;

  selectionFlag: boolean = false;
  clearFlag: boolean = false;
  dictionaryFlag: boolean = false;
  
  constructor(private dialog: MatDialog, private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    let t = templateFromTeX(this.template);
    let f = formulaFromTeX(this.formula);
    this.result = useTemplate(t, f)?.toTex() || 'null';
  }
  
  openAddFunction() {
    var formulaDialog = this.dialog.open(FormulaModelComponent);
    formulaDialog.afterClosed().subscribe(resp => {
      if(!resp || resp.formula == '$$') return;
      this.lines.push(resp.formula);
      this.updateMJ();
    });
  }

  clear() {
    this.lines = [];
    this.cdRef.detectChanges();
  }

  dictionaryToggle() {
    this.dictionaryFlag = !this.dictionaryFlag;
  }

  copyFun(index: any) {
    this.lines.push(this.lines[index]);
    this.updateMJ();
  }

  updateMJ() {
    this.cdRef.detectChanges();
    MathJax.typeset([document.getElementById((this.lines.length-1).toString())]);
    MathJax.typeset([document.getElementById("dictionary")]);
    MathJax.typeset([document.getElementById("test")]);
  }




  selection(text: any) {
    if((!this.selectionFlag && !this.clearFlag) || (this.selectionFlag && this.clearFlag)) return;

    if(this.selectionFlag) {
      if(text.srcElement.localName != "mjx-math" && text.srcElement.localName != "div")
        text.srcElement.style.backgroundColor = "#bcf3fa"; 
    }
    else {
      text.srcElement.style.backgroundColor = "";
    }
  }

  clickSelection(text: any) {
    if(text.type == 'mousedown') {
      if(text.which == 1) {
        this.selectionFlag = true;
        if(text.srcElement.localName != "mjx-math" && text.srcElement.localName != "div")
          text.srcElement.style.backgroundColor = "#bcf3fa"; 
      }
      else { // must be which = 3 (rightClick)
        this.clearFlag = true;
        text.srcElement.style.backgroundColor = "";
      }
    }
    else {
      if(text.which == 1)
        this.selectionFlag = false;
      else // must be which = 3 (rightClick)
        this.clearFlag = false;
    }
  }
}