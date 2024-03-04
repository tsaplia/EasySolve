import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { ChangeDetectorRef, Component, EventEmitter, HostListener, Input, OnInit, Output } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ClipboardService } from "ngx-clipboard";
import { AddingModalComponent } from "../adding-modal/adding-modal.component";
import { formulaFromTeX, templateFromTeX } from "src/app/modules/math-actions/from-tex";
import { prepareHTML } from "src/app/modules/math-actions/selection/selection-listeners";
import { CanvasLine } from "src/app/models/canvasLine";
import { ToastrService } from "ngx-toastr";
import { tryTemplete } from "src/app/modules/math-actions/templates/templete-functions";
import * as TemplateData from "src/assets/actions.json"
import { Formula } from "src/app/modules/math-structures/formula";
import { StorageService } from "src/app/services/storage.service";

declare let MathJax: any;

@Component({
  selector: 'app-math-canvas',
  templateUrl: 'canvas.component.html',
  styleUrls: ['canvas.component.scss']
})
export class MathCanvasComponent implements OnInit {
  
  @Output() dictionaryEvent = new EventEmitter<boolean>();
  @Output() interactionEvent = new EventEmitter<boolean>();

  @Input() set newFormula(value: Formula | null) {
    if(!value) return;
    this.addNewLine(`$${value.toTex()}$`, 'formula');
    this.newFormula = null;
  }

  // lines: CanvasLine[] = [];
  title: string = '';
  dictionary: boolean = false;
  interaction: boolean = false;
  selectedLine: number = -1;

  templates = TemplateData;

  get lines() {
    return this.storage.lines;
  }

  constructor(private dialog: MatDialog, 
              private cdRef: ChangeDetectorRef,
              private clipboardService: ClipboardService,
              private toast: ToastrService,
              private storage: StorageService
              ) {}

  ngOnInit() {
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
    this.interaction = !this.interaction;
    this.interactionEvent.emit(this.interaction);
  }

  openAddFunction() {
    var formulaDialog = this.dialog.open(AddingModalComponent, {panelClass: 'full-width-dialog', data: {type: 'formula'}});
    formulaDialog.afterClosed().subscribe(resp => {
      if(!resp || resp.line == '$$') return;
      this.addNewLine(resp.line, "formula");
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
    this.storage.clearLines();
    this.cdRef.detectChanges();
  }

  dictionaryToggle() {
    this.dictionary = !this.dictionary;
    this.dictionaryEvent.emit(this.dictionary);
  }

  linesFromFile(value: any) {
    this.title = value.title;
    this.storage.setLines(value.lines);
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
    this.storage.deleteLine(index);
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
    // if(this.lines[index].type == 'text') return;

    // if(this.lines[index].id == this.selectedLine) this.selectedLine = -1;
    // else this.selectedLine = this.lines[index].id;

    // if(this.selectedLine == -1)
    //   this.storage.selectedLine = null;
    // else 
    //   this.storage.selectedLine = this.lines[index];
  }
//#endregion line's functionality
//#region help functions
  addNewLine(line: string, type: string) {
    let cLine = new CanvasLine({line: line, type: type});
    this.storage.addLine(cLine)
    this.updateMJ();
    if(type == 'formula') {
      let elem = document.querySelector(`#line-${cLine.id}`) as HTMLElement;
      prepareHTML(elem, formulaFromTeX(line.slice(1, -1)));
    }
  }
//#endregion help functions
}