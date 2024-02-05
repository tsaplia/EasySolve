import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { ChangeDetectorRef, Component, EventEmitter, HostListener, OnInit, Output } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ClipboardService } from "ngx-clipboard";
import { AddingModalComponent } from "../adding-modal/adding-modal.component";
import { formulaFromTeX, templateFromTeX } from "src/app/modules/math-actions/from-tex";
import { prepareHTML } from "src/app/modules/math-actions/selection/selection-listeners";
import { CanvasLine } from "src/app/models/canvasLine";
import { ToastrService } from "ngx-toastr";
import { tryTemplete } from "src/app/modules/math-actions/templates/templete-functions";
import * as TemplateData from "src/assets/templates.json"

declare let MathJax: any;

@Component({
  selector: 'app-math-canvas',
  templateUrl: 'canvas.component.html',
  styleUrls: ['canvas.component.scss']
})
export class MathCanvasComponent implements OnInit {
  
  @Output() dictionaryEvent = new EventEmitter<boolean>();
  @Output() interactionEvent = new EventEmitter<any>();

  lines: CanvasLine[] = [];
  title: string = '';
  dictionary: boolean = false;
  interaction: boolean = false;
  selectedLine: number = -1;

  templates: any = TemplateData;

  constructor(private dialog: MatDialog, 
              private cdRef: ChangeDetectorRef,
              private clipboardService: ClipboardService,
              private toast: ToastrService,
              ) {}

  ngOnInit() {
    console.log(this.templates);
  }

  ngAfterViewInit(): void {
    this.updateMJ();
  }
  // update MathJax
  updateMJ() { 
    this.cdRef.detectChanges();
    MathJax.typeset([document.getElementById("body")]);
  }

//#region buttons' functionality
  interactionToggle() {
    if(!this.interaction) {
      this.interaction = true;
      this.interactionEmit(0);
    }
    else {
      this.interaction = false;
      this.interactionEmit(-1);
    }
  }

  openAddFunction() {
    var formulaDialog = this.dialog.open(AddingModalComponent, {panelClass: 'full-width-dialog', data: {type: 'formula'}});
    formulaDialog.afterClosed().subscribe(resp => {
      if(!resp || resp.line == '$$') return;
      this.addNewLine(resp.line, "formula");
      let line = new CanvasLine({line: resp.line, type: 'formula'});
    });
  }

  openAddText() {
    var textDialog = this.dialog.open(AddingModalComponent, {data: {type: 'text'}});
    textDialog.afterClosed().subscribe(resp => {
      if(!resp || resp.line == '$$') return;
      this.addNewLine(resp.line, "text");
    })
  }

  clear() {
    if(this.selectedLine != -1)
      this.lineSelect(this.lines.findIndex(el => el.id === this.selectedLine));
    this.lines = [];
    this.cdRef.detectChanges();
  }

  dictionaryToggle() {
    this.dictionary = !this.dictionary;
    this.dictionaryEvent.emit(this.dictionary);
  }

  linesFromFile(value: any) {
    this.title = value.title;
    this.lines = value.lines;
    this.updateMJ();
  }
//#endregion buttons' functionality
//#region line's functionality 
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.lines, event.previousIndex, event.currentIndex);
  }
  
  deleteFunction(index: number) {
    if(index < 0) return;
    if(this.selectedLine == this.lines[index].id) this.lineSelect(index);
    this.lines.splice(index, 1);
    this.updateMJ();
  }
  
  copyFunction(index: number) {
    if(index < 0) return;
    const text = this.lines[index].line.slice(1, this.lines[index].line.length-1);
    this.clipboardService.copy(text);
    
    this.toast.clear();
    this.toast.success("Copy succes"); // can add in 3rd param {positionClass: 'toast-bottom-right'}
  }

  lineSelect(index: number) {
    if(this.lines[index].type == 'text') return;

    if(this.lines[index].id == this.selectedLine) this.selectedLine = -1;
    else this.selectedLine = this.lines[index].id;

    if(this.interaction)
      this.interactionEmit(0);
  }
//#endregion line's functionality
//#region help functions
  interactionEmit(selected: number) {
    if(this.selectedLine == -1) {
      let line: CanvasLine = new CanvasLine();
      line.type = "formula"; line.line = "";
      this.interactionEvent.emit({line: line, selected: selected});
    }  else
    this.interactionEvent.emit({line: this.lines[this.lines.findIndex(el => el.id === this.selectedLine)], selected: selected});
  }

  addNewLine(line: string, type: string) {
    let cLine = new CanvasLine({line: line, type: type});
    this.lines.push(cLine);
    this.updateMJ();
    if(type == 'formula') {
      let elem = document.querySelector(`#line-${cLine.id}`) as HTMLElement;
      prepareHTML(elem, formulaFromTeX(line.slice(1, -1)));
    }
  }
//#endregion help functions
  // test
  @HostListener('window:keyup', ['$event'])
  keyPress(event: KeyboardEvent) {

    if(event.altKey && event.key  == "u") this.testTemplateUse();
  }

  testTemplateUse() {
    let tString: string = '\\sin\\left(2[x]\\right)=>2\\sin\\left([x]\\right)\\cos\\left([x]\\right)';
    let template = templateFromTeX(tString);
    let result = tryTemplete(template);
    if(!result) return;
    this.addNewLine(`$${result.toTex()}$`, 'formula');
  }

}