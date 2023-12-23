import { ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { FormulaModelComponent } from "../formula-model/formula-model.component";
import { timeInterval } from "rxjs";

declare let MathJax: any;


@Component({
  selector: 'main-component',
  templateUrl: 'main.component.html',
  styleUrls: ['main.component.scss']
})
export class MainComponent implements OnInit {
  @ViewChild("render") qqq: ElementRef;
  
  text: string = "";
  lines: string[] = [];
  
  constructor(private dialog: MatDialog, private renderer: Renderer2, private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    //MathJax.typeset([document.getElementById("render")]);
  }
  
  openAddFunction() {
    var formulaDialog = this.dialog.open(FormulaModelComponent);
    formulaDialog.afterClosed().subscribe(resp => {
      if(!resp) return;
      this.lines.push(resp.formula);
      this.cdRef.detectChanges();
      MathJax.typeset([document.getElementById((this.lines.length-1).toString())]);
    });
  }

  clear() {
    this.lines = [];
    this.cdRef.detectChanges();
  }
}