import { connect } from 'react-redux';
import FlightArea from '../components/FlightArea';
import { getFlightDataSaga } from '../redux/modules/flight';

export default connect(
  state => ({}),
  dispatch => ({
    getFlightData: requestBody => {
      dispatch(getFlightDataSaga(requestBody));
    },
  }),
)(FlightArea);
