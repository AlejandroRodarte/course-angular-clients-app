import { Region } from 'src/app/shared/models/region';
import * as RegionActions from './regions.actions';

export interface RegionsReducerState {
  regions: Region[];
}

const initialState: RegionsReducerState = {
  regions: []
};

export function regionsReducer(state = initialState, action: RegionActions.RegionActions) {

  switch (action.type) {

    case RegionActions.GET_REGIONS_SUCCESS:
      return {
        ...state,
        regions: action.payload
      };

    default:
      return state;

  }

}
