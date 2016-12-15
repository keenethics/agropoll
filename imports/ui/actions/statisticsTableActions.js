export const CHANGE_LOCATION_FILTER = 'CHANGE_LOCATION_FILTER';

export const changeLocationFilter = (administrative_area_level_1, administrative_area_level_2, place_id) => {
  return {
    type: CHANGE_LOCATION_FILTER,
    administrative_area_level_1,
    administrative_area_level_2,
    place_id,
  };
}
