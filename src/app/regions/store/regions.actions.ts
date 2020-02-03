import { Action } from '@ngrx/store';
import { Region } from 'src/app/shared/models/region';

export const GET_REGIONS_START = '[Regions] Get Regions Start';
export const GET_REGIONS_SUCCESS = '[Regions] Get Regions Success';

export type RegionActions =
GetRegionsStart |
GetRegionsSuccess;

export class GetRegionsStart implements Action {
  readonly type = GET_REGIONS_START;
}


export class GetRegionsSuccess implements Action {

  readonly type = GET_REGIONS_SUCCESS;

  constructor(
    public payload: Region[]
  ) { }

}
