import { put, call, takeLatest, select } from 'redux-saga/effects';
import { createAction, createActions, handleActions } from 'redux-actions';
import FlightService from '../../service/FlightService';

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

// 세션 생성
export const createSessionSaga = createAction('GET_SESSION_SAGA');

function* createSession({ payload }) {
  try {
    yield put(pending(0));
    const res = yield call(FlightService.createSession, payload);
    const sessionId = res.headers.location.split('/').pop();
    yield put(success({ session: sessionId }));
  } catch (error) {
    yield put(fail(error));
  }
}

// 데이터 요청
export const getLiveSearchSaga = createAction('GET_LIVESEARCH_SAGA');

function* getLiveSearch({ payload }) {
  const session = yield select(state => state.flight.session);
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'x-rapidapi-key': process.env.REACT_APP_SKYSCANNER_API_KEY,
  };
  const params = {
    sortType: 'price',
    pageIndex: '1',
    pageSize: '10',
  };

  try {
    yield put(pending(0));

    while (true) {
      const res = yield call(FlightService.getLiveData, {
        session,
        headers,
        params,
      });

      console.log('while', res);

      const agentLength = res.Agents.length;
      const compoleteLength = res.Agents.filter(
        agent => agent.Status === 'UpdatesComplete',
      ).length;

      yield put(pending(Math.floor((compoleteLength / agentLength) * 100)));

      console.log('PENDING', res);

      if (res.Status === 'UpdatesComplete') {
        console.log('COMPLETED');
        console.log('COMPLETED', res);
        console.log(agentLength, compoleteLength);
        yield put(success());
        // setCompleted(100);
        return;
      }
    }

    // 가공
  } catch (error) {
    yield put(fail(error));
  }
}

export function* flightSaga() {
  yield takeLatest('GET_SESSION_SAGA', createSession);
  yield takeLatest('GET_LIVESEARCH_SAGA', getLiveSearch);
}

const initialState = {
  session: null,
  data: [],
  loading: false,
  error: null,
  progress: 0,
};

const flight = handleActions(
  {
    PENDING: (state, action) => ({
      ...state,
      loading: true,
      error: null,
      progress: action.payload,
    }),
    SUCCESS: (state, action) => {
      return {
        ...state,
        ...action.payload.flight,
        loading: false,
        error: null,
      };
    },
    FAIL: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),
  },
  initialState,
  options,
);

export default flight;
