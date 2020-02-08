import React, { useState } from 'react';
import styled, { css } from 'styled-components';
// import SelectWayTap from './SelectWayTap';
import SelectAirport from './SelectAirport';
import SelectDate from './SelectDate_new';
import SelectOption from './SelectOption';
import SubmitButton from './SubmitButton';

const StyledSearchLayout = styled.div`
  width: 100%;
  height: 200px;
  background: transparent;
`;

const StyledSearchWrapper = styled.section`
  position: relative;
  z-index: 100;
  height: 200px;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  color: #fff;
  font-size: 1.5rem;
  font-weight: 500;
  padding: 20px;
  width: 70vw;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  ${props =>
    props.fixed &&
    css`
      position: fixed;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
    `}
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

const SearchArea = React.forwardRef(({ fixed }, ref) => {
  const [way, setWay] = useState('왕복');
  return (
    <StyledSearchLayout ref={ref} id="search-area">
      <StyledSearchWrapper fixed={fixed}>
        {/* <SelectWayTap way={way} setWay={setWay} /> */}
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
    </StyledSearchLayout>
  );
});

export default SearchArea;
