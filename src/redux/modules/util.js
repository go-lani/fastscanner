import { put, takeLatest } from 'redux-saga/effects';
import { createAction, createActions, handleActions } from 'redux-actions';

const options = {
  prefix: 'fastscanner/Util',
  namespace: '/',
};

const { success, pending, fail } = createActions(
  {
    SUCCESS: util => ({ util }),
  },
  'PENDING',
  'FAIL',
  options,
);

// 데이터 요청
export const getDeviceSaga = createAction('GET_DEVICE_SAGA');

function* getDevice({ payload }) {
  try {
    yield put(pending());

    yield put(success({ device: payload }));
  } catch (error) {
    yield put(fail(error));
  }
}

export function* utilSaga() {
  yield takeLatest('GET_DEVICE_SAGA', getDevice);
}

const initialState = {
  device: null,
  loading: false,
  error: null,
};

const util = handleActions(
  {
    PENDING: (state, action) => ({
      ...state,
      loading: true,
      error: null,
    }),
    SUCCESS: (state, action) => {
      return {
        ...state,
        ...action.payload.util,
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

export default util;
