import { connect } from 'react-redux';
import SearchArea from '../components/SearchArea';
import {
  originSearchSaga,
  originSelectSaga,
  destinationSelectSaga,
  destinationSearchSaga,
} from '../redux/modules/search';

export default connect(
  state => ({
    originSearchList: state.search.originSearch,
    originName: state.search.originName,
    destinationSearchList: state.search.destinationSearch,
    destinationName: state.search.destinationName,
  }),
  dispatch => ({
    searchOrigin: value => {
      dispatch(originSearchSaga(value));
    },
    selectOrigin: id => {
      dispatch(originSelectSaga(id));
    },
    searchDestination: value => {
      dispatch(destinationSearchSaga(value));
    },
    selectDestination: id => {
      dispatch(destinationSelectSaga(id));
    },
  }),
)(SearchArea);
