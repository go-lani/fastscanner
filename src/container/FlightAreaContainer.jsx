import { connect } from 'react-redux';
import FlightArea from '../components/FlightArea';
import {
  createSessionSaga,
  getLiveSearchSaga,
  filterLiveSearchSaga,
} from '../redux/modules/flight';

export default connect(
  state => ({
    session: state.flight.session,
    originDatas: state.flight.originDatas,
  }),
  dispatch => ({
    createSession: requestBody => {
      dispatch(createSessionSaga(requestBody));
    },
    getLiveSearch: () => {
      dispatch(getLiveSearchSaga());
    },
    changeFilterDatas: filterDatas => {
      dispatch(filterLiveSearchSaga(filterDatas));
    },
  }),
)(FlightArea);
