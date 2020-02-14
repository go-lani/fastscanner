import { connect } from 'react-redux';
import SelectDate from '../components/SearchArea/SelectDate';
import {
  setOutDateSaga,
  setInDateSaga,
  setMomentOutDateSaga,
  setMomentInDateSaga,
} from '../redux/modules/search';

export default connect(
  state => ({
    way: state.search.way,
    inboundDate: state.search.inboundDate,
    outboundDate: state.search.outboundDate,
    momentOutDate: state.search.momentOutDate,
    momentInDate: state.search.momentInDate,
  }),
  dispatch => ({
    selectOutboundDate: date => {
      dispatch(setOutDateSaga(date));
    },
    selectInboundDate: date => {
      dispatch(setInDateSaga(date));
    },
    selectMomentOutboundDate: date => {
      dispatch(setMomentOutDateSaga(date));
    },
    selectMoemntInboundDate: date => {
      dispatch(setMomentInDateSaga(date));
    },
  }),
)(SelectDate);
