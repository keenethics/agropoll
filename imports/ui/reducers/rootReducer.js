import { combineReducers } from 'redux';

import insertPage from './insertPageReducer.js';
import insertTable from './insertTableReducer.js';
import statisticsTable from './statisticsTableReducer.js';

export default combineReducers({
  insertPage,
  insertTable,
  statisticsTable,
})
