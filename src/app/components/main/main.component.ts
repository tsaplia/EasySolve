import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { FormulaModelComponent } from "../formula-model/formula-model.component";
import { timeInterval } from "rxjs";
import { formulaFromTeX, templateFromTeX } from "src/app/modules/math-actions/from-tex";
import { useTemplate } from "src/app/modules/math-actions/templete-functions";
import { ClipboardService } from "ngx-clipboard";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";

declare let MathJax: any;


@Component({
  selector: 'main-component',
  templateUrl: 'main.component.html',
  styleUrls: ['main.component.scss']
})
export class MainComponent implements OnInit, AfterViewInit {
  @ViewChild("render") qqq: ElementRef;
  // tamplate check

  formula: string = '\\sin\\left(2\\pi\\right)';
  template: string = '\\sin\\left(2[x]\\right)=>\\sin\\left([x]\\right)\\cos\\left([x]\\right)';
  result: string = '';

  text: string = "$$ px^2 + qx + r = 0 $$";
  lines: string[] = [];
  mathField: any;

  selectionFlag: boolean = false;
  clearFlag: boolean = false;
  dictionaryFlag: boolean = false;
  
  constructor(private dialog: MatDialog, 
              private cdRef: ChangeDetectorRef,
              private clipboardService: ClipboardService) {}

  ngOnInit(): void {
    let t = templateFromTeX(this.template);
    let f = formulaFromTeX(this.formula);
    this.result = useTemplate(t, f)?.toTex() || 'null';
  }

  ngAfterViewInit(): void {
    this.updateMJ();
  }

  updateMJ() { // update MathJax
    this.cdRef.detectChanges();
    MathJax.typeset([document.getElementById("render")]);
    MathJax.typeset([document.getElementById("dictionary")]);
    MathJax.typeset([document.getElementById("test")]);
  }
  

  // buttons' functions
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
    if(this.dictionaryFlag)
      this.updateMJ();
  }

  // formula's actions
  deleteFunction(index: number) {
    if(index < 0) return;
    this.lines.splice(index, 1);
    this.updateMJ();
  }
  
  copyFunction(index: number) {
    if(index < 0) return;
    const text = this.lines[index].slice(1, this.lines[index].length-1);
    this.clipboardService.copy(text);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.lines, event.previousIndex, event.currentIndex);
  }

  

  // formula's selection (click can be outside container, so it doesn't detect it)
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
    console.log(text)
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