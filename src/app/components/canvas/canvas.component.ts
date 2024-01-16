import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ClipboardService } from "ngx-clipboard";
import { FormulaModalComponent } from "../formula-modal/formula-modal.component";
import { formulaFromTeX, templateFromTeX } from "src/app/modules/math-actions/from-tex";
import { prepareHTML } from "src/app/modules/math-actions/selection/selection-listeners";
import { useTemplate } from "src/app/modules/math-actions/templates/templete-functions";

declare let MathJax: any;

@Component({
  selector: 'app-math-canvas',
  templateUrl: 'canvas.component.html',
  styleUrls: ['canvas.component.scss']
})
export class MathCanvasComponent implements OnInit {
  
  @Output() dictionaryEvent = new EventEmitter<boolean>();
  @Output() interactionEvent = new EventEmitter<any>();

  lines: any[] = [];
  dictionary: boolean = false;
  selectedLine: number = -1;
  formula: string = '\\sin\\left(2\\sqrt{x}\\right)';
  template: string = '\\sin\\left(2[x]\\right)=>2\\sin\\left([x]\\right)\\cos\\left([x]\\right)';
  result: string = '';

  constructor(private dialog: MatDialog, 
              private cdRef: ChangeDetectorRef,
              private clipboardService: ClipboardService,
              ) {}

  ngOnInit() {
    let f = formulaFromTeX(this.formula);
    let t = templateFromTeX(this.template);
    let r = useTemplate(t,f);
    this.result = `$${this.formula} => ${r?.toTex() || ''}$`;
  }

  ngAfterViewInit(): void {
    this.updateMJ();
  }

  updateMJ() { // update MathJax
    this.cdRef.detectChanges();
    MathJax.typeset([document.getElementById("body")]);
  }

  openAddFunction() {
    var formulaDialog = this.dialog.open(FormulaModalComponent);
    formulaDialog.afterClosed().subscribe(resp => {
      if(!resp || resp.formula == '$$') return;
      this.lines.push(resp.formula);
      this.updateMJ();

      let formula = formulaFromTeX(resp.formula.slice(1, -1));
      let elem = document.querySelector('.mjwrap') as HTMLElement;
      prepareHTML(elem, formula);
    });
  }

  clear() {
    this.lines = [];
    this.cdRef.detectChanges();
  }

  dictionaryToggle() {
    this.dictionary = !this.dictionary;
    this.dictionaryEvent.emit(this.dictionary);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.lines, event.previousIndex, event.currentIndex);
  }
  
  deleteFunction(index: number) {
    if(index < 0) return;
    this.lines.splice(index, 1);
  }
  
  copyFunction(index: number) {
    if(index < 0) return;
    const text = this.lines[index].slice(1, this.lines[index].length-1);
    this.clipboardService.copy(text);
  }

  lineSelect(index: number) {
    if(index == this.selectedLine) this.selectedLine = -1;
    else this.selectedLine = index;
    this.interactionEvent.emit({line: this.lines[this.selectedLine] ? this.lines[this.selectedLine] : '', index: this.selectedLine});
  }

  selection(text: any) {
    if(text.which == 0) return;
    if(text.which == 1) {
      if(text.srcElement.localName != "mjx-math" && text.srcElement.localName != "div")
        text.srcElement.style.backgroundColor = "#bcf3fa"; 
    }
    else {
      text.srcElement.style.backgroundColor = "";
    }
  }

  clickSelection(text: any) {
    if(text.which == 1) {
      if(text.srcElement.localName != "mjx-math" && text.srcElement.localName != "div")
          text.srcElement.style.backgroundColor = "#bcf3fa";
    }
    else {
      text.srcElement.style.backgroundColor = "";
    }
  }

}