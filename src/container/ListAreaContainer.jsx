import { connect } from 'react-redux';
import ListArea from '../components/FlightArea/ListArea';
import { renderLiveSearchSaga } from '../redux/modules/flight';

export default connect(
  state => ({
    progress: state.flight.progress,
    renderDatas: state.flight.renderDatas,
    filterDatas: state.flight.filterDatas,
    pageIndex: state.flight.pageIndex,
    loading: state.flight.loading,
  }),
  dispatch => ({
    renderLiveSearch: () => {
      dispatch(renderLiveSearchSaga());
    },
  }),
)(ListArea);
