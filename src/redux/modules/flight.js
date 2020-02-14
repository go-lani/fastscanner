import { put, call, takeLatest } from 'redux-saga/effects';
import { createAction, createActions, handleActions } from 'redux-actions';
// import FlightService from '../../service/FlightService';

const options = {
  prefix: 'fastscanner/Flight',
  namespace: '/',
};

const { success, pending, fail } = createActions(
  {
    SUCCESS: flight => ({ flight }),
  },
  'PENDING',
  'FAIL',
  options,
);

// 세션 생성 및 Live데이터 가져오기
export const getFlightDataSaga = createAction('GET_FLIGHT_DATA');

function* loadFlightData({ payload }) {
  console.log('saga', payload);
  try {
    yield put(pending());
    // const res = yield call(FlightService.createSession, payload);
    // console.log(res);
  } catch (error) {
    yield put(fail(error));
  }
}

export function* flightSaga() {
  yield takeLatest('GET_FLIGHT_DATA', loadFlightData);
}

const initialState = {
  session: null,
  data: [],
  loading: false,
  error: null,
};

const flight = handleActions(
  {
    PEDNING: (state, action) => ({
      ...state,
      loading: true,
      error: null,
    }),
    SUCCESS: (state, action) => {
      return {
        ...state,
        ...action.payload.search,
        loading: false,
        error: null,
      };
    },
    FAIL: (state, action) => ({
      ...state,
      loading: false,
      error: action.paload,
    }),
  },
  initialState,
  options,
);

export default flight;
