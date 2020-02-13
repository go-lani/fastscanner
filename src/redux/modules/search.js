import { put, select, call, takeLatest } from 'redux-saga/effects';
import { createAction, createActions, handleActions } from 'redux-actions';
import SearchService from '../../service/SearchService';

const options = {
  prefix: 'fastscanner/SearchArea',
  namespace: '/',
};

const { success, pending, fail } = createActions(
  {
    SUCCESS: search => ({ search }),
  },
  'PENDING',
  'FAIL',
  options,
);

// 왕복 선택
export const changeWaySaga = createAction('CHANGE_WAY_SAGA');
export const originSearchSaga = createAction('ORIGIN_SEARCH_SAGA');
export const originSelectSaga = createAction('ORIGIN_SELECT_SAGA');
export const destinationSearchSaga = createAction('DESTINATION_SEARCH_SAGA');
export const destinationSelectSaga = createAction('DESTINATION_SELECT_SAGA');

function* searchOriginSaga({ payload }) {
  try {
    yield put(pending());

    if (payload === '') return yield put(success({ originSearch: [] }));

    const { data } = yield call(SearchService.originSearch, payload);

    const newData = data.filter(
      list =>
        list.PlaceId !== list.CountryId && list.PlaceName !== list.CityName,
    );

    if (newData.length) yield put(success({ originSearch: newData }));
    else yield put(success({ originSearch: [] }));
  } catch (error) {
    yield put(fail(error));
  }
}

function* selectOriginSaga({ payload }) {
  try {
    yield put(pending());
    yield put(
      success({
        originPlace: `${payload.PlaceId}-sky`,
        originName: `${payload.PlaceName}(${payload.PlaceId})`,
      }),
    );
  } catch (error) {
    yield put(fail(error));
  }
}

function* searchDestinationSaga({ payload }) {
  try {
    yield put(pending());

    if (payload === '') return yield put(success({ destinationSearch: [] }));

    const { data } = yield call(SearchService.destinationSearch, payload);

    const newData = data.filter(
      list =>
        list.PlaceId !== list.CountryId && list.PlaceName !== list.CityName,
    );

    if (newData.length) yield put(success({ destinationSearch: newData }));
    else yield put(success({ destinationSearch: [] }));
  } catch (error) {
    yield put(fail(error));
  }
}

function* selectDestinationSaga({ payload }) {
  try {
    yield put(pending());
    yield put(
      success({
        destinationPlace: `${payload.PlaceId}-sky`,
        destinationName: `${payload.PlaceName}(${payload.PlaceId})`,
      }),
    );
  } catch (error) {
    yield put(fail(error));
  }
}

function* selectWaySaga({ payload }) {
  try {
    yield put(pending());
    yield put(success({ way: payload }));
  } catch (error) {
    console.log(error);
    yield put(fail(error));
  }
}

// 좌석등급 & 승객
export const getClassSaga = createAction('GET_CLASS_SAGA');
export const getAdultsSaga = createAction('GET_ADULTS_SAGA');
export const getChildrenSaga = createAction('GET_CHILDREN_SAGA');

function* selectClassSaga({ payload }) {
  try {
    yield put(pending());
    yield put(success({ cabinClass: payload }));
  } catch (error) {
    console.log(error);
    yield put(fail(error));
  }
}

function* selectAdultsSaga({ payload }) {
  try {
    yield put(pending());
    yield put(success({ adults: payload }));
  } catch (error) {
    console.log(error);
    yield put(fail(error));
  }
}

function* selectChildrenSaga({ payload }) {
  try {
    yield put(pending());
    yield put(success({ children: payload }));
  } catch (error) {
    console.log(error);
    yield put(fail(error));
  }
}

// 출국날짜 & 입국날짜
export const getOutDateSaga = createAction('GET_OUTDATE_SAGA');
export const getInDateSaga = createAction('GET_INDATE_SAGA');

function* selectOutDateSaga({ payload }) {
  try {
    yield put(pending());
    yield put(success({ outboundDate: payload }));
  } catch (error) {
    yield put(fail(error));
  }
}

function* selectInDateSaga({ payload }) {
  try {
    yield put(pending());
    yield put(success({ inboundDate: payload }));
  } catch (error) {
    yield put(fail(error));
  }
}

export function* searchSaga() {
  yield takeLatest('CHANGE_WAY_SAGA', selectWaySaga);
  yield takeLatest('GET_CLASS_SAGA', selectClassSaga);
  yield takeLatest('GET_ADULTS_SAGA', selectAdultsSaga);
  yield takeLatest('GET_CHILDREN_SAGA', selectChildrenSaga);
  yield takeLatest('GET_OUTDATE_SAGA', selectOutDateSaga);
  yield takeLatest('GET_INDATE_SAGA', selectInDateSaga);
  yield takeLatest('ORIGIN_SEARCH_SAGA', searchOriginSaga);
  yield takeLatest('ORIGIN_SELECT_SAGA', selectOriginSaga);
  yield takeLatest('DESTINATION_SEARCH_SAGA', searchDestinationSaga);
  yield takeLatest('DESTINATION_SELECT_SAGA', selectDestinationSaga);
}

// initialState
const initialState = {
  country: 'KR',
  currency: 'KRW',
  locale: 'ko-KR',
  originPlace: 'ICN-sky',
  destinationPlace: null,
  outboundDate: '',
  inboundDate: '',
  adults: 1,
  cabinClass: 'economy',
  children: null,
  stops: 1,
  loading: false,
  error: null,
  way: 'round',
  originSearch: [],
  originName: '인천(ICN)',
  destinationSearch: [],
  destinationName: null,
};

// reducer
const search = handleActions(
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

export default search;
