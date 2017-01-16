import {
  SELECT_PLACE,
  GO_TO_PIN,
  HIDE_CROPS,
  SHOW_CROPS,
  SHOW_SPINNER,
  HIDE_SPINNER,
  HIDE_MODAL,
  SHOW_MODAL,
} from '/imports/ui/actions/InsertPageActions.js';


const initialState = {
  fullAddress: localStorage.getItem('fullAddress'),
  place_id: localStorage.getItem('place_id'),
  placeType: localStorage.getItem('placeType'),
  hideCrops: true,
  groupId: '',
  seekingLocation: false,
  hideModal: false,
  modalObject: null,
};


export default function InsertPageReducer(state = initialState, action = {}) {
  console.log(action);
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
      const { place_id, placeType, fullAddress, hideCrops } = action;
      return Object.assign({}, state, {
        place_id,
        placeType,
        hideCrops,
        fullAddress,
      });
    }
    case HIDE_CROPS: {
      return Object.assign({}, state, { hideCrops: true, groupId: action.groupId || '' });
    }
    case SHOW_CROPS: {
      return Object.assign({}, state, { hideCrops: false, groupId: action.groupId || '' });
    }
    case SHOW_SPINNER: {
      return Object.assign({}, state, { seekingLocation: true });
    }
    case HIDE_SPINNER: {
      return Object.assign({}, state, { seekingLocation: false });
    }
    case SHOW_MODAL: {
      return Object.assign({}, state, { hideModal: false, modalObject: action.modalObject });
    }
    case HIDE_MODAL: {
      return Object.assign({}, state, { hideModal: true });
    }
    default: return state;
  }
}
