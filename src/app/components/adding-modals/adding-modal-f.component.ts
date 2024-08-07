/* eslint-disable angular/document-service */
/* eslint-disable @typescript-eslint/consistent-type-imports */
import { AfterViewInit, Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MathQuillService } from "src/app/services/mathquill.service";
import { checkFormula } from "src/app/modules/math-actions/from-tex";
import { ToastrService } from "ngx-toastr";

@Component({
    templateUrl: "adding-modal-f.component.html",
    styleUrls: ["adding-modal-f.component.scss"]
})

export class AddingModalFormulaComponent implements OnInit, AfterViewInit {
    mathField: MQ.MathField;
    error: string = "";
    description: string = "";

    constructor(private readonly dialogRef: MatDialogRef<AddingModalFormulaComponent>,
              // eslint-disable-next-line max-len
              @Inject(MAT_DIALOG_DATA) public data: { formula?: string, checkFormula?: boolean, description?: string },
              private readonly MQ: MathQuillService,
              private readonly toast: ToastrService) {}

    ngOnInit(): void {
        this.description = this.data.description ? this.data.description : "";
    }

    ngAfterViewInit(): void {
        this.mathField = this.MQ.createMathField(document.getElementById("math-field") as HTMLSpanElement);
        if (this.data?.formula?.match(/\$.*\$/)) {
            this.mathField.latex(this.data.formula.slice(1, -1));
        }
    }

    getNewElement(event: any) {
        this.mathField.latex(this.mathField.latex() + event);
        this.mathField.focus();
    }

    close(): void {
        this.dialogRef.close();
    }

    add(): void {
        if (!this.data?.checkFormula) {
            this.dialogRef.close({ line: `$${this.mathField.latex()}$` });
            return;
        } 
        let formula = checkFormula(this.mathField.latex());
        if(formula){
            this.dialogRef.close({ line: `$${formula.toTex()}$` });
        }else{
            this.toast.clear();
            this.toast.error("Incorrect formula");
        }
    }
}
