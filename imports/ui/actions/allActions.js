import * as types from './types.js';

export const selectYear = (marketingYear) => ({
  type: types.SELECT_YEAR,
  marketingYear,
});
