import { Product } from './product';

export class BillItem {

  constructor(
    public id: number,
    public quantity: number,
    public product: Product,
    public price: number
  ) { }

}
