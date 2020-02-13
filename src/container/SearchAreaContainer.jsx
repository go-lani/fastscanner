import { connect } from 'react-redux';
import SearchArea from '../components/SearchArea';
import {
  setChangeWaySaga,
  setOriginSearchSaga,
  setOriginSelectSaga,
  setDestinationSelectSaga,
  setDestinationSearchSaga,
  setClassSaga,
  setAdultsSaga,
  setChildrenSaga,
  setOutDateSaga,
  setInDateSaga,
} from '../redux/modules/search';

export default connect(
  state => ({
    way: state.search.way,
    originSearchList: state.search.originSearch,
    originName: state.search.originName,
    originPlace: state.search.originPlace,
    destinationSearchList: state.search.destinationSearch,
    destinationName: state.search.destinationName,
    destinationPlace: state.search.destinationPlace,
    inboundDate: state.search.inboundDate,
    outboundDate: state.search.outboundDate,
    cabinClass: state.search.cabinClass,
    countAdults: state.search.adults,
    countChildren: state.search.children,
    stops: state.search.stops,
  }),
  dispatch => ({
    changeWay: id => {
      dispatch(setChangeWaySaga(id));
    },
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
    selectOutboundDate: date => {
      dispatch(setOutDateSaga(date));
    },
    selectInboundDate: date => {
      dispatch(setInDateSaga(date));
    },
    selectCabinClass: value => {
      dispatch(setClassSaga(value));
    },
    selectAdults: value => {
      dispatch(setAdultsSaga(value));
    },
    selectChildren: value => {
      dispatch(setChildrenSaga(value));
    },
  }),
)(SearchArea);
