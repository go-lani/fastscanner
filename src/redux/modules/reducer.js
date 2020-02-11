import { combineReducers } from 'redux';
import search from './search';
import { connectRouter } from 'connected-react-router';

const reducer = history =>
  combineReducers({
    search,
    router: connectRouter(history),
  });

export default reducer;
