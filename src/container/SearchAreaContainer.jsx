import { connect } from 'react-redux';
import SearchArea from '../components/SearchArea';
import {
  setChangeWaySaga,
  setOriginSearchSaga,
  setDestinationSearchSaga,
  setStopsSelectSaga,
} from '../redux/modules/search';

export default connect(
  state => ({
    way: state.search.way,
    originPlace: state.search.originPlace,
    destinationPlace: state.search.destinationPlace,
    inboundDate: state.search.inboundDate,
    outboundDate: state.search.outboundDate,
    cabinClass: state.search.cabinClass,
    adults: state.search.adults,
    children: state.search.children,
    infants: state.search.infants,
    nonStops: state.search.nonStops,
    direct: state.flight.filterOptions.direct,
  }),
  dispatch => ({
    changeWay: id => {
      dispatch(setChangeWaySaga(id));
    },
    searchOrigin: value => {
      dispatch(setOriginSearchSaga(value));
    },
    searchDestination: value => {
      dispatch(setDestinationSearchSaga(value));
    },
    selectStops: value => {
      dispatch(setStopsSelectSaga(value));
    },
  }),
)(SearchArea);
