import { createStore, applyMiddleware } from 'redux';
import reducer from './modules/reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './modules/saga';

export const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();

const create = () => {
  const store = createStore(
    reducer(history),
    {
      search: {
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
        way: 'round',
        originSearch: [],
        originName: '인천(ICN)',
        destinationSearch: [],
        destinationName: null,
      },
    },
    composeWithDevTools(
      applyMiddleware(routerMiddleware(history), sagaMiddleware),
    ),
  );

  sagaMiddleware.run(rootSaga);

  return store;
};

export default create;
