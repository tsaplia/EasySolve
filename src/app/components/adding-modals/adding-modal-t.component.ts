import { AfterViewInit, Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { AddingModalFormulaComponent } from "./adding-modal-f.component";

@Component({
  templateUrl: 'adding-modal-t.component.html',
  styleUrls: ['adding-modal-t.component.scss'],
})

export class AddingModalTextComponent implements OnInit, AfterViewInit {
  line: string = '';
  
  constructor(private dialogRef: MatDialogRef<AddingModalTextComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: {line: string}, 
              private dialog: MatDialog) {
                this.line = data.line;
              }
  
  ngOnInit(): void {
  
  }
  ngAfterViewInit(): void {

  }

  addFormula(): void {
    let formulaDialog = this.dialog.open(AddingModalFormulaComponent, {data: {formula: ''}});
    formulaDialog.afterClosed().subscribe(resp => {
      if(!resp || resp.line == '$$') return;
      this.line += resp.line;
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  add(): void {
    this.dialogRef.close({line: this.line});
  }

}