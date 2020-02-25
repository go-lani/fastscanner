import { connect } from 'react-redux';
import FlightArea from '../components/FlightArea';
import { createSessionSaga, mainLiveSearchSaga } from '../redux/modules/flight';

export default connect(
  state => ({
    session: state.flight.session,
  }),

  dispatch => ({
    createSession: requestBody => {
      dispatch(createSessionSaga(requestBody));
    },
    mainLiveSearch: () => {
      dispatch(mainLiveSearchSaga());
    },
  }),
)(FlightArea);
