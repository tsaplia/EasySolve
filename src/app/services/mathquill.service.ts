import { Injectable } from '@angular/core';
import { MathQuill as MathQuillInterface } from '@trevorhanus/mathquill-types';
import { availibleMathFunc } from '../configs/config';
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
    return this.MQ.MathField(elem, this.mqConfigs);
  }
}
