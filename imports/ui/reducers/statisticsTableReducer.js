import * as types from '/imports/ui/actions/types';

const initialState = {
  administrative_area_level_1: null,
  administrative_area_level_2: null,
  place_id: null,

  planned: true,
  planed: true,
  harvested: false,
};

export default function statisticsTableReducer (state = initialState, action = {}) {
  switch (action.type) {
    case types.CHANGE_LOCATION_FILTER: {
      console.log(action)
      return { ...state, ...action.obj };
    };
    case types.CHANGE_STATUS_FILTER: {
      const { planned, planted, harvested } = action;
      return Object.assign({}, state, { planned, planted, harvested });
    };
    default: return state;
  }
}
