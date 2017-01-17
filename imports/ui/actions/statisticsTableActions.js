import * as types from './types';

export const changeLocationFilter = (obj) => ({
  type: types.CHANGE_LOCATION_FILTER,
  obj,
});

export const changeStatusFilter = (statuses) => ({
  type: types.CHANGE_STATUS_FILTER,
  statuses,
});
