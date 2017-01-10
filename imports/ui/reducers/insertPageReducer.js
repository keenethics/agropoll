import {
  SELECT_PLACE,
  GO_TO_PIN,
  HIDE_CROPS,
  SHOW_CROPS,
  SHOW_SPINNER,
  HIDE_SPINNER,
} from '/imports/ui/actions/InsertPageActions.js';


const initialState = {
  fullAddress: localStorage.getItem('fullAddress'),
  place_id: localStorage.getItem('place_id'),
  placeType: localStorage.getItem('placeType'),
  hideCrops: true,
  seekingLocation: false,
};


export default function InsertPageReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SELECT_PLACE: {
      const place_id = action.place_id;
      const placeType = action.placeType;
      const fullAddress = action.fullAddress;
      return Object.assign({}, state, {
        place_id,
        placeType,
        fullAddress,
      });
    }
    case GO_TO_PIN: {
      const { place_id, fullAddress, hideCrops } = action;
      return Object.assign({}, state, {
        place_id,
        hideCrops,
        fullAddress,
      });
    }
    case HIDE_CROPS: {
      return Object.assign({}, state, { hideCrops: true });
    }
    case SHOW_CROPS: {
      return Object.assign({}, state, { hideCrops: false });
    }
    case SHOW_SPINNER: {
      return Object.assign({}, state, { seekingLocation: true });
    }
    case HIDE_SPINNER: {
      return Object.assign({}, state, { seekingLocation: false });
    }
    default: return state;
  }
}
