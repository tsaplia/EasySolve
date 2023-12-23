import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MathQuillService } from "src/app/services/mathquill.service";

@Component({
  templateUrl: 'formula-model.component.html',
  styleUrls: ['formula-model.component.scss'],
})

export class FormulaModelComponent implements OnInit {
  mathField: any;
  formula: string = '';
  
  constructor(private dialogRef: MatDialogRef<FormulaModelComponent>, private MQ: MathQuillService) {}
  
  ngOnInit(): void {
    console.log(document.getElementById("math-field") )
    this.mathField = this.MQ.createMathField(document.getElementById("math-field") as HTMLSpanElement);
  }

  close() {
    this.dialogRef.close();
  }

  add() {
    this.dialogRef.close({formula: `$${this.mathField.latex()}$`});
  }

}