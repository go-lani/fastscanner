import styled, { css, keyframes } from 'styled-components';
import { lightBlue } from '@material-ui/core/colors';
import media from '../../libs/MediaQuery';

// SearchArea 공통
export const FieldTitle = styled.legend`
  position: absolute;
  top: -30px;
  left: 0;
  font-size: 1.4rem;
  color: #fff;
`;

export const SearchWrapper = styled.section`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: ${props => (props.isHeader ? 0 : '120px 0')};
  align-self: ${props => (props.isHeader ? 'auto' : 'flex-start')};

  ${props =>
    props.isHeader &&
    !props.isOpen &&
    css`
      display: none;
    `}
`;

export const Greeting = styled.h2`
  position: absolute;
  top: 0;
  left: 0;
  font-weight: 700;
  font-size: 6rem;
  line-height: 70px;
  color: #fff;
  ${props =>
    props.isHeader &&
    css`
      overflow: hidden;
      position: static;
      top: auto;
      left: auto;
      width: 1px;
      height: 1px;
      margin: -1px;
      background-color: transparent;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
    `}

  ${media.mobile`
    font-size: 4.5rem;
    line-height: 50px;
  `}
`;

export const SearchForm = styled.form`
  padding: ${({ isOpen }) => (isOpen ? '0' : '30px')};
  border-radius: 10px;
  background-color: ${({ isHeader }) =>
    isHeader ? 'transparent' : 'rgba(0, 0, 0, 0.6)'};
  color: #fff;
  transition: padding 0.3s;
  font-size: 1.5rem;
  font-weight: 500;
`;

export const SearchTop = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 10px 0 0;

  .option-field {
    width: 100%;
    margin: 40px 0 0;
  }

  &.options {
    width: 100%;
  }

  ${media.desktop`
    .option-field {
      width: 40%;

      &.options {
        width: 20%;
      }
    }
  `}

  & > * {
    display: inline-block;
    position: relative;
    border-right: 1px solid #eee;

    &:last-child {
      border-right: none;
    }

    ${media.tablet`
      width: 50%;
      border-right: none;
    `}

    ${media.mobile`
      border-right: none;
    `}
  }
`;

export const SearchBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 30px 0 0;
`;

// Option Popup
export const Dim = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 0;

  ${({ isOpen }) => css`
    display: ${isOpen ? 'block' : 'none'};
  `};
`;

export const OptionPopupWrapper = styled.div`
  display: none;
  position: absolute;
  top: 70px;
  right: 50%;
  min-width: 320px;
  width: 100%;
  z-index: 3;
  transform: translateX(50%);

  ${media.desktop`
    right: 0;
    width: auto;
    transform: none;
  `}

  ${props =>
    props.isOpen &&
    css`
      display: block;
    `}
`;

export const StyledOptionPopup = styled.div`
  padding: 15px;
  border-radius: 5px;
  background-color: #fff;
  font-size: 1.6rem;
  font-weight: 500;
`;

export const Triangle = styled.div`
  position: absolute;
  top: -14px;
  right: 95px;
  width: 15px;
  height: 15px;
  border-right: 15px solid transparent;
  border-bottom: 15px solid #fff;
  border-left: 15px solid transparent;
`;

export const OptionPopup = styled.div`
  padding: 15px;
  border-radius: 5px;
  background-color: #fff;
  font-size: 1.6rem;
  font-weight: 500;
  color: #222;
  z-index: 2;
`;

export const CategoryTitle = styled.p`
  font-weight: 700;
  margin: 10px 0;
`;

export const SelectCabinClass = styled.select`
  width: 100%;
  height: 35px;
  padding-left: 10px;
  border-radius: 5px;
`;

export const RequestRequiredNotice = styled.div`
  width: 100%;
  padding: 15px;
  font-size: 1.2rem;
  border-radius: 5px;
  background-color: #eee;
`;

export const CountArea = styled.div`
  width: 100%;
  height: 35px;
  display: flex;
  align-items: center;
`;

export const CountButton = styled.button`
  width: 35px;
  height: 35px;
  border-radius: 18px;
  color: ${props => (props.disabled ? '#666' : `${lightBlue[800]}`)};
  background-color: ${props => (props.disabled ? '#eee' : '')};
  cursor: ${props => (props.disabled ? 'default' : 'pointer')};
  border: 2px solid #eee;
`;

export const CountNum = styled.span`
  display: inline-block;
  width: 15px;
  text-align: center;
  font-size: 2.2rem;
  margin: 0 10px;
`;

export const AgeRangText = styled.span`
  margin-left: 10px;
`;

export const Notice = styled.p`
  font-size: 1.2rem;
  margin: 20px 0;
  color: #999;
`;

export const CompleteButton = styled.button`
  color: #0288d1;
  font-weight: 700;
  border: 0;
  margin: 10px 0 0 auto;
  display: block;
`;

// SearchAirport
export const AirportChangeButton = styled.button`
  width: 10%;
  height: 50px;

  ${media.mobile`
    width: 16%;
  `}
