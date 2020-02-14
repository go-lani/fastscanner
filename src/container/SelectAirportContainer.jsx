import { connect } from 'react-redux';
import SelectAirport from '../components/SearchArea/SelectAirport';
import {
  setOriginSearchSaga,
  setOriginSelectSaga,
  setDestinationSelectSaga,
  setDestinationSearchSaga,
} from '../redux/modules/search';

export default connect(
  state => ({
    originSearchList: state.search.originSearch,
    destinationSearchList: state.search.destinationSearch,
    originName: state.search.originName,
    originPlace: state.search.originPlace,
    destinationName: state.search.destinationName,
    destinationPlace: state.search.destinationPlace,
  }),
  dispatch => ({
    searchOrigin: value => {
      dispatch(setOriginSearchSaga(value));
    },
    selectOrigin: id => {
      dispatch(setOriginSelectSaga(id));
    },
    searchDestination: value => {
      dispatch(setDestinationSearchSaga(value));
    },
    selectDestination: id => {
      dispatch(setDestinationSelectSaga(id));
    },
  }),
)(SelectAirport);
