import { combineReducers } from 'redux';
import search from './search';
import flight from './flight';
import util from './util';
import { connectRouter } from 'connected-react-router';

const reducer = history =>
  combineReducers({
    search,
    flight,
    util,
    router: connectRouter(history),
  });

export default reducer;
