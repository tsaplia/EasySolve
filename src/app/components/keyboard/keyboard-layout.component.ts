/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/consistent-type-imports */
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnChanges, Output, ViewChild } from "@angular/core";
import { Key, KeyConfig } from "src/app/models/keyboardLayout";

declare let MathJax: any;

@Component({
    selector: "app-keyboard-layout",
    templateUrl: "./keyboard-layout.component.html",
    styleUrl: "./keyboard-layout.component.scss"
})
export class KeyboardLayoutComponent implements OnChanges {
    @Input() keys: Key[] = [];
    @Input() shift: number = 0;
    @Output() onClick = new EventEmitter<KeyConfig>();

    @ViewChild('kbLayout') layoutEl: ElementRef<HTMLInputElement>;

    constructor(private readonly cdRef: ChangeDetectorRef) {}

    addElement(element: KeyConfig) {
        this.onClick.emit(element);
    }

    ngOnChanges(): void {
        if (this.layoutEl) {
            let keys = this.layoutEl.nativeElement.querySelectorAll(".kb-key");
            keys.forEach((e: any) => e.firstElementChild?.remove());
        }
        this.cdRef.detectChanges();
        MathJax.typeset([this.layoutEl.nativeElement]);
    }
}
