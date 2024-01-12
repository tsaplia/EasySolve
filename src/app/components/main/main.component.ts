import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { FormulaModalComponent } from "../formula-modal/formula-modal.component";
import { timeInterval } from "rxjs";
import { formulaFromTeX, templateFromTeX } from "src/app/modules/math-actions/from-tex";
import { useTemplate } from "src/app/modules/math-actions/templete-functions";
import { ClipboardService } from "ngx-clipboard";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";

declare let MathJax: any;


@Component({
  selector: 'app-main-window',
  templateUrl: 'main.component.html',
  styleUrls: ['main.component.scss']
})
export class MainComponent implements OnInit, AfterViewInit {
  @ViewChild("render") qqq: ElementRef;
  // tamplate check

  formula: string = '\\sin\\left(2\\pi\\right)';
  template: string = '\\sin\\left(2[x]\\right)=>\\sin\\left([x]\\right)\\cos\\left([x]\\right)';
  result: string = '';

  lines: string[] = [];

  dictionary: boolean = false;
  selectionFlag: boolean = false;
  clearFlag: boolean = false;
  
  constructor(private dialog: MatDialog, 
              private cdRef: ChangeDetectorRef,
              private clipboardService: ClipboardService) {}

  ngOnInit() {
  }

  ngAfterViewInit() {
    // this.updateMJ();
  }

  // updateMJ() { // update MathJax
  //   this.cdRef.detectChanges();
  //   MathJax.typeset([document.getElementById("body")]);
  //   MathJax.typeset([document.getElementById("dictionary")]);
  //   MathJax.typeset([document.getElementById("test")]);
  // }

  dictionaryToggle(value: any) {
    this.dictionary = value;
  }
  

  
}