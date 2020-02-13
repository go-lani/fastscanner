import { all } from 'redux-saga/effects';
import { searchSaga } from './search';
import { flightSaga } from './flight';

export default function* rootSaga() {
  yield all([searchSaga(), flightSaga()]);
}
