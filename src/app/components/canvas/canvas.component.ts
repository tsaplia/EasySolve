import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { ChangeDetectorRef, Component, EventEmitter, HostListener, Input, OnInit, Output } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ClipboardService } from "ngx-clipboard";
import { AddingModalComponent } from "../adding-modal/adding-modal.component";
import { formulaFromTeX } from "src/app/modules/math-actions/from-tex";
import { prepareHTML } from "src/app/modules/math-actions/selection/selection-listeners";
import { CanvasLine } from "src/app/models/canvasLine";
import { ToastrService } from "ngx-toastr";
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

  openAddModal(type: "formula" | "text", line: string = '') {
    let checkLine = (line: string) => {
      try{
        formulaFromTeX(line.slice(1, -1));
      }catch(e) {
        return false;
      }
      return true;
    }

    let formulaDialog = this.dialog.open(AddingModalComponent, {data: {type: type, line: line}});
    formulaDialog.afterClosed().subscribe(resp => {
      if(!resp || resp.line == '$$') return;
      line = resp.line
      if(checkLine(line))
        this.addNewLine(line, type);
      else {
        this.toast.clear();
        this.toast.error("","Uncorrect formula");
        this.openAddModal(type, line);
        // I would change this
      }
    });
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
    if(index < 0) return;
    const text = this.lines[index].line.slice(1, this.lines[index].line.length-1);
    this.clipboardService.copy(text);
    
    this.toast.clear();
    this.toast.success("Copy succes"); // can add in 3rd param {positionClass: 'toast-bottom-right'}
  }
//#endregion line's functionality
//#region help functions
  addNewLine(line: string, type:"formula" | "text") {
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