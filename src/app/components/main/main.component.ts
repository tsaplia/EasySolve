import { ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { FormulaModelComponent } from "../formula-model/formula-model.component";
import { timeInterval } from "rxjs";
import { MathQuillService } from "src/app/services/mathquill.service";

declare let MathJax: any;


@Component({
  selector: 'main-component',
  templateUrl: 'main.component.html',
  styleUrls: ['main.component.scss']
})
export class MainComponent implements OnInit {
  @ViewChild("render") qqq: ElementRef;
  //@ViewChild("math-field") mathFieldSpan: ElementRef;
  
  text: string = "$$ px^2 + qx + r = 0 $$";
  lines: string[] = [];
  mathField: any;

  selectionFlag: boolean = false;
  
  constructor(private dialog: MatDialog, private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
  }
  
  openAddFunction() {
    var formulaDialog = this.dialog.open(FormulaModelComponent);
    formulaDialog.afterClosed().subscribe(resp => {
      if(!resp || resp.formula == '$$') return;
      this.lines.push(resp.formula);
      this.cdRef.detectChanges();
      MathJax.typeset([document.getElementById((this.lines.length-1).toString())]);
      MathJax.typeset([document.getElementById("test")]);
    });
  }

  clear() {
    this.lines = [];
    this.cdRef.detectChanges();
  }

  log(text: any) {
    if(!this.selectionFlag) return;
    else {
    //  console.log(text);
     if(text.srcElement.localName != "mjx-math")
      text.srcElement.style.backgroundColor = "#bcf3fa" 
    }
     // if(text.type == 'mouseover')
    //   text.srcElement.style.backgroundColor = "#bcf3fa"
    // else
    //   text.srcElement.style.backgroundColor = ""
    
    
    
      this.cdRef.detectChanges


    // console.log(text.srcElement.style.backgroundColor);
  }

  click(text: any) {
    if(text == 'mousedown') {
      this.selectionFlag = true;
    }
    else this.selectionFlag = false;
    console.log(text)
  }
}