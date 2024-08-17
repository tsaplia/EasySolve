/* eslint-disable @typescript-eslint/consistent-type-imports */
import { AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild } from "@angular/core";
import { KeyConfig, KeyboardLayout } from "src/app/models/keyboardLayout";
import {keyboardLayouts} from "src/assets/keyboardLayouts";

declare let MathJax: any;

@Component({
    selector: "app-keyboard",
    templateUrl: "./keyboard.component.html",
    styleUrl: "./keyboard.component.scss"
})
export class KeyboardComponent implements AfterViewInit {
    @Output() elementAdded = new EventEmitter<KeyConfig>();
    @Output() clearCmd = new EventEmitter<string>();

    keyboardLayouts: KeyboardLayout[] = [];
    shift: number = 0;
    shiftHold: boolean = false;
    constantlyShift: boolean = false;
    keyboardIndex: number = 0;

    constructor() {
        this.keyboardLayouts = keyboardLayouts;
    }

    ngAfterViewInit(): void {
        MathJax.typeset([document.querySelector(".overflow")]);
    }

    addElement(element: KeyConfig) {
        if (!this.shiftHold) this.shift = 0;
        this.elementAdded.emit(element);
    }

    shiftToggle() {
        if (this.shift == 0) this.shift = 1;
        else {
            this.shift = 0; this.shiftHold = false;
        }
    }

    shiftHoldToggle() {
        if (this.shiftHold) {
            this.shiftHold = false; this.shift = 0;
        } else {
            this.shiftHold = true; this.shift = 1;
        }
    }

    clear() {
        this.clearCmd.emit("clear");
    }
}