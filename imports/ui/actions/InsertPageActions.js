export const SELECT_PLACE = 'SELECT_PLACE'
export const SELECT_YEAR = 'SELECT_YEAR';

export function selectPlace(place, fullAddress){
  const action = {
    type: SELECT_PLACE,
    placeId: place.place_id,
    placeType: place.types[0],
    fullAddress,
  }
  return action;
}

export function selectYear(marketingYear){
  const action = {
    type: SELECT_YEAR,
    marketingYear,
  }
  return action;
}
