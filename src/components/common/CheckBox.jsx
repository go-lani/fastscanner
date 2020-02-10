import React from 'react';
import styled, { css } from 'styled-components';

const StyledCheckbox = styled.input`
  width: 15px;
  height: 15px;
  -webkit-appearance: none;
  -moz-appearance: none;
  -o-appearance: none;
  appearance: none;
  outline: none;
  box-shadow: none;
  background-image: url('/images/uncheck.png');
  background-size: 15px;
  cursor: pointer;
  :checked {
    background-image: url('/images/check.png');
  }
  :disabled {
    cursor: not-allowed;
    background-image: url('/images/checkdisable.png');
  }
`;

const StyledLabel = styled.label`
  font-size: 1.4rem;
  padding-left: 5px;
  ${props =>
    props.isDisable &&
    css`
      color: '#666';
    `};
`;

const CheckBox = ({ label, id, isDisable }) => {
  return (
    <span>
      <StyledCheckbox type="checkbox" id={id} disabled={isDisable} />
      <StyledLabel htmlFor={id} isDisable>
        {label}
      </StyledLabel>
    </span>
  );
};

export default CheckBox;
