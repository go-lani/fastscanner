import React from 'react';
import styled, { keyframes } from 'styled-components';
import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';

const colorChange = keyframes`
  from {
    background-color: #0288d1;
  }

  to {
    background-color: #01579b;
  }
`;

const StyledSearchButton = styled.button`
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

const StyledButtonText = styled.span`
  vertical-align: middle;
`;

const SubmitButton = props => {
  return (
    <>
      <StyledSearchButton>
        <StyledButtonText>{props.btxt}</StyledButtonText>
        <ArrowForwardRoundedIcon fontSize="large" />
      </StyledSearchButton>
    </>
  );
};

export default SubmitButton;
