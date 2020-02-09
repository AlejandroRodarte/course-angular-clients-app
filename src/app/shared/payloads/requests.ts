import { RawClientDto } from '../models/client';
import { ProductDto } from '../models/product';

export interface LoginRequest {
  username: string;
  password: string;
}

interface CreateRegionRequest {
  id: number;
  name: string;
}

export interface CreateClientRequest {
  firstName: string;
  lastName: string;
  email: string;
  region: CreateRegionRequest;
}

export interface UpdateClientRequest extends CreateClientRequest {
  id: number;
}

export interface CreateBillRequest {
  description: string;
  comment: string;
  client: RawClientDto;
  billItems: CreateBillItemRequest[];
}

interface CreateBillItemRequest {
  quantity: number;
  product: ProductDto;
}
