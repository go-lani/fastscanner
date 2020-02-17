import { connect } from 'react-redux';
import SearchAreaHeader from '../components/SearchArea/SearchAreaHeader';
import {
  setChangeWaySaga,
  setOriginSearchSaga,
  setDestinationSearchSaga,
  setStopsSelectSaga,
  getConfigureSaga,
} from '../redux/modules/search';

export default connect(
  state => ({
    way: state.search.way,
    originName: state.search.originName,
    destinationName: state.search.destinationName,
    outboundDate: state.search.outboundDate,
    inboundDate: state.search.inboundDate,
    adults: state.search.adults,
    children: state.search.children,
    infants: state.search.infants,
    cabinClass: state.search.cabinClass,
  }),
  dispatch => ({
    getConfigure: value => {
      dispatch(getConfigureSaga(value));
    },
    changeWay: id => {
      // id 값으로는 oneway or round
      dispatch(setChangeWaySaga(id));
    },
    searchOrigin: value => {
      // value로는 icn 값
      dispatch(setOriginSearchSaga(value));
    },
    searchDestination: value => {
      // value로는 icn 값
      dispatch(setDestinationSearchSaga(value));
    },
    selectStops: value => {
      dispatch(setStopsSelectSaga(value));
    },
  }),
)(SearchAreaHeader);
