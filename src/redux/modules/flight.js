import moment from 'moment';
import { put, call, takeLatest, select, delay } from 'redux-saga/effects';
import { createAction, createActions, handleActions } from 'redux-actions';
import { cloneDeep } from 'lodash';
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
  try {
    yield put(
      pending({
        progress: {
          per: 0,
          all: 0,
          complete: 0,
        },
      }),
    );
    const res = yield call(FlightService.createSession, payload);
    const sessionId = res.headers.location.split('/').pop();

    if (prevSessionId !== sessionId) {
      yield put(
        success({
          originDatas: [],
          renderDatas: null,
          pageIndex: 0,
          filterDatas: null,
        }),
      );
    }
    yield put(success({ session: sessionId }));
  } catch (error) {
    yield put(fail(error));
  }
}

export const mainLiveSearchSaga = createAction('MAIN_LIVESEARCH_SAGA');

function* fetchLiveSearch() {
  yield call(getLiveSearch, 'payload');
  yield call(filterLiveSearch, 'payload');
}

function* mainLiveSearch() {
  yield call(fetchLiveSearch);
}

// 데이터 요청
function* getLiveSearch({ payload }) {
  const nonStops = yield select(state => state.search.nonStops);
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
    pageSize: '999',
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
        pendingDatas: [null, null, null, null, null],
      }),
    );
    if (!pageIndex) {
      const allPendingData = [];
      let pendingDatas = [];
      while (true) {
        const res = yield call(FlightService.getLiveData, {
          session,
          headers,
          params,
        });

        const agentLength = res.Agents.length;
        const completeAgents = res.Agents.filter(
          agent => agent.Status === 'UpdatesComplete',
        );
        const completeLength = res.Agents.filter(
          agent => agent.Status === 'UpdatesComplete',
        ).length;

        if (res.Status !== 'UpdatesComplete') {
          let pendingItineraries = [];

          completeAgents.forEach(agent => {
            const completeItineraries = res.Itineraries.filter(
              itinerary => itinerary.PricingOptions[0].Agents[0] === agent.Id,
            );
            if (completeItineraries.length)
              pendingItineraries = completeItineraries;
          });

          pendingItineraries.forEach(itinerary => {
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

            allPendingData.push({
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
              price: Math.floor(itinerary.PricingOptions[0].Price).toString(),
              agentUrl: itinerary.PricingOptions[0].DeeplinkUrl,
              amount: itinerary.PricingOptions.length,
            });
          });
        }

        if (allPendingData.length >= 5) {
          allPendingData.sort((pre, cur) => +pre.price - +cur.price);
          pendingDatas = allPendingData.slice(0, 5);
        } else if (allPendingData.length < 5) {
          pendingDatas.unshift(...allPendingData);
        }

        yield put(
          pending({
            progress: {
              per: Math.floor((completeLength / agentLength) * 100),
              all: agentLength,
              complete: completeLength,
            },
            pendingDatas,
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
              price: Math.floor(itinerary.PricingOptions[0].Price).toString(),
              agentUrl: itinerary.PricingOptions[0].DeeplinkUrl,
              amount: itinerary.PricingOptions.length,
            });
          });

          yield put(
            success({
              originDatas: ListItem,
              renderDatas: ListItem.slice(0, 5),
              filterOptions: {
                ...filterOptions,
                direct: true,
                via: !nonStops,
                Duration: null,
              },
              pendingDatas: [],
            }),
          );
          return;
        }
      }
    }
  } catch (error) {
    yield put(fail(error));
    console.log(error);
  }
}

// 렌더링 데이터
export const renderLiveSearchSaga = createAction('RENDER_LIVESEARCH_SAGA');

