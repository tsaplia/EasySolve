import { AfterViewInit, Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MathQuillService } from "src/app/services/mathquill.service";
import { formulaFromTeX } from "src/app/modules/math-actions/from-tex";

@Component({
  templateUrl: 'adding-modal-f.component.html',
  styleUrls: ['adding-modal-f.component.scss'],
})

export class AddingModalFormulaComponent implements OnInit, AfterViewInit {
  mathField: MQ.MathField;
  error: string = '';
  
  constructor(private dialogRef: MatDialogRef<AddingModalFormulaComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: {formula?: string, checkFormula?: boolean}, 
              private MQ: MathQuillService) {}
  
  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.mathField = this.MQ.createMathField(document.getElementById("math-field") as HTMLSpanElement);
    if(this.data?.formula && this.data.formula.match(/\$.*\$/)) {
      this.mathField.latex(this.data.formula.slice(1, -1));
    }
  }

  close() {
    this.dialogRef.close();
  }

  add() {
    if(!this.data?.checkFormula || this._checkFormula()) {
      this.dialogRef.close({line: `$${this.mathField.latex()}$`});
    }
  }

  _checkFormula(): boolean {
    try{
      formulaFromTeX(this.mathField.latex());
      return true;
    }catch(e: any) {
      this.error = e.message;
      return false;
    }
  }
}