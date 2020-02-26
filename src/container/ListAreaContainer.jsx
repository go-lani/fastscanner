import { connect } from 'react-redux';
import ListArea from '../components/FlightArea/ListArea';
import {
  renderLiveSearchSaga,
  filterLiveSearchSaga,
} from '../redux/modules/flight';

export default connect(
  state => ({
    progress: state.flight.progress,
    renderDatas: state.flight.renderDatas,
    pageIndex: state.flight.pageIndex,
    loading: state.flight.loading,
  }),
  dispatch => ({
    renderLiveSearch: () => {
      dispatch(renderLiveSearchSaga());
    },
    filterLiveSearch: () => {
      dispatch(filterLiveSearchSaga());
    },
  }),
)(ListArea);
