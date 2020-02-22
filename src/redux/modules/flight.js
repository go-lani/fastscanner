import { put, call, takeLatest, select, delay } from 'redux-saga/effects';
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
  const prevSessionId = yield select(state => state.flight.session);
  const nonStops = yield select(state => state.search.nonStops);

  try {
    yield put(
      pending({
        progress: {
          per: 0,
          all: 0,
          complete: 0,
        },
        filter: {
          direct: true,
          via: nonStops ? false : true,
        },
      }),
    );
    const res = yield call(FlightService.createSession, payload);
    const sessionId = res.headers.location.split('/').pop();

    if (prevSessionId !== sessionId) {
      yield put(success({ originDatas: [], pageIndex: 0 }));
      // yield put(success({ pageIndex: 0 }));
    }
    yield put(success({ session: sessionId }));
  } catch (error) {
    yield put(fail(error));
  }
}

// 데이터 요청
export const getLiveSearchSaga = createAction('GET_LIVESEARCH_SAGA');

function* getLiveSearch({ payload }) {
  const session = yield select(state => state.flight.session);
  const pageIndex = yield select(state => state.flight.pageIndex);
  const filterOptions = yield select(state => state.flight.filterOptions);

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'x-rapidapi-key': process.env.REACT_APP_SKYSCANNER_API_KEY,
  };

  const params = {
    sortType: 'price',
    sortOrder: 'asc',
    pageIndex: `${pageIndex}`,
    pageSize: '100',
  };

  function getInfo(legs, id) {
    return legs.filter(leg => leg.Id === id)[0];
  }

  function getStops(places, info) {
    return info.Stops.map(stop => {
      const stopInfo = {};

      const { Name: name, ParentId: cityId } = places.find(
        place => place.Id === stop,
      );

      const { ParentId: countryId } = places.find(place => place.Id === cityId);
      const { Name: countryName } = places.find(
        place => place.Id === countryId,
      );

      stopInfo.name = name;
      stopInfo.countryName = countryName;

      return stopInfo;
    });
  }

  function getAirLine(carriers, info) {
    return info.Carriers.map(carrierId => {
      const airline = {
        name: null,
        imgUrl: null,
      };

      const { Name, ImageUrl } = carriers.find(
        carrier => carrier.Id === carrierId,
      );

      airline.name = Name;
      airline.imgUrl = ImageUrl;

      return airline;
    });
  }

  try {
    if (!session || pageIndex === 'lastIndex') return yield put(success());
    yield put(
      pending({
        progress: {
          per: 0,
          all: 0,
          complete: 0,
        },
      }),
    );
    if (!pageIndex) {
      while (true) {
        const res = yield call(FlightService.getLiveData, {
          session,
          headers,
          params,
        });

        const agentLength = res.Agents.length;
        const completeLength = res.Agents.filter(
          agent => agent.Status === 'UpdatesComplete',
        ).length;

        yield put(
          pending({
            progress: {
              per: Math.floor((completeLength / agentLength) * 100),
              all: agentLength,
              complete: completeLength,
            },
          }),
        );

        if (res.Status === 'UpdatesComplete') {
          const ListItem = [];

          res.Itineraries.forEach(itinerary => {
            // 출국 정보
            const outBoundInfo = getInfo(res.Legs, itinerary.OutboundLegId);

            // 출국 경유지 정보
            const outBoundStops = getStops(res.Places, outBoundInfo);

            // 출국 항공기 정보
            const outBoundAirlines = getAirLine(res.Carriers, outBoundInfo);

            // 입국 정보
            const inBoundInfo = itinerary.InboundLegId
              ? getInfo(res.Legs, itinerary.InboundLegId)
              : null;

            // 입국 경유지 정보
            const inBoundStops = itinerary.InboundLegId
              ? getStops(res.Places, inBoundInfo)
              : null;

            // 입국 항공기 정보
            const inBoundAirlines = itinerary.InboundLegId
              ? getAirLine(res.Carriers, inBoundInfo)
              : null;

            ListItem.push({
              Outbound: {
                ...outBoundInfo,
                StopsInfo: outBoundStops,
                AirlinesInfo: outBoundAirlines,
              },
              Inbound: itinerary.InboundLegId
                ? {
                    ...inBoundInfo,
                    StopsInfo: inBoundStops,
                    AirlinesInfo: inBoundAirlines,
                  }
                : null,
              price: Math.floor(itinerary.PricingOptions[0].Price)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ','),
              agentUrl: itinerary.PricingOptions[0].DeeplinkUrl,
              amount: itinerary.PricingOptions.length,
            });
          });

          console.log(filterOptions, 'filterOptions');
          if (filterOptions && filterOptions.Outbound) {
            console.log(filterOptions, '있다');
          } else {
            console.log(filterOptions, '없다');
          }

          yield put(
            success({
              originDatas: ListItem,
              renderDatas: ListItem.slice(0, 5),
              pageIndex: pageIndex + 1,
            }),
          );
          return;
        }
      }
    }
  } catch (error) {
    yield put(fail(error));
  }
}

