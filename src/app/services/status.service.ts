import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  interaction: boolean = false;
  dictionary: boolean = false;
  formulaAdding: boolean = false;
  textAdding: boolean = false;

  constructor() { }

  toggleInteraction() {
    this.interaction = !this.interaction;
  }
  toggleDictionary() {
    this.dictionary = !this.dictionary;
  }
  toggleFormulaAdding() {
    this.formulaAdding = !this.formulaAdding;
  }
  toggleTextAdding() {
    this.textAdding = !this.textAdding;
  }

}