import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { ChangeDetectorRef, Component, EventEmitter, HostListener, Input, OnInit, Output } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ClipboardService } from "ngx-clipboard";
import { formulaFromTeX } from "src/app/modules/math-actions/from-tex";
import { prepareHTML } from "src/app/modules/math-actions/selection/selection-listeners";
import { CanvasLine } from "src/app/models/canvasLine";
import { ToastrService } from "ngx-toastr";
import { Formula } from "src/app/modules/math-structures/formula";
import { StorageService } from "src/app/services/storage.service";
import { AddingModalFormulaComponent } from "../adding-modals/adding-modal-f.component";
import { AddingModalTextComponent } from "../adding-modals/adding-modal-t.component";

declare let MathJax: any;

@Component({
  selector: 'app-math-canvas',
  templateUrl: 'canvas.component.html',
  styleUrls: ['canvas.component.scss']
})
export class MathCanvasComponent implements OnInit {
  
  @Output() dictionaryEvent = new EventEmitter<boolean>();
  @Output() interactionEvent = new EventEmitter<boolean>();

  @Input() set newFormulas(formulas: Formula[] | null) {
    //replace 
    if(!formulas) return;
    formulas.forEach(f => {
      this.addNewLine('formula',`$${f.toTex()}$`);
    });
    this.newFormulas = null;
  }

  title: string = '';
  dictionary: boolean = false;
  interaction: boolean = false;

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

  newLineInput(type: "formula" | "text", line: string = '', index?: number, replace?:boolean) {
    if(type == 'formula') {
      let formulaDialog = this.dialog.open(AddingModalFormulaComponent, {data: {formula: line}});
      formulaDialog.afterClosed().subscribe(resp => {
        if(!resp || resp.line == '$$') return;
        line = resp.line
        this.addNewLine(type, line, index, replace);
      });
    }
    else {
      let formulaDialog = this.dialog.open(AddingModalTextComponent);
      formulaDialog.afterClosed().subscribe(resp => {
        if(!resp || resp.line == '$$') return;
        line = resp.line;
        this.addNewLine(type, line, index, replace);
      });
    }
  }

  clear() {
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
    this.storage.deleteLine(index);
    this.updateMJ();
  }
  
  copyFunction(index: number) {
    if(index < 0 || index >= this.lines.length) return;
    // TODO: fix text copy
    const text = this.lines[index].line;
    this.clipboardService.copy(text);
    
    this.toast.clear();
    this.toast.success("Copy succes"); // can add in 3rd param {positionClass: 'toast-bottom-right'}
  }

  editFunction(index: number) {
    if(index < 0 || index >= this.lines.length) return;
    this.newLineInput(this.lines[index].type, this.lines[index].line, index, true);
  }

//#endregion line's functionality
//#region help functions
  addNewLine(type:"formula" | "text", line: string, index?: number, replace?: boolean) {
    let cLine = new CanvasLine({line: line, type: type});
    this.storage.addLine(cLine, index, replace);
    this.updateMJ();
    if(type == 'formula') {
      let elem = document.querySelector(`#line-${cLine.id}`) as HTMLElement;
      prepareHTML(elem, formulaFromTeX(line.slice(1, -1)));
      console.log(formulaFromTeX(line.slice(1, -1)).toTex());
    }
  }
//#endregion help functions
}