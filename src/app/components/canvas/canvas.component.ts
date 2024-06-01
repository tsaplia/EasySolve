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
import { StatusService } from "src/app/services/status.service";

@Component({
  selector: 'app-math-canvas',
  templateUrl: 'canvas.component.html',
  styleUrls: ['canvas.component.scss']
})
export class MathCanvasComponent implements OnInit {

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
              private storage: StorageService,
              private statusService: StatusService,
              ) {}

  ngOnInit() {
  }

//#region buttons' functionality
  interactionToggle() {
    this.statusService.toggleInteraction();
  }

  newLineInput(type: "formula" | "text", line: string = '', index?: number, replace?:boolean) {
    if(type == 'formula') {
      let formulaDialog = this.dialog.open(AddingModalFormulaComponent, {data: {formula: line, checkFormula: true}});
      this.statusService.toggleFormulaAdding();
      formulaDialog.afterClosed().subscribe(resp => {
        this.statusService.toggleFormulaAdding();
        if(!resp || resp.line == '$$') return;
        this.storage.addLine(new CanvasLine({line: resp.line, type}), index, replace);
        this.cdRef.detectChanges();
        document.getElementById('line-'+this.lines[this.lines.length-1].id)?.scrollIntoView();
      });
    }
    else {
      let formulaDialog = this.dialog.open(AddingModalTextComponent, {data: {line: line}, height:'300px', width: '800px'});
      this.statusService.toggleTextAdding();
      formulaDialog.afterClosed().subscribe(resp => {
        this.statusService.toggleTextAdding();
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
    this.statusService.toggleDictionary();
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
              this.statusService.formulaAdding ? '' : this.newLineInput('formula');
              break;
            case "add-text":
              this.statusService.textAdding ? '' : this.newLineInput('text');
              break;
          }
      }
    })
  }
}