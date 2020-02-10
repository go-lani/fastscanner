import styled, { css } from 'styled-components';
import { lightBlue } from '@material-ui/core/colors';

export const S = {};

// SearchArea 공통
S.FieldTitle = styled.legend`
  position: absolute;
  top: -30px;
  left: 0;
  font-size: 1.4rem;
  color: #fff;
`;

// SearchArea Index;
S.SearchWrapper = styled.section`
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  color: #fff;
  font-size: 1.5rem;
  font-weight: 500;
  padding: 20px;
  display: inline-flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

S.SearchForm = styled.form`
  display: inline-block;
`;

S.SearchTop = styled.div`
  display: inline-block;
  & > *:not(.MuiFormControl-root) {
    display: inline-block;
    position: relative;
    margin: 40px 0 0;
    border-right: 1px solid #eee;

    &:last-child {
      border-right: none;
    }
  }
  .MuiFormControl-root {
    display: block;
  }
`;

S.SearchBottom = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0 0;
`;

// 커스텀필요
S.NonstopsCheck = styled.input`
  width: 20px;
  height: 20px;
`;

// Option Popup
S.OptionPopupWrapper = styled.div`
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 370px;
  ${props =>
    props.isOpen &&
    css`
      display: block;
    `}
`;

S.StyledOptionPopup = styled.div`
  padding: 15px;
  border-radius: 5px;
  background-color: #fff;
  font-size: 1.6rem;
  font-weight: 500;
`;

S.Triangle = styled.div`
  width: 15px;
  height: 15px;
  border-right: 15px solid transparent;
  border-bottom: 15px solid #fff;
  border-left: 15px solid transparent;
  margin: 0 auto;
`;

S.OptionPopup = styled.div`
  padding: 15px;
  border-radius: 5px;
  background-color: #fff;
  font-size: 1.6rem;
  font-weight: 500;
`;

S.CategoryTitle = styled.p`
  font-weight: 700;
  margin: 10px 0;
`;

S.SelectCabinClass = styled.select`
  width: 100%;
  height: 35px;
  padding-left: 10px;
  border-radius: 5px;
`;

S.RequestRequiredNotice = styled.div`
  width: 100%;
  padding: 15px;
  font-size: 1.2rem;
  border-radius: 5px;
  background-color: #eee;
`;

S.CountArea = styled.div`
  width: 100%;
  height: 35px;
  display: flex;
  align-items: center;
`;

S.CountButton = styled.button`
  width: 35px;
  height: 35px;
  border-radius: 18px;
  color: ${props => (props.disabled ? '#666' : `${lightBlue[800]}`)};
  background-color: ${props => (props.disabled ? '#eee' : '')};
  cursor: ${props => (props.disabled ? 'default' : 'pointer')};
  border: 2px solid #eee;
`;

S.RequestRequiredNotice = styled.div`
  width: 100%;
  padding: 15px;
  font-size: 1.2rem;
  border-radius: 5px;
  background-color: #eee;
`;

S.CountArea = styled.div`
  width: 100%;
  height: 35px;
  display: flex;
  align-items: center;
`;

S.CountButton = styled.button`
  width: 35px;
  height: 35px;
  border-radius: 18px;
  color: ${props => (props.disabled ? '#666' : `${lightBlue[800]}`)};
  background-color: ${props => (props.disabled ? '#eee' : '')};
  cursor: ${props => (props.disabled ? 'default' : 'pointer')};
  border: 2px solid #eee;
`;

S.CountNum = styled.span`
  display: inline-block;
  width: 15px;
  text-align: center;
  font-size: 2.2rem;
  margin: 0 10px;
`;

S.AgeRangText = styled.span`
  margin-left: 10px;
`;

S.Notice = styled.p`
  font-size: 1.2rem;
  margin: 20px 0;
  color: #999;
`;

S.CompleteButton = styled.button`
  color: #0288d1;
  font-weight: 700;
  border: 0;
  margin: 10px 0 0 auto;
  display: block;
`;

// SearchAirport

S.AirportInput = styled.input`
  width: 210px;
  height: 50px;
  border: 0;
  color: #000;
  padding-left: 10px;
`;

S.AirportChangeButton = styled.button`
  width: 50px;
  height: 50px;
`;

// SelectDate
S.DateButton = styled.button`
  width: 130px;
  height: 50px;
  border: 0;
  color: #000;
  padding-left: 10px;
`;

// SelectOption
S.SelectOptionWrap = styled.div`
  position: relative;
  color: #222;
`;

S.OptionButton = styled.button`
  width: 220px;
  height: 50px;
  padding: 0 10px;
  border: 0;
  color: #000;
`;

S.OptionValue = styled.span`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

S.Popup = styled.div`
  width: 370px;
  height: 460px;
  padding: 15px;
  border-radius: 10px;
  background-color: #fff;
`;
