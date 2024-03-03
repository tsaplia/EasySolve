import { ChangeDetectorRef, Component, Input, OnInit } from "@angular/core";

import actions from "src/assets/actions.json"
import categories from "src/assets/categories.json"

declare let MathJax: any;

@Component({
  selector: "app-list",
  templateUrl: "list.component.html",
  styleUrls: ["list.component.scss"]
})
export class ListComponent implements OnInit {
  categories = categories;
  actions = actions;

  actionsByCategory = new Map<number, any[]>;
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

  useAction(id: number) {
    // for una
  }

  // actionsByCategory(id: number) {
  //   return this.actions.filter(e => e.categoryId == id);
  // }


  updateMJ() { // update MathJax  
    this.cdRef.detectChanges();
    MathJax.typeset([document.getElementById("interaction")]);
  }
}