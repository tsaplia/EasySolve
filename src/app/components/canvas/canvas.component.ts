import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { ChangeDetectorRef, Component, EventEmitter, HostListener, OnInit, Output } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ClipboardService } from "ngx-clipboard";
import { AddingModalComponent } from "../adding-modal/adding-modal.component";
import { formulaFromTeX, templateFromTeX } from "src/app/modules/math-actions/from-tex";
import { prepareHTML } from "src/app/modules/math-actions/selection/selection-listeners";
import { CanvasLine } from "src/app/modules/canvasLine";
import { ToastrService } from "ngx-toastr";
import { tryTemplete } from "src/app/modules/math-actions/templates/templete-functions";

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
  dictionary: boolean = false;
  interaction: boolean = false;
  selectedLine: number = -1;

  constructor(private dialog: MatDialog, 
              private cdRef: ChangeDetectorRef,
              private clipboardService: ClipboardService,
              private toast: ToastrService,
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

  // buttons' functionality
  interactionToggle() {
    if(!this.interaction) {
      this.interaction = true;
      this.interactionEvent.emit({line: this.lines[this.lines.findIndex(el => el.id === this.selectedLine)], selected: this.selectedLine});
    }
    else {
      this.interaction = false;
      this.interactionEvent.emit({line: this.lines[this.lines.findIndex(el => el.id === this.selectedLine)], selected: -1});
    }
  }

  openAddFunction() {
    var formulaDialog = this.dialog.open(AddingModalComponent, {panelClass: 'full-width-dialog', data: {type: 'formula'}});
    formulaDialog.afterClosed().subscribe(resp => {
      if(!resp || resp.line == '$$') return;
      let line = new CanvasLine({line: resp.line, type: 'formula'});
      this.lines.push(line);
      this.updateMJ();
      
      let formula = formulaFromTeX(resp.line.slice(1, -1));
      let elem = document.querySelector(`#line-${line.id}`) as HTMLElement;
      prepareHTML(elem, formula);
    });
  }

  openAddText() {
    var textDialog = this.dialog.open(AddingModalComponent, {data: {type: 'text'}});
    textDialog.afterClosed().subscribe(resp => {
      if(!resp || resp.line == '$$') return;
      
      this.lines.push(new CanvasLine({line: resp.line, type: 'text'}));
      this.updateMJ();
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

  // line's functionality
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
      this.interactionEvent.emit({line: this.lines[index], selected: this.selectedLine});
    if(this.selectedLine == -1 && this.interaction) {
      this.interaction = false;
      this.interactionEvent.emit({line: this.lines[index], selected: this.selectedLine});
    }
  }

  // selection functionality
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

  // test
  @HostListener('window:keyup', ['$event'])
  keyPress(event: KeyboardEvent) {

    if(event.altKey && event.key  == "u") this.testTemplateUse();
  }

  testTemplateUse() {
    console.log("test");
    let tString: string = '\\sin\\left(2[x]\\right)=>2\\sin\\left([x]\\right)\\cos\\left([x]\\right)';
    let template = templateFromTeX(tString);
    let result = tryTemplete(template);
    if(!result) return;
    let line = new CanvasLine({line: `$${result.toTex()}$`, type: 'formula'});
    this.lines.push(line);
    this.updateMJ();
    let elem = document.querySelector(`#line-${line.id}`) as HTMLElement;
    prepareHTML(elem, result);
  }

}