import { connect } from 'react-redux';
import FilterArea from '../components/FlightArea/FilterArea';
import {
  filterLiveSearchSaga,
  setFilterOptionsSaga,
} from '../redux/modules/flight';

export default connect(
  state => ({
    originDatas: state.flight.originDatas,
    directDisable: state.flight.filterOptions.directDisable,
    viaDisable: state.flight.filterOptions.viaDisable,
    filterOptions: state.flight.filterOptions,
  }),

  dispatch => ({
    filterLiveSearch: () => {
      dispatch(filterLiveSearchSaga());
    },
    setFilterOptions: status => {
      dispatch(setFilterOptionsSaga(status));
    },
  }),
)(FilterArea);
