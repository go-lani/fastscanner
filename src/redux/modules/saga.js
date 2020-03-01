import { all } from 'redux-saga/effects';
import { utilSaga } from './util';
import { searchSaga } from './search';
import { flightSaga } from './flight';

export default function* rootSaga() {
  yield all([utilSaga(), searchSaga(), flightSaga()]);
}
