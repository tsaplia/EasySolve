export class CanvasLine {
  id: number;
  type: string;
  line: string;
  
  constructor(obj?: any) {
    if(obj) Object.assign(this, obj);
    this.id = new Date().getTime();
  }
}