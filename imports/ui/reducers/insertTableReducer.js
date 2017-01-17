import {
  ADD_INPUT_DATA,
  CHANGE_STATUS,
  CHANGE_CAPACITY,
  CHANGE_SORT,
  CHANGE_REPRODUCTION,
  CHANGE_SQUARE,
} from '/imports/ui/actions/insertTableActions.js';

const initialState = {
  inputData: {},
};

export default function InsertTableReducer(state = initialState, action = {}) {
  switch (action.type) {
    case ADD_INPUT_DATA: {
      const { _id, sort, reproduction, square, cropCapacity } = action;
      state.inputData[_id] = {
        sort,
        reproduction,
        square,
        cropCapacity,
      };
      return Object.assign({}, state);
    }
    // case CHANGE_STATUS: {
    //   const { id, status } = action;
    //   state.inputData[id].status = status;
    //   return Object.assign({}, state);
    // }
    case CHANGE_CAPACITY: {
      const { id, capacity } = action;
      state.inputData[id].cropCapacity = capacity;
      return Object.assign({}, state);
    }
    case CHANGE_SORT: {
      const { id, sort } = action;
      state.inputData[id].sort = sort;
      return Object.assign({}, state);
    }
    case CHANGE_REPRODUCTION: {
      const { id, reproduction } = action;
      state.inputData[id].reproduction = reproduction;
      return Object.assign({}, state);
    }
    case CHANGE_SQUARE: {
      const { id, square } = action;
      state.inputData[id].square = square;
      return Object.assign({}, state);
    }
    default: return state;
  }
}
