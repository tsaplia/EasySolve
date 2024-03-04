import { idCounter } from "../configs/config";

export class CanvasLine {
  id: number;
  type: "text" | "formula";
  line: string;
  
  constructor(obj?: {type: "text" | "formula", line: string}) {
    if(obj) Object.assign(this, obj);
    this.id = idCounter.getId();
  }
}