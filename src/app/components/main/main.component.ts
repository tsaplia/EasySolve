import {ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2, ViewChild } from "@angular/core";
import { Formula } from "src/app/modules/math-structures/formula";

declare let MathJax: any;


@Component({
  selector: 'app-main-window',
  templateUrl: 'main.component.html',
  styleUrls: ['main.component.scss']
})
export class MainComponent implements OnInit {
  @ViewChild("render") qqq: ElementRef;

  lines: string[] = [];

  dictionary: boolean = false;
  interaction: boolean = false;
  intFormula: any = null;
  newCanvasFormula: Formula | null = null;

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
  }

  dictionaryToggle(value: any) {
    this.dictionary = value;
  }
  
  interactionEvent(value: any) {
    this.interaction = value;
  }
}