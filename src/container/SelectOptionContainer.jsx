import { connect } from 'react-redux';
import SelectOption from '../components/SearchArea/SelectOption';
import {} from '../redux/modules/search';

export default connect(
  state => ({
    cabinClass: state.search.cabinClass,
    adults: state.search.adults,
    children: state.search.children,
    infants: state.search.infants,
  }),
  dispatch => ({}),
)(SelectOption);
