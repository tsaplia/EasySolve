import { AfterViewInit, Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MathQuillService } from "src/app/services/mathquill.service";

@Component({
  templateUrl: 'adding-modal.component.html',
  styleUrls: ['adding-modal.component.scss'],
})

export class AddingModalComponent implements OnInit, AfterViewInit {
  mathField: MQ.MathField;
  type: string = 'formula';
  
  constructor(private dialogRef: MatDialogRef<AddingModalComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: {type: string, line: string},
              private MQ: MathQuillService) {}
  
  ngOnInit(): void {
    this.type = this.data.type;
  }
  ngAfterViewInit(): void {
    this.mathField = this.MQ.createMathField(document.getElementById("math-field") as HTMLSpanElement);
    this.mathField.write(this.data.line ? this.data.line.slice(1, -1) : '');
  }

  close() {
    this.dialogRef.close();
  }

  add() {
    this.dialogRef.close({line: `$${this.mathField.latex()}$`});
  }

}