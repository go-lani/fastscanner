import { connect } from 'react-redux';
import ResearchArea from '../components/SearchArea/ResearchArea';
import { setStopsSelectSaga, getConfigureSaga } from '../redux/modules/search';

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
    selectStops: value => {
      dispatch(setStopsSelectSaga(value));
    },
  }),
)(ResearchArea);
