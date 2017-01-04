import { Meteor } from 'meteor/meteor';

export const GO_TO_PIN = 'GO_TO_PIN';
export const HIDE_CROPS = 'HIDE_CROPS';
export const SHOW_CROPS = 'SHOW_CROPS';
export const SELECT_YEAR = 'SELECT_YEAR';
export const SELECT_PLACE = 'SELECT_PLACE';
export const SHOW_SPINNER = 'SHOW_SPINNER';
export const HIDE_SPINNER = 'HIDE_SPINNER';

export function selectPlace(place, fullAddress) {
  const action = {
    type: SELECT_PLACE,
    place_id: place.place_id,
    placeType: place.types[0],
    fullAddress,
  };
  return action;
}

export const goToPin = (place_id, fullAddress, hideCrops) => ({
  type: GO_TO_PIN,
  place_id,
  hideCrops,
  fullAddress,
});

export function startSpinner() {
  const action = {
    type: SHOW_SPINNER,
  };
  return action;
}

export function hideSpinner() {
  const action = {
    type: HIDE_SPINNER,
  };
  return action;
}

export const selectYear = (marketingYear) => ({
  type: SELECT_YEAR,
  marketingYear,
});

export const saveData = () => {
  return (dispatch, getState) => {
    const insertTableState = getState().insertTable;
    dispatch(hideCrops());
    Meteor.call('record.updateMulti', insertTableState.inputData);
  }
}

export const hideCrops = () => ({
  type: HIDE_CROPS,
});

export const showCrops = () => ({
  type: SHOW_CROPS,
});
