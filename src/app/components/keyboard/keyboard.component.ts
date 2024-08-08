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
    constantlyShift: boolean = false;

    constructor() {
        this.keyboardLayouts = _keyboardLayouts.keyboardLayouts;
    }

    addElement(element: string) {
        this.elementAdded.emit(element);
    }

    shiftToggle() {
        this.shift = (this.shift + 1) % 2;
    }

    clear() {
        this.clearCmd.emit("clear");
    }
}
