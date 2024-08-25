import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { Definition } from "src/app/models/types";
import { ClipboardService } from "ngx-clipboard";
import { ToastrService } from "ngx-toastr";

import categories from "src/assets/categoriesDictionary.json";
import definitions from "src/assets/definitions.json"

declare let MathJax: any;

@Component({
    selector: "app-list-dictionary",
    templateUrl: "./list-dictionary.component.html",
    styleUrl: "./list-dictionary.component.scss"
})
export class ListDictionaryComponent implements OnInit {
    categories = categories;
    definitions = definitions;

    definitionsByCategory = new Map<number, Definition[]>();
    openCategories = new Map<number, boolean>();

    constructor(private readonly cdRef: ChangeDetectorRef,
                private readonly clipboardService: ClipboardService,
                private readonly toast: ToastrService) {}

    ngOnInit(): void {
        this.categories.forEach((e) => {
            this.definitionsByCategory.set(e.id, this.definitions.filter(d => d.categoryId == e.id) as Definition[]);
            this.openCategories.set(e.id, false);

            console.log(this.definitions)
            console.log(this.definitionsByCategory)
        })
    }

    copyValue(value: string) {
        this.clipboardService.copy(value)

        this.toast.clear();
        this.toast.success("Copy succes")
    }

    openCategory(id: number): void {
        this.openCategories.set(id, !this.openCategories.get(id));
        this.updateMJ();
    }

    updateMJ(): void { // update MathJax
        this.cdRef.detectChanges();
        MathJax.typeset([document.getElementById("list-dictionary")]);
    }
}
