import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";

@Component({
  templateUrl: 'formula-model.component.html',
  styleUrls: ['formula-model.component.scss']
})

export class FormulaModelComponent implements OnInit {
  
  formula: string = '';
  
  constructor(private dialogRef: MatDialogRef<FormulaModelComponent>) {}
  
  ngOnInit(): void {
    
  }

  close() {
    this.dialogRef.close();
  }

  add() {
    this.dialogRef.close({formula: this.formula});
  }

}