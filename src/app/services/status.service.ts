import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class StatusService {
    interaction: boolean = false;
    dictionary: boolean = false;
    formulaAdding: boolean = false;
    textAdding: boolean = false;

    toggleInteraction(): void {
        this.interaction = !this.interaction;
    }

    toggleDictionary(): void {
        this.dictionary = !this.dictionary;
    }

    toggleFormulaAdding(): void {
        this.formulaAdding = !this.formulaAdding;
    }

    toggleTextAdding(): void {
        this.textAdding = !this.textAdding;
    }
}
