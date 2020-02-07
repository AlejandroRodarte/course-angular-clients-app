import { BillItemDto } from './bill-item';
import { RawClientDto } from './client';

export class RawBillDto {

  constructor(
    public id: number,
    public description: string,
    public comment: string,
    public createdAt: string,
    public total: number
  ) { }

}

export class BillDto extends RawBillDto {

  constructor(
    id: number,
    description: string,
    comment: string,
    createdAt: string,
    total: number,
    public billItems: BillItemDto[],
    public client: RawClientDto
  ) {
    super(id, description, comment, createdAt, total);
  }

}
