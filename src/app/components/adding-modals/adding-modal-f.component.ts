import { AfterViewInit, Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MathQuillService } from "src/app/services/mathquill.service";
import { formulaFromTeX } from "src/app/modules/math-actions/from-tex";
import { ToastrService } from "ngx-toastr";

@Component({
  templateUrl: 'adding-modal-f.component.html',
  styleUrls: ['adding-modal-f.component.scss'],
})

export class AddingModalFormulaComponent implements OnInit, AfterViewInit {
  mathField: MQ.MathField;
  
  
  constructor(private dialogRef: MatDialogRef<AddingModalFormulaComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: any, // don't use it now
              private MQ: MathQuillService,
              private toast: ToastrService) {}
  
  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.mathField = this.MQ.createMathField(document.getElementById("math-field") as HTMLSpanElement);
  }

  close() {
    this.dialogRef.close();
  }

  add() {
    if(!this.checkLine(this.mathField.latex())) {
      this.toast.clear();
      this.toast.error("","Uncorrect formula");
    }
    else
      this.dialogRef.close({line: `$${this.mathField.latex()}$`});
  }

  checkLine(line: string)  {
    try{
      formulaFromTeX(line);
    }catch(e) {
      return false;
    }
    return true;
  }

}