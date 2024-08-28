/* eslint-disable angular/document-service */
/* eslint-disable @typescript-eslint/consistent-type-imports */
import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from "@angular/core";
import type { FormulaActionConfig } from "src/app/models/types";

import { templates as actions } from "src/assets/actionConfigs";
import categories from "src/assets/categories.json";

declare let MathJax: any;

@Component({
    selector: "app-list-interaction",
    templateUrl: "list-interaction.component.html",
    styleUrls: ["list-interaction.component.scss"]
})
export class ListInteractionComponent implements OnInit {
  @Output() ActionSelected = new EventEmitter<string>();

  categories = categories;
  actions = actions;

  actionsByCategory = new Map<number, FormulaActionConfig[]>();
  subActions = new Map<string, FormulaActionConfig[]>();
  openCategories = new Map<number, boolean>();

  constructor(private readonly cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
      this.categories.forEach((e) => {
          this.actionsByCategory.set(e.id, this.actions.filter(a => a.categoryId == e.id));
          this.openCategories.set(e.id, false);
      });
      this.actions.filter(action => action.subactions).forEach((main) => {
        let subs: FormulaActionConfig[] = [];
        main.subactions?.forEach((subId) => {
            let sub = this.actions.find((a) => a.id == subId);
            if(sub) subs.push(sub);
        });
        this.subActions.set(main.id, subs);
    });
  }

  openCategory(id: number): void {
      this.openCategories.set(id, !this.openCategories.get(id));
      this.updateMJ();
  }

  useAction(id: string): void {
      this.ActionSelected.emit(id);
  }

  updateMJ(): void { // update MathJax
      this.cdRef.detectChanges();
      MathJax.typeset([document.getElementById("list-interaction")]);
  }
}
