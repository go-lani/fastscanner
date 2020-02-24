import { connect } from 'react-redux';
import FlightArea from '../components/FlightArea';
import {
  createSessionSaga,
  getLiveSearchSaga,
  filterLiveSearchSaga,
  setFilterOptionsSaga,
  mainSaga,
} from '../redux/modules/flight';

export default connect(
  state => ({
    session: state.flight.session,
    directDisable: state.flight.filterOptions.directDisable,
    viaDisable: state.flight.filterOptions.viaDisable,
    originDatas: state.flight.originDatas,
    filterOptions: state.flight.filterOptions,
    pageIndex: state.flight.pageIndex,
    filterDatas: state.flight.filterDatas,
  }),

  dispatch => ({
    createSession: requestBody => {
      dispatch(createSessionSaga(requestBody));
    },
    getLiveSearch: () => {
      dispatch(getLiveSearchSaga());
    },
    changeFilterDatas: (filterName, content) => {
      dispatch(filterLiveSearchSaga());
    },
    setFilterOptions: status => {
      console.log(status);
      dispatch(setFilterOptionsSaga(status));
    },
    main: () => {
      dispatch(mainSaga());
    },
  }),
)(FlightArea);