function* renderLiveSearch({ payload }) {
  const originDatas = yield select(state => state.flight.originDatas);
  const filterDatas = yield select(state => state.flight.filterDatas);
  const renderDatas = yield select(state => state.flight.renderDatas);
  const pageIndex = yield select(state => state.flight.pageIndex);

  try {
    if (filterDatas) {
      if (filterDatas.length === renderDatas.length)
        return yield put(success({ pageIndex: 'lastIndex' }));

      const newFilterDatas = filterDatas.slice(
        pageIndex * 5,
        (pageIndex + 1) * 5,
      );

      yield delay(600);

      yield put(
        success({
          renderDatas: [...renderDatas, ...newFilterDatas],
          pageIndex: pageIndex + 1,
        }),
      );
    } else {
      if (
        !originDatas ||
        (originDatas && originDatas.length) ===
          (renderDatas && renderDatas.length)
      )
        return yield put(success({ pageIndex: 'lastIndex' }));

      const newOriginDatas = originDatas.slice(
        pageIndex * 5,
        (pageIndex + 1) * 5,
      );

      yield delay(600);

      yield put(
        success({
          renderDatas: [...renderDatas, ...newOriginDatas],
          pageIndex: pageIndex + 1,
        }),
      );
    }
  } catch (error) {
    yield put(fail(error));
    console.log(error);
  }
}

// 필터 데이터 로직

// 필터 여부 체크
export const setFilterOptionsSaga = createAction('SET_FILTER_OPTIONS_SAGA');

function* setFilterOptions({ payload }) {
  const filterOptions = yield select(state => state.flight.filterOptions);
  try {
    yield put(pending());
    yield put(
      success({
        filterOptions: {
          ...filterOptions,
          ...payload,
          filterUpdate: payload.sortBy ? false : true,
        },
        pageIndex: 0,
      }),
    );
  } catch (error) {
    yield put(fail(error));
    console.log(error);
  }
}

// 필터 데이터 렌더링
export const filterLiveSearchSaga = createAction('FILTER_LIVESEARCH_SAGA');

