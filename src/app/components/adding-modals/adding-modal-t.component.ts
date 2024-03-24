import { AfterViewInit, Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MathQuillService } from "src/app/services/mathquill.service";

@Component({
  templateUrl: 'adding-modal-t.component.html',
  styleUrls: ['adding-modal-t.component.scss'],
})

export class AddingModalTextComponent implements OnInit, AfterViewInit {
  mathField: MQ.MathField;
  
  constructor(private dialogRef: MatDialogRef<AddingModalTextComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: any, // don't use it now
              private MQ: MathQuillService) {}
  
  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.mathField = this.MQ.createMathField(document.getElementById("math-field") as HTMLSpanElement);
  }

  close() {
    this.dialogRef.close();
  }

  add() {
    this.dialogRef.close({line: `$${this.mathField.latex()}$`});
  }

}