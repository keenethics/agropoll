import * as types from './types.js';

export const selectYear = (year) => ({
  type: types.SELECT_YEAR,
  year,
});
