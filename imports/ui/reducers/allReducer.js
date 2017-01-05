import * as types from '/imports/ui/actions/types';

const initialState = {
  marketingYear: localStorage.getItem('marketingYear'),
};

export default function yearSelectorReducer(state = initialState, action = {}) {
  console.log('action in reducer-->', action);

  switch (action.type) {
    case types.SELECT_YEAR: {
      // return { ...state, ...action.marketingYear };
      const { marketingYear } = action;
      return Object.assign({}, state, { marketingYear });
    }
    default: return state;
  }
}

// case SELECT_YEAR: {
//   const { marketingYear } = action;
//   return Object.assign({}, state, { marketingYear });
// }
