import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { ChangeDetectorRef, Component, EventEmitter, HostListener, OnInit, Output } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ClipboardService } from "ngx-clipboard";
import { checkFormula } from "src/app/modules/math-actions/from-tex";
import { CanvasLine } from "src/app/models/canvasLine";
import { ToastrService } from "ngx-toastr";
import { StorageService } from "src/app/services/storage.service";
import { AddingModalFormulaComponent } from "../adding-modals/adding-modal-f.component";
import { AddingModalTextComponent } from "../adding-modals/adding-modal-t.component";
import { formulaTemplate } from "src/app/configs/config";
import hotkeys from "src/assets/hotkeys.json"

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

  hotkeys: any = hotkeys.canvas;

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
        this.cdRef.detectChanges();
        document.getElementById('line-'+this.lines[this.lines.length-1].id)?.scrollIntoView();
      });
    }
    else {
      let formulaDialog = this.dialog.open(AddingModalTextComponent, {data: {line: line}, height:'300px', width: '800px'});
      formulaDialog.afterClosed().subscribe(resp => {
        if(!resp) return;
        this.storage.addLine(new CanvasLine({line: resp.line, type}), index, replace);
        this.cdRef.detectChanges();
        document.getElementById('line-'+this.lines[this.lines.length-1].id)?.scrollIntoView();
      });
    }
  }

  clear() {
    this.storage.clearLines();
    this.cdRef.detectChanges();
  }

  async paste(event: ClipboardEvent) {
    const text = await navigator.clipboard.readText();
    let type: 'text'|'formula' = text.match(formulaTemplate) && checkFormula(text.slice(1, -1)) ? 'formula' : 'text';
    this.storage.addLine(new CanvasLine({line: text, type}));
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

  @HostListener('window:keydown', ['$event'])
  activeHotkeys(event: KeyboardEvent) {
    // event.preventDefault(); TODO: maybe it works only with presetted hotkeys, not just window:keydown
    this.hotkeys.forEach((e: any) => {
      if(e.key == event.key && e.ctrl == event.ctrlKey) {
          switch (e.id) {
            case "add-formula":
              this.newLineInput('formula');
              break;
            case "add-text":
              this.newLineInput('text');
              break;
          }
      }
    })
  }
}