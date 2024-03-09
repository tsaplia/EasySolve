
export class FormulaAction {
  id: string;
  categoryId: number;
  template: boolean;
  type: string;
  body: string | null;
  name: string;

  constructor(obj?: FormulaAction) {
    if(obj) Object.assign(this, obj);

  }
}