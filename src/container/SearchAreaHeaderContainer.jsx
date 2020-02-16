import { connect } from 'react-redux';
import SearchAreaHeader from '../components/SearchArea/SearchAreaHeader';
import {
  setChangeWaySaga,
  setOriginSearchSaga,
  setDestinationSearchSaga,
  setStopsSelectSaga,
} from '../redux/modules/search';

export default connect(
  state => ({}),
  dispatch => ({
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
