import {
  CHANGE_LOCATION_FILTER,
} from '/imports/ui/actions/statisticsTableActions.js';

const initialState = {
  administrative_area_level_1: null,
  administrative_area_level_2: null,
  place_id: null,
};

export default function statisticsTableReducer (state = initialState, action = {}) {
  switch (action.type) {
    case CHANGE_LOCATION_FILTER: {
      const { administrative_area_level_1, administrative_area_level_2, place_id } = action;
      return Object.assign({}, state, { administrative_area_level_1, administrative_area_level_2, place_id });
    };
    default: return state;
  }
}
