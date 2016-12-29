import * as types from './types';

export const changeLocationFilter = obj => ({
  type: types.CHANGE_LOCATION_FILTER,
  obj
});

export const changeStatusFilter = (name, status) => {
  return {
    type: types.CHANGE_STATUS_FILTER,
    planned: status,
    // planted,
    // harvested,
  };
}
