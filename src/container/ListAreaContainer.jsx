import { connect } from 'react-redux';
import ListArea from '../components/FlightArea/ListArea';
import { getLiveSearchSaga } from '../redux/modules/flight';

export default connect(
  state => ({
    progress: state.flight.progress,
    datas: state.flight.datas,
    pageIndex: state.flight.pageIndex,
  }),
  dispatch => ({
    getLiveSearch: () => {
      dispatch(getLiveSearchSaga());
    },
  }),
)(ListArea);
