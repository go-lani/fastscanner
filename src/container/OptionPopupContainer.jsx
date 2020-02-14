import { connect } from 'react-redux';
import OptionPopup from '../components/SearchArea/OptionPopup';
import {
  setClassSaga,
  setAdultsSaga,
  setChildrenSaga,
  setInfantsSaga,
} from '../redux/modules/search';

export default connect(
  state => ({
    originPlace: state.search.originPlace,
    destinationPlace: state.search.destinationPlace,
    inboundDate: state.search.inboundDate,
    outboundDate: state.search.outboundDate,
    cabinClass: state.search.cabinClass,
    adults: state.search.adults,
    children: state.search.children,
    infants: state.search.infants,
  }),
  dispatch => ({
    selectCabinClass: value => {
      dispatch(setClassSaga(value));
    },
    selectAdults: value => {
      dispatch(setAdultsSaga(value));
    },
    selectChildren: value => {
      dispatch(setChildrenSaga(value));
    },
    selectInfants: value => {
      dispatch(setInfantsSaga(value));
    },
  }),
)(OptionPopup);
