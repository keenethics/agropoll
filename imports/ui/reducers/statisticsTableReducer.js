import * as types from '../actions/types';

const initialState = {
  admLevel1: null,
  admLevel2: null,
  place: null,
};

export default function statisticsTableReducer (state = initialState, action = {}) {
  switch (action.type) {
    case types.CHANGE_LOCATION_FILTER: {
      return { ...state, ...action.obj}
    };
    default: return state;
  }
}
