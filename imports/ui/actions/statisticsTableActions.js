import * as types from './types';

export const changeLocationFilter = obj => {
  return {
    type: types.CHANGE_LOCATION_FILTER,
    obj
  };
}

export const changeStatusFilter = (planned, planted, harvested) => {
  return {
    type: types.CHANGE_STATUS_FILTER,
    planned,
    planted,
    harvested,
  };
}
