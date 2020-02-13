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
    destinationSearchList: state.search.destinationSearch,
    destinationName: state.search.destinationName,
    inboundDate: state.search.inboundDate,
    cabinClass: state.search.cabinClass,
    countAdults: state.search.adults,
    countChildren: state.search.children,
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
