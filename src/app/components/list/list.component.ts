import { ChangeDetectorRef, Component, Input, OnInit } from "@angular/core";
import type { FormulaAction } from "src/app/models/types";

import actions from "src/assets/actions.json"
import categories from "src/assets/categories.json"
import definitions from "src/assets/definitions.json"

declare let MathJax: any;

@Component({
  selector: "app-list",
  templateUrl: "list.component.html",
  styleUrls: ["list.component.scss"]
})
export class ListComponent implements OnInit {
  @Input() mode: "interaction" | "dictionary" | null = null;

  categories = categories;
  actions: FormulaAction[] = actions as FormulaAction[];

  actionsByCategory = new Map<number, FormulaAction[]>;
  openCategories = new Map<number, boolean>;

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.categories.forEach(e => {
      this.actionsByCategory.set(e.id, this.actions.filter(a => a.categoryId == e.id));
      this.openCategories.set(e.id, false);
    });
  }

  openCategory(id: number) {
    this.openCategories.set(id, !this.openCategories.get(id));
    this.updateMJ();
  }

  useAction(id: string) {
    // for una
  }

  updateMJ() { // update MathJax  
    this.cdRef.detectChanges();
    MathJax.typeset([document.getElementById("interaction")]);
  }
}