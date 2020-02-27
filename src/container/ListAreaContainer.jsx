import { connect } from 'react-redux';
import ListArea from '../components/FlightArea/ListArea';
import {
  renderLiveSearchSaga,
  filterLiveSearchSaga,
  setFilterOptionsSaga,
} from '../redux/modules/flight';

export default connect(
  state => ({
    progress: state.flight.progress,
    originDatas: state.flight.originDatas,
    renderDatas: state.flight.renderDatas,
    filterDatas: state.flight.filterDatas,
    pageIndex: state.flight.pageIndex,
    loading: state.flight.loading,
    filterOptions: state.flight.filterOptions,
    filterUpdate: state.flight.filterOptions.filterUpdate,
  }),
  dispatch => ({
    renderLiveSearch: () => {
      dispatch(renderLiveSearchSaga());
    },
    filterLiveSearch: () => {
      dispatch(filterLiveSearchSaga());
    },
    setFilterOptions: status => {
      dispatch(setFilterOptionsSaga(status));
    },
  }),
)(ListArea);
