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

@Component({
  selector: 'app-math-canvas',
  templateUrl: 'canvas.component.html',
  styleUrls: ['canvas.component.scss']
})
export class MathCanvasComponent implements OnInit {
  
  @Output() dictionaryEvent = new EventEmitter<boolean>();
  @Output() interactionEvent = new EventEmitter<boolean>();

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

//#region buttons' functionality
  interactionToggle() {
    this.interaction = !this.interaction;
    this.interactionEvent.emit(this.interaction);
  }

  newLineInput(type: "formula" | "text", line: string = '', index?: number, replace?:boolean) {
    if(type == 'formula') {
      let formulaDialog = this.dialog.open(AddingModalFormulaComponent, {data: {formula: line, checkFormula: true}});
      formulaDialog.afterClosed().subscribe(resp => {
        if(!resp || resp.line == '$$') return;
        this.storage.addLine(new CanvasLine({line: resp.line, type}), index, replace);
      });
    }
    else {
      let formulaDialog = this.dialog.open(AddingModalTextComponent, {data: {line: line}, height:'300px', width: '800px'});
      formulaDialog.afterClosed().subscribe(resp => {
        if(!resp) return;
        this.storage.addLine(new CanvasLine({line: resp.line, type}), index, replace);
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
  }
//#endregion buttons' functionality
//#region line's functionality 
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.lines, event.previousIndex, event.currentIndex);
  }
  
  deleteFunction(index: number) {
    this.storage.deleteLine(index);
  }
  
  copyFunction(index: number) {
    if(index < 0 || index >= this.lines.length) return;
    // TODO: fix text copy P: what's a problem with clipboard?
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
}