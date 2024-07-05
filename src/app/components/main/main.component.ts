/* eslint-disable angular/timeout-service */
/* eslint-disable angular/document-service */
/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Component, OnInit } from "@angular/core";
import { StatusService } from "src/app/services/status.service";

// declare let MathJax: any;


@Component({
    selector: "app-main-window",
    templateUrl: "main.component.html",
    styleUrls: ["main.component.scss"]
})
export class MainComponent implements OnInit {
    private _dictionary: boolean = false;
    private _interaction: boolean = false;

    constructor(private readonly statusService: StatusService) {}

    ngOnInit(): void {
    }

    get dictionary(): boolean {
        if (this._dictionary != this.statusService.dictionary) {
            this._dictionary = this.statusService.dictionary;
            // next code is for beauty closing and opening
            let int: HTMLElement | null = document.getElementById("dictionary");
            if (int && this._dictionary) {
                int?.setAttribute("style", "overflow: hidden");
                setTimeout(() => {
                    if (this._dictionary) int?.setAttribute("style", "overflow: visible");
                }, 200);
            }
            if (int && !this._dictionary) {
                setTimeout(() => {
                    if (!this._dictionary) int?.setAttribute("style", "overflow: hidden");
                }, 500);
            }
        }
        return this._dictionary;
    }

    get interaction(): boolean {
        if (this._interaction != this.statusService.interaction) {
            this._interaction = this.statusService.interaction;
            // next code is for beauty closing and opening (that fucking line disappered)
            let int: HTMLElement | null = document.getElementById("interaction");
            if (int && this._interaction) {
                int?.setAttribute("style", "overflow: hidden");
                setTimeout(() => {
                    if (this._interaction) int?.setAttribute("style", "overflow: visible");
                }, 200);
            }
            if (int && !this._interaction) {
                setTimeout(() => {
                    if (!this._interaction) int?.setAttribute("style", "overflow: hidden");
                }, 500);
            }
        }
        return this._interaction;
    }
}
