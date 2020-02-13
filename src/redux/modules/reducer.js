import { combineReducers } from 'redux';
import search from './search';
import flight from './flight';
import { connectRouter } from 'connected-react-router';

const reducer = history =>
  combineReducers({
    search,
    flight,
    router: connectRouter(history),
  });

export default reducer;
