import React from 'react';
import styled from 'styled-components';
import ArrowDropDownOutlinedIcon from '@material-ui/icons/ArrowDropDownOutlined';

const StyledOptionButton = styled.button`
  width: 220px;
  height: 50px;
  border: 0;
  border-radius: 0 5px 5px 0;
  color: #000;
  padding: 0 10px;
`;

const StyledOptionValue = styled.span`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const SelectOption = () => {
  return (
    <>
      <StyledOptionButton>
        <StyledOptionValue>
          <span>1 성인, 일반석</span>
          <ArrowDropDownOutlinedIcon />
        </StyledOptionValue>
      </StyledOptionButton>
    </>
  );
};

export default SelectOption;
