
export const CHANGE_SORT = 'CHANGE_SORT';
export const CHANGE_SQUARE = 'CHANGE_SQUARE';
export const CHANGE_STATUS = 'CHANGE_STATUS';
export const ADD_INPUT_DATA = 'ADD_INPUT_DATA';
export const CHANGE_CAPACITY = 'CHANGE_CAPACITY';
export const CHANGE_REPRODUCTION = 'CHANGE_REPRODUCTION';


export function addInputData ({ _id, sort, reproduction, square, cropCapacity, status }) {
  const action = {
    type: ADD_INPUT_DATA,
    _id,
    sort,
    square,
    status,
    reproduction,
    cropCapacity,
  }
  return action;
}

export function changeSort (id, sort) {
  const action = {
    type: CHANGE_SORT,
    id,
    sort,
  }
  return action;
}

export function changeSquare (id, square) {
  const action = {
    type: CHANGE_SQUARE,
    id,
    square,
  }
  return action;
}

export function changeCapacity (id, capacity) {
  const action = {
    type: CHANGE_CAPACITY,
    id,
    capacity,
  }
  return action;
}

export function changeStatus (id, status) {
  const action = {
    type: CHANGE_STATUS,
    id,
    status,
  }
  return action;
}

export function changeReproduction (id, reproduction) {
  const action = {
    type: CHANGE_REPRODUCTION,
    id,
    reproduction,
  }
  return action;
}
