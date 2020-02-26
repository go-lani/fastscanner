import { connect } from 'react-redux';
import ListArea from '../components/FlightArea/ListArea';
import {
  renderLiveSearchSaga,
  filterLiveSearchSaga,
  setSortDatasSaga,
} from '../redux/modules/flight';

export default connect(
  state => ({
    progress: state.flight.progress,
    renderDatas: state.flight.renderDatas,
    filterDatas: state.flight.filterDatas,
    pageIndex: state.flight.pageIndex,
    loading: state.flight.loading,
    filterUpdate: state.flight.filterOptions.filterUpdate,
  }),
  dispatch => ({
    renderLiveSearch: () => {
      dispatch(renderLiveSearchSaga());
    },
    filterLiveSearch: () => {
      dispatch(filterLiveSearchSaga());
    },
    setSortDatas: sortData => {
      dispatch(setSortDatasSaga(sortData));
    },
  }),
)(ListArea);
