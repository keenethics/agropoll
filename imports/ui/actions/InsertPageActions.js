import { Meteor } from 'meteor/meteor';

export const GO_TO_PIN = 'GO_TO_PIN';
export const HIDE_CROPS = 'HIDE_CROPS';
export const SHOW_CROPS = 'SHOW_CROPS';
export const SELECT_PLACE = 'SELECT_PLACE';
export const SHOW_SPINNER = 'SHOW_SPINNER';
export const HIDE_SPINNER = 'HIDE_SPINNER';
export const SHOW_MODAL = 'SHOW_MODAL';
export const HIDE_MODAL = 'HIDE_MODAL';

export const selectPlace = (place, fullAddress) => ({
  type: SELECT_PLACE,
  place_id: place.place_id,
  placeType: place.types[0],
  fullAddress,
});

export const goToPin = (place_id, placeType, fullAddress, hideCrops) => ({
  type: GO_TO_PIN,
  place_id,
  placeType,
  hideCrops,
  fullAddress,
});

export const startSpinner = () => ({
  type: SHOW_SPINNER,
});

export const hideSpinner = () => ({
  type: HIDE_SPINNER,
});

export const hideCrops = (groupId) => ({
  type: HIDE_CROPS,
  groupId: groupId || ''
});

export const saveData = () => (dispatch, getState) => {
  const insertTableState = getState().insertTable;
  dispatch(hideCrops());
  Meteor.call('record.updateMulti', insertTableState.inputData);
};

export const showCrops = (groupId) => ({
  type: SHOW_CROPS,
  groupId: groupId || ''
});

export const showModal = (modalObject) => ({
  type: SHOW_MODAL,
  modalObject: modalObject || null,
});

export const hideModal = () => ({
  type: HIDE_MODAL,
});
