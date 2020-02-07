import { ProductDto } from './product';

export class BillItemDto {

  constructor(
    public id: number,
    public quantity: number,
    public product: ProductDto,
    public price: number
  ) { }

}
