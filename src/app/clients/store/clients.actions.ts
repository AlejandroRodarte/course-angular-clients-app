import { Action } from '@ngrx/store';
import { Client } from 'src/app/shared/models/client';

export const GET_CLIENTS_START = '[Clients] Get Clients Start';
export const GET_CLIENTS_SUCCESS = '[Clients] Get Clients Success';

export const GET_CLIENT_START = '[Clients] Get Client Start';
export const GET_CLIENT_SUCCESS = '[Clients] Get Client Success';

export const SELECT_CLIENT = '[Clients] Select Client';
export const CLEAR_CLIENT = '[Clients] Clear Client';

export const ADD_CLIENT_START = '[Clients] Add Client Start';
export const ADD_CLIENT_SUCCESS = '[Clients] Add Client Success';

export const UPDATE_CLIENT_START = '[Clients] Update Client Start';
export const UPDATE_CLIENT_SUCCESS = '[Clients] Update Client Success';

export type ClientActions =
GetClientsStart |
GetClientsSuccess |
GetClientStart |
GetClientSuccess |
SelectClient |
ClearClient |
AddClientStart |
AddClientSuccess |
UpdateClientStart |
UpdateClientSuccess;

export class GetClientsStart implements Action {
  readonly type = GET_CLIENTS_START;
}

export class GetClientsSuccess implements Action {

  readonly type = GET_CLIENTS_SUCCESS;

  constructor(
    public payload: Client[]
  ) { }

}

export class GetClientStart implements Action {

  readonly type = GET_CLIENT_START;

  constructor(
    public payload: number
  ) { }

}

export class GetClientSuccess implements Action {

  readonly type = GET_CLIENT_SUCCESS;

  constructor(
    public payload: Client
  ) { }

}

export class SelectClient implements Action {

  readonly type = SELECT_CLIENT;

  constructor(
    public payload: number
  ) { }

}

export class ClearClient implements Action {
  readonly type = CLEAR_CLIENT;
}

export class AddClientStart implements Action {

  readonly type = ADD_CLIENT_START;

  constructor(
    public payload: Client
  ) { }

}

export class AddClientSuccess implements Action {

  readonly type = ADD_CLIENT_SUCCESS;

  constructor(
    public payload: Client
  ) { }

}

export class UpdateClientStart implements Action {

  readonly type = UPDATE_CLIENT_START;

  constructor(
    public payload: Client
  ) { }

}

export class UpdateClientSuccess implements Action {

  readonly type = UPDATE_CLIENT_SUCCESS;

  constructor(
    public payload: Client
  ) { }

}
