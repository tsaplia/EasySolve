import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, HostListener, Input, OnInit, Output } from "@angular/core";
import { CanvasLine } from "src/app/models/canvasLine";
import { actionConfigs, availibleActions } from "src/app/modules/math-actions/actions";
import { clearSelected } from "src/app/modules/math-actions/selection/selected";
import { SubPartModes, availableModes, useMode,  } from "src/app/modules/math-actions/templates/part-substitution";
import { Formula } from "src/app/modules/math-structures/formula";
import { StorageService } from "src/app/services/storage.service";
import {templates} from "src/assets/actionConfigs";
import { AddingModalFormulaComponent } from "../adding-modals/adding-modal-f.component";
import { MatDialog } from "@angular/material/dialog";
import { formulaFromTeX } from "src/app/modules/math-actions/from-tex";
import { Expression } from "src/app/modules/math-structures/expression";
import { StatusService } from "src/app/services/status.service";
import { ToastrService } from "ngx-toastr";
import hotkeys from "src/assets/hotkeys.json"
import { ActionHotkeyConfig } from "src/app/models/types";

declare let MathJax: any;

@Component({
  selector: 'app-interaction',
  templateUrl: 'interaction.component.html',
  styleUrls: ['interaction.component.scss']
})

export class InteractionComponent implements AfterViewInit {
  templates = templates;
  hotkeys: ActionHotkeyConfig[] = hotkeys.interaction as ActionHotkeyConfig[];
  private _preview: Formula[] = [];
  public selLines: string[] = [];
  public availibleModes = availableModes();

  set preview(formulas: Formula[]) {
    this._preview = [...formulas];
    let type: "formula" | "structure" = formulas.at(0)?.equalityParts?.length == 1 ? "structure" : "formula";
    this.availibleModes = this._preview.length > 0 ? availableModes(type) : {newLine: false, replace: false, addToEnd: false};
    this.updateMJ();
  }
  get preview(): Formula[] { return this._preview; }

  constructor(private cdRef: ChangeDetectorRef,
              private storage: StorageService,
              private statusService: StatusService,
              private toast: ToastrService,
              private dialog: MatDialog) { }

  ngDoCheck(){
    let newLines = this.storage.selectedLines;
    if(newLines.length != this.selLines.length || newLines.some((newLine, index) => newLine!= this.selLines[index])) {
      this.selLines = [...newLines];
      this.preview = [];
      this.updateMJ();
    }
  }

  ngAfterViewInit(): void {
      this.updateMJ();
  }

  addOutputToLines(mode: SubPartModes): boolean {
    if(!this.availibleModes[mode]) return false;

    let formulas = useMode(mode, this.preview);
    if(mode == "newLine") {
      formulas.forEach(formula => {
        this.storage.addLine(new CanvasLine({line: `$${formula.toTex()}$`, type: 'formula'}));
      });
    }else{
      this.storage.addLine(new CanvasLine({line: `$${formulas[0].toTex()}$`, type: 'formula'}), 
      this.storage.selectionLineIndex, true);
    }
    this.preview = [];
    clearSelected();
    return true;
  }

  updateMJ() { // update MathJax  
    this.cdRef.detectChanges();
    MathJax.typeset([document.getElementById("interaction")]);
  }

  async inputFormula(): Promise<Expression | null> {
    return new Promise((resolve) => {
      let formulaDialog = this.dialog.open(AddingModalFormulaComponent, {data: {checkFormula: true, description: "Enter an expression"}});
      this.statusService.toggleFormulaAdding();
      formulaDialog.afterClosed().subscribe(resp => {
        this.statusService.toggleFormulaAdding();
        if(!resp || resp.line == '$$') resolve(null);
        let formula = formulaFromTeX(resp.line.slice(1,-1));
        return formula.equalityParts.length == 1 ? resolve(formula.equalityParts[0]) : resolve(null);
      });
    });
  }

  async useTemplate(id: string): Promise<boolean> {
    let action = availibleActions.get(id);
    if(!action) return false;

    let input;
    if(actionConfigs.get(id)?.requireInput) {
      input = await this.inputFormula();
      if(!input) {
        this.toast.clear();
        this.toast.error("Not a valid expression");
        return false;
      }
    };
  
    let formulas = action(input);
    if(formulas) {
      if(formulas.length) this.preview = formulas;
      return true;
    }
    this.toast.clear();
    this.toast.error("Can't use this template");
    return false;
  }

  @HostListener('window:keydown', ['$event'])
  activeHotkeys(event: KeyboardEvent) {
    if(!this.storage.selectedLines.length) return;
    this.hotkeys.forEach(async (hk) => {
      if(hk.key != event.key || hk.ctrl != event.ctrlKey || hk.shift != event.shiftKey) return;
      console.log(event.key)
      let used = await this.useTemplate(hk.id);
      if(!used) return;
      this.addOutputToLines(hk.options.mode);
    });
  }
}