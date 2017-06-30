import * as types from '/imports/ui/actions/types';

const initialState = {
  year: '2016-17', // <-- Put there actual agricultural year
};

export default function yearSelectorReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.SELECT_YEAR: {
      const { year } = action;
      return { ...state, year };
    }
    default: return state;
  }
}
