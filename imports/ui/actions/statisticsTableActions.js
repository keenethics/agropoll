import * as types from './types';

export const changeLocationFilter = obj => {
  return {
    type: types.CHANGE_LOCATION_FILTER,
    obj
  };
}
