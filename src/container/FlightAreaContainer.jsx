import { connect } from 'react-redux';
import FlightArea from '../components/FlightArea';
import {
  createSessionSaga,
  getLiveSearchSaga,
  setFilterWaySaga,
  filterLiveSearchSaga,
} from '../redux/modules/flight';

export default connect(
  state => ({
    session: state.flight.session,
    direct: state.flight.filter.direct,
    via: state.flight.filter.via,
    directDisable: state.flight.filter.directDisable,
    viaDisable: state.flight.filter.viaDisable,
    originDatas: state.flight.originDatas,
    filterDatas: state.flight.filterDatas,
  }),

  dispatch => ({
    createSession: requestBody => {
      dispatch(createSessionSaga(requestBody));
    },
    getLiveSearch: () => {
      dispatch(getLiveSearchSaga());
    },
    // 필요한지 고민중...
    selectWays: (id, status) => {
      dispatch(setFilterWaySaga({ id, status }));
    },
    changeFilterDatas: filterDatas => {
      dispatch(filterLiveSearchSaga(filterDatas));
    },
  }),
)(FlightArea);
