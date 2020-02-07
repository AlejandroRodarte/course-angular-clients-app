import { Region } from './region';
import { Bill } from './bill';

export class Client {

  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public region: Region,
    public id?: number,
    public createdAt?: string,
    public image?: string,
    public bills?: Bill[]
  ) { }

}
