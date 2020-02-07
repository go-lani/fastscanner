import React from 'react';
import styled from 'styled-components';
import SwapHorizRoundedIcon from '@material-ui/icons/SwapHorizRounded';

const StyledAirportLabel = styled.label``;
const StyledAirportInput = styled.input`
  width: 210px;
  height: 50px;
  border: 0;
  color: #000;
  padding-left: 10px;
`;

const StyledAirportDepatureInput = styled(StyledAirportInput)`
  border-radius: 5px 0 0 5px;
`;

const StyledAirportChangeButton = styled.button`
  width: 50px;
  height: 50px;
`;

const SelectAirport = () => {
  const changeAirport = () => {
    console.log('출발지 도착지를 반전시킵니다.');
  };
  return (
    <>
      {/* <label htmlFor="airport-depature">출발지</label> */}
      <StyledAirportDepatureInput
        type="text"
        id="airport-depature"
        defaultValue="인천(ICN)"
      />
      <StyledAirportChangeButton onClick={changeAirport}>
        <SwapHorizRoundedIcon style={{ color: '#666' }} fontSize="large" />
      </StyledAirportChangeButton>
      {/* <label htmlFor="airport-arrived">도착지</label> */}
      <StyledAirportInput
        type="text"
        id="airport-arrived"
        placeholder="도착지 선택"
      />
    </>
  );
};

export default SelectAirport;
