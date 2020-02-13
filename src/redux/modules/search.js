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

// 출발지/도착지 선택
export const setChangeWaySaga = createAction('SET_CHANGE_WAY_SAGA');
export const setOriginSearchSaga = createAction('SET_ORIGIN_SEARCH_SAGA');
export const setOriginSelectSaga = createAction('SET_ORIGIN_SELECT_SAGA');
export const setDestinationSearchSaga = createAction(
  'SET_DESTINATION_SEARCH_SAGA',
);
export const setDestinationSelectSaga = createAction(
  'SET_DESTINATION_SELECT_SAGA',
);

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
export const setClassSaga = createAction('SET_CLASS_SAGA');
export const setAdultsSaga = createAction('SET_ADULTS_SAGA');
export const setChildrenSaga = createAction('SET_CHILDREN_SAGA');

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
export const setOutDateSaga = createAction('SET_OUTDATE_SAGA');
export const setInDateSaga = createAction('SET_INDATE_SAGA');

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
  yield takeLatest('SET_CHANGE_WAY_SAGA', selectWaySaga);
  yield takeLatest('SET_CLASS_SAGA', selectClassSaga);
  yield takeLatest('SET_ADULTS_SAGA', selectAdultsSaga);
  yield takeLatest('SET_CHILDREN_SAGA', selectChildrenSaga);
  yield takeLatest('SET_OUTDATE_SAGA', selectOutDateSaga);
  yield takeLatest('SET_INDATE_SAGA', selectInDateSaga);
  yield takeLatest('SET_ORIGIN_SEARCH_SAGA', searchOriginSaga);
  yield takeLatest('SET_ORIGIN_SELECT_SAGA', selectOriginSaga);
  yield takeLatest('SET_DESTINATION_SEARCH_SAGA', searchDestinationSaga);
  yield takeLatest('SET_DESTINATION_SELECT_SAGA', selectDestinationSaga);
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