function* filterLiveSearch({ payload }) {
  const way = yield select(state => state.search.way);
  const originDatas = yield select(state => state.flight.originDatas);
  const filterOptions = yield select(state => state.flight.filterOptions);
  const pageIndex = yield select(state => state.flight.pageIndex);
  let newFilterDatas = null;
  let sortFilterDatas = null;
  let directDisable = filterOptions.directDisable;
  let viaDisable = filterOptions.viaDisable;
  let direct = filterOptions.direct;
  let via = filterOptions.via;

  try {
    if (filterOptions.filterUpdate) yield delay(700);
    yield put(
      pending({
        filterDatas: originDatas,
      }),
    );
    const filterDatas = yield select(state => state.flight.filterDatas);

    if (!filterDatas) return;

    if (filterOptions.sortBy === 'price') {
      sortFilterDatas = cloneDeep(filterDatas).sort(
        (pre, cur) => pre.price - cur.price,
      );
    } else if (filterOptions.sortBy === 'duration') {
      sortFilterDatas = cloneDeep(filterDatas).sort(
        (pre, cur) =>
          pre.Outbound.Duration +
          (pre.Inbound ? pre.Inbound.Duration : 0) -
          (cur.Outbound.Duration + (cur.Inbound ? cur.Inbound.Duration : 0)),
      );
    } else {
      sortFilterDatas = cloneDeep(filterDatas).sort(
        (pre, cur) =>
          Math.floor(pre.price / 10000) * 5 +
          (
            (pre.Outbound.Duration + (pre.Inbound ? pre.Inbound.Duration : 0)) /
            60
          ).toFixed(1) *
            4 +
          (pre.Outbound.Stops.length +
            (pre.Inbound ? pre.Inbound.Stops.length : 0)) *
            20 -
          (Math.floor(cur.price / 10000) * 5 +
            (
              (cur.Outbound.Duration +
                (cur.Inbound ? cur.Inbound.Duration : 0)) /
              60
            ).toFixed(1) *
              4 +
            (cur.Outbound.Stops.length +
              (cur.Inbound ? cur.Inbound.Stops.length : 0)) *
              20),
      );
    }
    // 직항 필터링
    const DirectData = way => {
      let DirectDatas = [];
      let ViaDatas = [];

      if (way === 'round') {
        // 왕복
        DirectDatas = sortFilterDatas.filter(
          data =>
            data.Outbound.Stops.length === 0 && data.Inbound.Stops.length === 0,
        );

        ViaDatas = sortFilterDatas.filter(
          data =>
            data.Outbound.Stops.length !== 0 || data.Inbound.Stops.length !== 0,
        );
      } else {
        // 편도
        DirectDatas = sortFilterDatas.filter(
          data => data.Outbound.Stops.length === 0,
        );

        ViaDatas = sortFilterDatas.filter(
          data => data.Outbound.Stops.length !== 0,
        );
      }

      return DirectDatas.length
        ? {
            DirectDatas: filterOptions.direct
              ? !filterOptions.via
                ? DirectDatas
                : sortFilterDatas
              : null,
            directDisable: DirectDatas.length === 0 ? true : false,
            viaDisable: ViaDatas.length === 0 ? true : false,
            direct: filterOptions.direct && DirectDatas.length,
            via: filterOptions.via && ViaDatas.length,
          }
        : {
            DirectDatas: ViaDatas,
            directDisable: DirectDatas.length === 0 ? true : false,
            viaDisable: ViaDatas.length === 0 ? true : false,
            direct: filterOptions.direct && DirectDatas.length,
            via: filterOptions.via || ViaDatas.length,
          };
    };

    // 경유 필터링
    const ViaData = way => {
      let DirectDatas = [];
      let ViaDatas = [];

      if (way === 'round') {
        // 왕복
        DirectDatas = sortFilterDatas.filter(
          data =>
            data.Outbound.Stops.length === 0 && data.Inbound.Stops.length === 0,
        );

        ViaDatas = sortFilterDatas.filter(
          data =>
            data.Outbound.Stops.length !== 0 || data.Inbound.Stops.length !== 0,
        );
      } else {
        // 편도
        DirectDatas = sortFilterDatas.filter(
          data => data.Outbound.Stops.length === 0,
        );

        ViaDatas = sortFilterDatas.filter(
          data => data.Outbound.Stops.length !== 0,
        );
      }

      return ViaDatas.length
        ? {
            ViaDatas: filterOptions.via
              ? !filterOptions.direct
                ? ViaDatas
                : sortFilterDatas
              : null,
            directDisable: !DirectDatas.length,
            viaDisable: !ViaDatas.length,
            direct: filterOptions.direct && DirectDatas.length,
            via: filterOptions.via && ViaDatas.length,
          }
        : {
            ViaDatas: ViaDatas,
            directDisable: !DirectDatas.length,
            viaDisable: !ViaDatas.length,
            direct: filterOptions.direct && DirectDatas.length,
            via: filterOptions.via && ViaDatas.length,
          };
    };

    if (filterOptions.direct) {
      if (filterOptions.via) {
        const {
          DirectDatas,
          directDisable: dDisable,
          viaDisable: vDisable,
          direct: d,
          via: v,
        } = DirectData(way);
        newFilterDatas = DirectDatas;
        directDisable = dDisable;
        viaDisable = vDisable;
        direct = d;
        via = v;
      } else {
        const {
          DirectDatas,
          directDisable: dDisable,
          viaDisable: vDisable,
          direct: d,
          via: v,
        } = DirectData(way);
        newFilterDatas = DirectDatas;
        directDisable = dDisable;
        viaDisable = vDisable;
        direct = d;
        via = v;
      }
    } else {
      if (filterOptions.via) {
        const {
          ViaDatas,
          directDisable: dDisable,
          viaDisable: vDisable,
          direct: d,
          via: v,
        } = ViaData(way);
        newFilterDatas = ViaDatas;
        directDisable = dDisable;
        viaDisable = vDisable;
        direct = d;
        via = v;
      } else {
        newFilterDatas = [];
        directDisable = filterOptions.directDisable ? true : false;
        viaDisable = filterOptions.viaDisable ? true : false;
        direct = false;
        via = false;
      }
    }

    const regexr = /^24/;
    if (filterOptions.OutBound) {
      if (newFilterDatas) {
        newFilterDatas = newFilterDatas.filter(data => {
          return filterOptions.OutBound.start <=
            moment(data.Outbound.Departure)
              .format('kk:mm')
              .split(':')
              .join('')
              .replace(regexr, '00') &&
            filterOptions.OutBound.end >=
              moment(data.Outbound.Departure)
                .format('kk:mm')
                .split(':')
                .join('')
                .replace(regexr, '00')
            ? data
            : null;
        });
      } else {
        newFilterDatas = filterDatas.filter(data => {
          return filterOptions.OutBound.start <=
            moment(data.Outbound.Departure)
              .format('kk:mm')
              .split(':')
              .join('')
              .replace(regexr, '00') &&
            filterOptions.OutBound.end >=
              moment(data.Outbound.Departure)
                .format('kk:mm')
                .split(':')
                .join('')
                .replace(regexr, '00')
            ? data
            : null;
        });
      }
    }

    if (filterOptions.InBound) {
      if (newFilterDatas) {
        newFilterDatas = newFilterDatas.filter(data => {
          return filterOptions.InBound.start <=
            moment(data.Inbound.Departure)
              .format('kk:mm')
              .split(':')
              .join('') &&
            filterOptions.InBound.end >=
              moment(data.Inbound.Departure)
                .format('kk:mm')
                .split(':')
                .join('')
            ? data
            : null;
        });
      } else {
        newFilterDatas = filterDatas.filter(data => {
          return filterOptions.InBound.start <=
            moment(data.Inbound.Departure)
              .format('kk:mm')
              .split(':')
              .join('') &&
            filterOptions.InBound.end >=
              moment(data.Inbound.Departure)
                .format('kk:mm')
                .split(':')
                .join('')
            ? data
            : null;
        });
      }
    }

    if (filterOptions.Duration) {
      if (newFilterDatas) {
        newFilterDatas = newFilterDatas.filter(data => {
          return (data.Inbound && data.Inbound.Duration
            ? data.Outbound.Duration + data.Inbound.Duration
            : data.Outbound.Duration) <= filterOptions.Duration
            ? data
            : null;
        });
      } else {
        newFilterDatas = filterDatas.filter(data => {
          return (data.Inbound && data.Inbound.Duration
            ? data.Outbound.Duration + data.Inbound.Duration
            : data.Outbound.Duration) <= filterOptions.Duration
            ? data
            : null;
        });
      }
    }

    const newRenderDatas = newFilterDatas.slice(
      pageIndex * 5,
      (pageIndex + 1) * 5,
    );

    yield put(
      success({
        pageIndex: pageIndex + 1,
        filterDatas: newFilterDatas,
        renderDatas: newRenderDatas,
        filterOptions: {
          ...filterOptions,
          direct: direct,
          via: via,
          directDisable,
          viaDisable,
          filterUpdate: false,
        },
      }),
    );
  } catch (error) {
    yield put(fail(error));
    console.log(error);
  }
}

export function* flightSaga() {
  yield takeLatest('GET_SESSION_SAGA', createSession);
  yield takeLatest('RENDER_LIVESEARCH_SAGA', renderLiveSearch);
  yield takeLatest('FILTER_LIVESEARCH_SAGA', filterLiveSearch);
  yield takeLatest('SET_FILTER_OPTIONS_SAGA', setFilterOptions);
  yield takeLatest('MAIN_LIVESEARCH_SAGA', mainLiveSearch);
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
  filterOptions: {
    direct: true,
    via: false,
    directDisable: false,
    viaDisable: false,
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
