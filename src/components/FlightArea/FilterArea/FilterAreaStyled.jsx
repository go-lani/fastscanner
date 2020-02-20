import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import media from '../../../libs/MediaQuery';

export const FilterOverlay = styled.div`
  display: none;

  ${media.tablet`
    display: block;
    opacity: ${({ filterAreaState }) => (filterAreaState ? '0.7' : '0')};
    background-color: #999;
    z-index: ${({ filterAreaState }) => (filterAreaState ? '250' : '-10')};
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    transition: opacity .2s ease;
    `}
`;

export const FilterAreaLayout = styled.section`
  flex-basis: 20vw;
  background: #f5f5f5;
  padding: 20px 30px;

  ${media.tablet`
    transform: ${({ filterAreaState }) =>
      filterAreaState ? 'translate(0)' : 'translate(100%)'};
    position: fixed;
    overflow-y: auto;
    right: 0;
    top: 0;
    width: 100%;
    max-width: 42rem;
    height: 100%;
    z-index: 300;
    background-color: #fff;
    box-shadow: ${({ filterAreaState }) =>
      filterAreaState ? '5px 0 20px 5px #666' : 0};
    transition: transform .2s ease;
  `}
  ${media.mobile`
    transform: ${({ filterAreaState }) =>
      filterAreaState ? 'translate(0)' : 'translate(100%)'};
    position: fixed;
    overflow-y: auto;
    left: 0;
    right: 0;
    top: 0;
    height: 100%;
    z-index: 300;
    background-color: #fff;
    transition: transform .2s ease;
  `}
`;

export const FilterHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0 20px;
  width: 100%;
  height: 5rem;
  border-bottom: 2px solid #eee;
  font-size: 1.6rem;
  font-weight: 700;

  ${media.desktop`
    display: none;
  `}
`;

export const FilterHeaderCloseButton = styled.button`
  color: #0288d1;
  border: 0;
  background-color: transparent;
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
