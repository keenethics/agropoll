import { combineReducers } from 'redux';

import insertPage from './insertPageReducer.js';
import insertTable from './insertTableReducer.js'

export default combineReducers({
  insertPage,
  insertTable,
})
