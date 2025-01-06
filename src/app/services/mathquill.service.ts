import { Injectable } from '@angular/core';
import { MathQuill as MathQuillInterface } from '@trevorhanus/mathquill-types';
import { availibleMathFunc, formulaTemplate } from '../configs/config';
declare let MathQuill: any;
@Injectable({
  providedIn: 'root'
})

export class MathQuillService {
  private readonly mqConfigs = {
    supSubsRequireOperand: true,
    maxDepth: 4,
    autoOperatorNames: Object.keys(availibleMathFunc).join(" ")
  };

  private MQ: MathQuillInterface;
  constructor() { 
    this.MQ = MathQuill.getInterface(2);
  }

  createMathField(elem: HTMLSpanElement) {
    let mathField = this.MQ.MathField(elem, this.mqConfigs);
    let input = elem.querySelector('textarea') as HTMLTextAreaElement;
    input.inputMode = 'none';
    this._setPaste(input);
    return mathField;
  }

  private _setPaste(input: HTMLTextAreaElement) {
    input?.addEventListener('input', async ()=>{
      if(!input?.value.match(formulaTemplate)) return;
      input.value = input.value.slice(1, -1);
    });
  }
}
