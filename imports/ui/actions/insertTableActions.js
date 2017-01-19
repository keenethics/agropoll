export const CHANGE_SORT = 'CHANGE_SORT';
export const CHANGE_SQUARE = 'CHANGE_SQUARE';
export const CHANGE_STATUS = 'CHANGE_STATUS';
export const ADD_INPUT_DATA = 'ADD_INPUT_DATA';
export const CHANGE_CAPACITY = 'CHANGE_CAPACITY';
export const CHANGE_REPRODUCTION = 'CHANGE_REPRODUCTION';

export const addInputData = ({ _id, sort, reproduction, square, cropYield }) => ({
  type: ADD_INPUT_DATA,
  _id,
  sort,
  reproduction,
  square,
  cropYield,
});

export const changeSort = (id, sort) => ({
  type: CHANGE_SORT,
  id,
  sort,
});

export const changeSquare = (id, square) => ({
  type: CHANGE_SQUARE,
  id,
  square,
});

export const changeCapacity = (id, capacity) => ({
  type: CHANGE_CAPACITY,
  id,
  capacity,
});

export const changeReproduction = (id, reproduction) => ({
  type: CHANGE_REPRODUCTION,
  id,
  reproduction,
});