// 렌더링 데이터
export const renderLiveSearchSaga = createAction('RENDER_LIVESEARCH_SAGA');

function* renderLiveSearch({ payload }) {
  const originDatas = yield select(state => state.flight.originDatas);
  const renderDatas = yield select(state => state.flight.renderDatas);
  const pageIndex = yield select(state => state.flight.pageIndex);

  if (!originDatas || originDatas.length === renderDatas.length)
    return yield put(success({ pageIndex: 'lastIndex' }));

  const newDatas = originDatas.slice(pageIndex * 5, (pageIndex + 1) * 5);

  try {
    yield delay(600);
    yield put(
      success({
        renderDatas: [...renderDatas, ...newDatas],
        pageIndex: pageIndex + 1,
      }),
    );
  } catch (error) {
    yield put(fail(error));
  }
}

// 필터 데이터
// 필터 여부 체크
export const setFilterOptionsSaga = createAction('SET_FILTER_OPTIONS_SAGA');

function* setFilterOptions({ payload }) {
  const filterOptions = yield select(state => state.flight.filterOptions);
  try {
    yield put(
      success({
        filterOptions: {
          ...filterOptions,
          ...payload,
        },
      }),
    );
  } catch (error) {
    yield put(fail(error));
  }
}

export const setFilterWaySaga = createAction('SET_FILTERWAY_SAGA');

function* setFilterWay({ payload }) {
  const filter = yield select(state => state.flight.filter);
  try {
    yield put(pending());
    if (payload.id === 'direct') {
      yield put(
        success({
          filter: {
            ...filter,
            direct: payload.status,
          },
        }),
      );
    } else {
      yield put(
        success({
          filter: {
            ...filter,
            via: payload.status,
          },
        }),
      );
    }
  } catch (error) {
    yield put(fail(error));
  }
}

export const filterLiveSearchSaga = createAction('FILTER_LIVERSEARCH_SAGA');

function* filterLiveSearch({ payload }) {
  const originDatas = yield select(state => state.flight.originDatas);
  const nonStops = yield select(state => state.flight.nonStops);
  try {
    yield put(pending());
    yield put(success({ filterDatas: payload }));
  } catch (error) {
    yield put(fail(error));
  }
}

export function* flightSaga() {
  yield takeLatest('GET_SESSION_SAGA', createSession);
  yield takeLatest('GET_LIVESEARCH_SAGA', getLiveSearch);
  yield takeLatest('RENDER_LIVESEARCH_SAGA', renderLiveSearch);
  yield takeLatest('FILTER_LIVESEARCH_SAGA', filterLiveSearch);
  yield takeLatest('SET_FILTER_OPTIONS_SAGA', setFilterOptions);
  yield takeLatest('SET_FILTERWAY_SAGA', setFilterWay);
}

const initialState = {
  session: null,
  loading: false,
  error: null,
  progress: {
    per: 0,
    all: 0,
    complete: 0,
  },
  pageIndex: 0,
  filter: {
    direct: 0,
    via: 0,
  },
};

const flight = handleActions(
  {
    PENDING: (state, action) => ({
      ...state,
      ...action.payload,
      loading: true,
      error: null,
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
