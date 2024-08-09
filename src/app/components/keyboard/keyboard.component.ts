/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Component, EventEmitter, Output } from "@angular/core";
import { KeyboardLayout } from "src/app/models/keyboardLayout";
import _keyboardLayouts from "src/assets/keyboardLayouts.json";

@Component({
    selector: "app-keyboard",
    templateUrl: "./keyboard.component.html",
    styleUrl: "./keyboard.component.scss"
})
export class KeyboardComponent {
    @Output() elementAdded = new EventEmitter<string>();
    @Output() clearCmd = new EventEmitter<string>();

    keyboardLayouts: KeyboardLayout[] = [];
    shift: number = 0;
    shiftHold: boolean = false;
    constantlyShift: boolean = false;
    keyboardIndex: number = 0;

    constructor() {
        this.keyboardLayouts = _keyboardLayouts.keyboardLayouts;
    }

    addElement(element: string) {
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
