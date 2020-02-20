import { connect } from 'react-redux';
import ListArea from '../components/FlightArea/ListArea';

export default connect(
  state => ({
    progress: state.flight.progress,
    datas: state.flight.datas,
    loading: state.flight.loading,
  }),
  dispatch => ({}),
)(ListArea);
