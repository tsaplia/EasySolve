import { Component, ElementRef, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { FormulaModelComponent } from "../formula-model/formula-model.component";

@Component({
  selector: 'main-component',
  templateUrl: 'main.component.html',
  styleUrls: ['main.component.scss']
})
export class MainComponent implements OnInit {
  constructor(private dialog: MatDialog) {}
  
  text: string = "";
  
  ngOnInit(): void {
    
  }
  
  OpenAddFunction() {
    var formulaDialog = this.dialog.open(FormulaModelComponent);
    formulaDialog.afterClosed().subscribe(resp => {
      console.log(resp);
      this.text = resp.formula;
      
    });
  }
  

  
 
}