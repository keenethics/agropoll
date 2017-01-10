import * as types from '/imports/ui/actions/types';

const initialState = {
  marketingYear: localStorage.getItem('marketingYear'), // <-- Put there actual marketing year
};

export default function yearSelectorReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.SELECT_YEAR: {
      const { marketingYear } = action;
      return { ...state, marketingYear }; // return Object.assign({}, state, { marketingYear });
    }
    default: return state;
  }
}
