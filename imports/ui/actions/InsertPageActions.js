import { Meteor } from 'meteor/meteor';

export const GO_TO_PIN = 'GO_TO_PIN';
export const SELECT_YEAR = 'SELECT_YEAR';
export const SELECT_PLACE = 'SELECT_PLACE';

export function selectPlace(place, fullAddress) {
  const action = {
    type: SELECT_PLACE,
    placeId: place.place_id,
    placeType: place.types[0],
    fullAddress,
  };
  return action;
}

export function goToPin(placeId, fullAddress, hideCrops) {
  const action = {
    type: GO_TO_PIN,
    placeId,
    hideCrops,
    fullAddress,
  };
  return action;
}

export function selectYear(marketingYear) {
  const action = {
    type: SELECT_YEAR,
    marketingYear,
  };
  return action;
}

export function saveData() {
  return (dispatch, getState) => {
    const insertTableState = getState().insertTable;
    Meteor.call('record.updateMulti', insertTableState.inputData);

  }
}
