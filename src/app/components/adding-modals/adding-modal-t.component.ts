/* eslint-disable angular/document-service */
/* eslint-disable @typescript-eslint/consistent-type-imports */
import { AfterViewInit, Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { AddingModalFormulaComponent } from "./adding-modal-f.component";
import { StatusService } from "src/app/services/status.service";

@Component({
    templateUrl: "adding-modal-t.component.html",
    styleUrls: ["adding-modal.component.scss"]
})

export class AddingModalTextComponent implements OnInit, AfterViewInit {
    line: string = "";

    constructor(private readonly dialogRef: MatDialogRef<AddingModalTextComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { line: string },
              private readonly dialog: MatDialog,
              private readonly statusService: StatusService) {
        this.line = data.line;
    }

    ngOnInit(): void {

    }

    ngAfterViewInit(): void {
        let textArea = document.getElementById("myInput") as HTMLTextAreaElement;
        textArea.focus();
    }

    addFormula(): void {
        let textArea = document.getElementById("myInput") as HTMLTextAreaElement;
        let formulaDialog = this.dialog.open(AddingModalFormulaComponent, { data: { formula: "" } });
        this.statusService.toggleFormulaAdding();
        formulaDialog.afterClosed().subscribe((resp) => {
            this.statusService.toggleFormulaAdding();
            if (!resp || resp.line == "$$") return;
            this.line = this.line.substring(0, textArea.selectionStart) +
            resp.line + this.line.substring(textArea.selectionStart);
            textArea.focus();
        });
    }

    close(): void {
        this.dialogRef.close();
    }

    add(): void {
        this.dialogRef.close({ line: this.line });
    }
}
