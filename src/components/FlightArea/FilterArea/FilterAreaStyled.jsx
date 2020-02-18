import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

export const FilterAreaLayout = styled.section`
  flex-basis: 20vw;
  background: #f5f5f5;
  padding: 20px 30px;
`;

export const DropBoxList = styled.ul``;

export const DropItem = styled.li`
  & + & {
    margin: 15px 0 0;
  }
`;

export const DropTitleBox = styled.div`
  margin: 0 -15px 10px;

  p {
    font-size: 1.2rem;
  }
`;

export const DropTitle = styled.p`
  margin: 0 0 5px;
  font-weight: 700;
  font-size: 1.4rem;
`;

export const RangeSlider = withStyles({
  root: {
    color: '#0288d1',
    height: 6,
  },
  thumb: {
    height: 20,
    width: 20,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus,&:hover,&$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 5,
    borderRadius: 1,
  },
  rail: {
    height: 5,
    borderRadius: 1,
  },
})(Slider);
