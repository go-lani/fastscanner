import { connect } from 'react-redux';
import FlightArea from '../components/FlightArea';
import { createSessionSaga, getLiveSearchSaga } from '../redux/modules/flight';

export default connect(
  state => ({
    session: state.flight.session,
  }),
  dispatch => ({
    createSession: requestBody => {
      dispatch(createSessionSaga(requestBody));
    },
    getLiveSearch: () => {
      dispatch(getLiveSearchSaga());
    },
  }),
)(FlightArea);
