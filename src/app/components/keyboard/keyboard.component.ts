import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    selector: "app-keyboard",
    templateUrl: "./keyboard.component.html",
    styleUrl: "./keyboard.component.scss"
})
export class KeyboardComponent {
    @Output() elementAdded = new EventEmitter<string>();

    addElement(element: string) {
        this.elementAdded.emit(element);
    }
}
