import {ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2, ViewChild } from "@angular/core";
import { Formula } from "src/app/modules/math-structures/formula";
import { StatusService } from "src/app/services/status.service";

declare let MathJax: any;


@Component({
  selector: 'app-main-window',
  templateUrl: 'main.component.html',
  styleUrls: ['main.component.scss']
})
export class MainComponent implements OnInit {
  private _dictionary: boolean = false;
  private _interaction: boolean = false;

  constructor(private statusService: StatusService) {}

  ngOnInit() {
  }

  get dictionary() {
    if(this._dictionary != this.statusService.dictionary) 
      {
      this._dictionary = this.statusService.dictionary;
      // next code is for beauty closing and opening
      let int: HTMLElement | null = document.getElementById('dictionary');
      if(int && this._dictionary) {
        int?.setAttribute("style", "overflow: hidden")
        setTimeout(() => {
          if(this._dictionary) int?.setAttribute("style", "overflow: visible")
        }, 200);
      }
      if(int && !this._dictionary) {
        setTimeout(() => {
          if(!this._dictionary) int?.setAttribute("style", "overflow: hidden")
        }, 500);
      }
    }
    return this._dictionary;
  }

  get interaction() {
    if(this._interaction != this.statusService.interaction) 
      {
        this._interaction = this.statusService.interaction;
        // next code is for beauty closing and opening (that fucking line disappered)
        let int: HTMLElement | null = document.getElementById('interaction');
        if(int && this._interaction) {
          int?.setAttribute("style", "overflow: hidden")
          setTimeout(() => {
            if(this._interaction) int?.setAttribute("style", "overflow: visible")
          }, 200);
        }
        if(int && !this._interaction) {
          setTimeout(() => {
            if(!this._interaction) int?.setAttribute("style", "overflow: hidden")
          }, 500);
        }
    }
    return this._interaction;
  }
}