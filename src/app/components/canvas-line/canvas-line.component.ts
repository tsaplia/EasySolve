import { AfterViewInit, Component, Input } from '@angular/core';
import { CanvasLine } from 'src/app/models/canvasLine';
import { formulaFromTeX } from 'src/app/modules/math-actions/from-tex';
import { prepareHTML } from 'src/app/modules/math-actions/selection/selection-listeners';

declare let MathJax: any;

@Component({
  selector: 'app-canvas-line',
  templateUrl: './canvas-line.component.html'
})
export class CanvasLineComponent implements AfterViewInit {
  @Input() line: CanvasLine;
  ngAfterViewInit(): void {
    let elem = document.querySelector(`#line-${this.line.id}`) as HTMLElement;
    MathJax.typeset([elem]);
    if(this.line.type == 'formula') {
      prepareHTML(elem, formulaFromTeX(this.line.line.slice(1, -1)));
    }
  }
}
