import { Component, ElementRef, OnInit } from "@angular/core";

@Component({
  selector: 'main-component',
  templateUrl: 'main.component.html',
  styleUrls: ['main.component.scss']
})
export class MainComponent implements OnInit {
  constructor(private elemenet: ElementRef) {}
  
  
  ngOnInit(): void {
    // this.tery()
  }
  
  
  text: string = "";
  

  tery() {
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, this.elemenet.nativeElement])
  }
 
}