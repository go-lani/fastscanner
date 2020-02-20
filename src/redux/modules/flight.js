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
  const prevSessionId = yield select(state => state.flight.session);
  try {
    yield put(pending(0));
    const res = yield call(FlightService.createSession, payload);
    const sessionId = res.headers.location.split('/').pop();

    if (prevSessionId !== sessionId) {
      yield put(success({ datas: [] }));
      yield put(success({ pageIndex: 0 }));
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
  const datas = yield select(state => state.flight.datas);
  const pageIndex = yield select(state => state.flight.pageIndex);

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'x-rapidapi-key': process.env.REACT_APP_SKYSCANNER_API_KEY,
  };

  const params = {
    sortType: 'price',
    sortOrder: 'asc',
    pageIndex: `${pageIndex}`,
    pageSize: '5',
  };

  function getInfo(legs, id) {
    return legs.filter(leg => leg.Id === id)[0];
  }

  function getStops(places, info) {
    return info.Stops.map(stop => {
      const stopInfo = {};

      const { Name: name, ParentId: countryId } = places.find(
        place => place.Id === stop,
      );

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
    yield put(pending(0));

    while (true) {
      const res = yield call(FlightService.getLiveData, {
        session,
        headers,
        params,
      });

      const agentLength = res.Agents.length;
      const compoleteLength = res.Agents.filter(
        agent => agent.Status === 'UpdatesComplete',
      ).length;

      yield put(pending(Math.floor((compoleteLength / agentLength) * 100)));

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
              StopsName: outBoundStops,
              AirlinesInfo: outBoundAirlines,
            },
            Inbound: itinerary.InboundLegId
              ? {
                  ...inBoundInfo,
                  StopsName: inBoundStops,
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

        const newDatas = [...datas, ...ListItem];

        if (datas.length !== newDatas.length) {
          yield put(
            success({
              datas: [...datas, ...ListItem],
              pageIndex: pageIndex + 1,
            }),
          );
        } else {
          yield put(success({ pageIndex: 'lastIndex' }));
        }
        return;
      }
    }
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
  loading: false,
  error: null,
  progress: 0,
  pageIndex: 0,
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