`;

// SelectDate
export const DateButton = styled.button`
  width: 130px;
  height: 50px;
  border: 0;
  color: #000;
  padding-left: 10px;
`;

// SelectOption
export const OptionButton = styled.button`
  width: 100%;
  height: 50px;
  padding: 0 10px;
  border: 0;
  color: #000;
`;

export const OptionValue = styled.span`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const Popup = styled.div`
  width: 370px;
  height: 460px;
  padding: 15px;
  border-radius: 10px;
  background-color: #fff;
`;

// SubmitButton
export const colorChange = keyframes`
  from {
    background-color: #0288d1;
  }

  to {
    background-color: #01579b;
  }
`;

export const SearchButton = styled.button`
  width: 150px;
  height: 40px;
  border: 0;
  border-radius: 5px;
  background-color: #0288d1;
  font-size: 1.8rem;
  font-weight: 700;
  &:hover {
    animation-name: ${colorChange};
    animation-duration: 0.3s;
    animation-fill-mode: forwards;
  }
`;

export const ButtonText = styled.span`
  vertical-align: middle;
`;

export const SearchAreaListBox = styled.ul`
  overflow-x: hidden;
  overflow-y: scroll;
  max-height: 400px;
`;

// AirportInputBox
export const AirportInputBox = styled.div`
  display: inline-block;
  width: 45%;
  position: static;

  ${media.desktop`
    position: relative;
  `}

  ${media.mobile`
    width: 42%;
  `}
`;

export const AirportInput = styled.input`
  width: 100%;
  height: 50px;
  border: 0;
  color: #000;
  padding-left: 10px;
`;

export const AirportListArea = styled.div`
  position: absolute;
  top: 70px;
  left: 0;
  z-index: 2;
  width: 100%;
  border-radius: 5px;
  background: #fff;

  ${media.desktop`
    max-width: 400px;
    border-radius: none;
    background: none;
  `}

  ${({ visible }) => css`
    display: ${visible ? 'block' : 'none'};

    /* &:before {
      display: ${visible ? 'block' : 'none'};
    } */
  `}

  &:before {
    content: '';
    position: absolute;
    top: -15px;
    left: 50%;
    border-right: 15px solid transparent;
    border-bottom: 15px solid #fff;
    border-left: 15px solid transparent;
    transform: translateX(-50%);
  }
`;

export const SearchPlaceDim = styled.div`
  ${({ visible }) => css`
    display: ${visible ? 'block' : 'none'};
  `}
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 1;
  background: transparent;
`;

export const SearchCategoryTitle = styled.p`
  display: block;
  padding: 20px;
  font-weight: 700;
  font-size: 2rem;
  color: #222;
  border-bottom: 2px solid #dedede;
  word-break: keep-all;

  ${media.desktop`
    display: none;
  `}
`;

export const AirportList = styled.ul`
  overflow-x: hidden;
  overflow-y: auto;
  max-height: 264px;
  background: none;

  ${media.desktop`
    border-radius: 5px;
    background: #fff;
  `}
`;

export const AirportListItem = styled.li`
  width: 100%;
  margin: 0;
  font-size: 1.4rem;
  line-height: 26px;
  color: #222;

  button {
    display: block;
    width: 100%;
    padding: 20px;
    border: none;
    text-align: left;
    background: transparent;
    color: #0288d1;
    transition: all 0.3s;

    &:hover {
      background: #0288d1;
      color: #fff;
    }
  }
`;

// SearchAreaHeader
export const SearchHeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.3);
  position: sticky;
  top: 0;
`;

export const FlightInfoSection = styled.section`
  width: 100%;
  text-align: center;
  color: #fff;
  line-height: 2rem;
  cursor: pointer;
`;

export const AirportName = styled.span`
  font-size: 1.8rem;
  word-break: keep-all;
`;

export const FlightIcon = styled.img`
  width: 15px;
  height: 15px;
  margin: 0 10px;
`;

export const OptionArea = styled.div`
  ${({ isOpen }) => css`
    display: ${isOpen ? 'none' : 'block'};
  `}
`;

export const AirportInfoBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0 20px;
`;

export const DateOpionInfoBox = styled.div`
  display: ${props => (props.isOpen || props.fixed ? 'none' : 'block')};
`;

export const DateText = styled.span`
  font-size: 1.2rem;
  &:first-child {
    &:after {
      content: '-';
      margin: 5px;
    }
  }
`;

export const OptionText = styled.span`
  font-size: 1.2rem;
  margin: 0 2px;
  &:after {
    content: ',';
  }
  &:last-child:after {
    content: '';
  }
`;

export const DownButton = styled.button`
  display: inline-block;
  background-color: transparent;
  border: 0;
  padding: 15px 25px;
  margin: 0 0 -20px;
`;

export const ArrowIcon = styled.img`
  width: 15px;
  ${props =>
    props.isOpen === true &&
    css`
      transform: rotate(180deg);
    `}
`;
