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
    // next code is for beauty closing and opening
    let int: HTMLElement | null = document.getElementById('dictionary');
    if(int && value) {
      setTimeout(() => {
        int?.setAttribute("style", "overflow: visible")
      }, 100);
    }
    if(int && !value) {
      setTimeout(() => {
        int?.setAttribute("style", "overflow: hidden")
      }, 500);
    }
  }
  
  interactionToggle(value: boolean) {
    this.interaction = value;
    // next code is for beauty closing and opening (that fucking line disappered)
    let int: HTMLElement | null = document.getElementById('interaction');
    if(int && value) {
      setTimeout(() => {
        int?.setAttribute("style", "overflow: visible")
      }, 100);
    }
    if(int && !value) {
      setTimeout(() => {
        int?.setAttribute("style", "overflow: hidden")
      }, 500);
    }
  }
}