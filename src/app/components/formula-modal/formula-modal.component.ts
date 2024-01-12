import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MathQuillService } from "src/app/services/mathquill.service";

@Component({
  templateUrl: 'formula-modal.component.html',
  styleUrls: ['formula-modal.component.scss'],
})

export class FormulaModalComponent implements OnInit {
  mathField: any;
  formula: string = '';
  
  constructor(private dialogRef: MatDialogRef<FormulaModalComponent>, private MQ: MathQuillService) {}
  
  ngOnInit(): void {
    this.mathField = this.MQ.createMathField(document.getElementById("math-field") as HTMLSpanElement);
  }

  close() {
    this.dialogRef.close();
  }

  add() {
    this.dialogRef.close({formula: `$${this.mathField.latex()}$`});
  }

}