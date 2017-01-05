import { combineReducers } from 'redux';

import insertPage from './insertPageReducer.js';
import insertTable from './insertTableReducer.js';
import statisticsTable from './statisticsTableReducer.js';
import all from './allReducer.js';

export default combineReducers({
  insertPage,
  insertTable,
  statisticsTable,
  all,
});
