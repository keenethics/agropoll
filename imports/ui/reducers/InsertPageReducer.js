import {
  SELECT_PLACE,
  SELECT_YEAR,
  GO_TO_PIN,
 } from '/imports/ui/actions/InsertPageActions.js';

const initialState = {
  fullAddress: localStorage.getItem('fullAddress'),
  placeId: localStorage.getItem('placeId'),
  placeType: localStorage.getItem('placeType'),
  marketingYear: localStorage.getItem('marketingYear') || 2016,
  hideCrops: true
}


export default function InsertPageReducer(state = initialState, action = {}) {
  switch (action.type){
    case SELECT_PLACE: {
      const placeId = action.placeId;
      const placeType = action.placeType;
      const fullAddress = action.fullAddress;
      return Object.assign({}, state, {
        placeId,
        placeType,
        fullAddress,
      })
    };
    case SELECT_YEAR: {
      const { marketingYear } = action;
      return Object.assign({}, state, { marketingYear });
    };
    case GO_TO_PIN: {
      const { placeId, fullAddress, hideCrops } = action;
      return Object.assign({}, state, {
        placeId,
        hideCrops,
        fullAddress,
      })
    }
    default: return state;
  }
}
