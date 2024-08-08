/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Key } from "src/app/models/keyboardLayout";

@Component({
    selector: "app-keyboard-layout",
    templateUrl: "./keyboard-layout.component.html",
    styleUrl: "./keyboard-layout.component.scss"
})
export class KeyboardLayoutComponent {
    @Input() keys: Key[] = [];
    @Input() shift: number = 0;
    @Output() onClick = new EventEmitter<string>();

    addElement(element: string) {
        this.onClick.emit(element);
    }
}
