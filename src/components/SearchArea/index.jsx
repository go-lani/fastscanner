import React, { useState } from 'react';
import styled from 'styled-components';
import SelectWayTap from './SelectWayTab';
import SelectAirport from './SelectAirport';
import SelectDate from './SelectDate';
import SelectOption from './SelectOption';
import SubmitButton from './SubmitButton';

const StyledSearchWrapper = styled.section`
  width: 70vw;
  height: 30vh;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  color: #fff;
  font-size: 1.5rem;
  font-weight: 500;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const StyledSearchBottom = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledInputBox = styled.div``;

const StyledNonstopsCheck = styled.input`
  width: 20px;
  height: 20px;
`;

const SearchArea = () => {
  const [way, setWay] = React.useState('왕복');
  return (
    <StyledSearchWrapper>
      <h2>SearchArea(a11yText)</h2>
      <SelectWayTap way={way} setWay={setWay} />
      <StyledInputBox>
        <SelectAirport />
        <SelectDate way={way} />
        <SelectOption />
      </StyledInputBox>
      <StyledSearchBottom>
        <span>
          <StyledNonstopsCheck type="checkbox" id="nonstops" />
          <label htmlFor="nonstops">직항</label>
        </span>
        <SubmitButton btxt="항공권 검색" />
      </StyledSearchBottom>
    </StyledSearchWrapper>
  );
};

export default SearchArea;
