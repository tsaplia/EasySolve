import {ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2, ViewChild } from "@angular/core";
import { Formula } from "src/app/modules/math-structures/formula";

declare let MathJax: any;


@Component({
  selector: 'app-main-window',
  templateUrl: 'main.component.html',
  styleUrls: ['main.component.scss']
})
export class MainComponent implements OnInit {

  lines: string[] = [];

  dictionary: boolean = false;
  interaction: boolean = false;
  newCanvasFormula: Formula | null = null;

  constructor() {}

  ngOnInit() {
  }

  dictionaryToggle(value: boolean) {
    this.dictionary = value;
  }
  
  interactionToggle(value: boolean) {
    this.interaction = value;
  }
}