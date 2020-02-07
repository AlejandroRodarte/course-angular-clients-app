import { RegionDto } from './region';
import { RawBillDto } from './bill';

export class RawClientDto {

  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public email: string,
    public createdAt: string,
    public image: string,
    public region: RegionDto
  ) { }

}

export class ClientDto extends RawClientDto {

  constructor(
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    createdAt: string,
    image: string,
    region: RegionDto,
    public bills: RawBillDto[]
  ) {
    super(id, firstName, lastName, email, createdAt, image, region);
  }

}
