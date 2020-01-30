
import { Client } from './../models/client';

export interface CreateClientResponseSuccess {
  message: string;
  client: Client;
}

export interface DeleteClientResponseSuccess {
  message: string;
}

export interface ClientNotFoundError {
  message: string;
}

export interface DataAccessError {
  message: string;
  error: string;
}
