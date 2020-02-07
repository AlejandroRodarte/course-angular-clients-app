
import { BillItem } from './bill-item';

export class Bill {

  constructor(
    public id: number,
    public description: string,
    public comment: string,
    public createdAt: string,
    public billItems: BillItem[],
    public total: number
  ) { }

}
