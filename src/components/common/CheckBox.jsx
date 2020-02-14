import React from 'react';
import styled, { css } from 'styled-components';

const sizes = {
  small: {
    fontSize: '1.2rem',
    width: '10px',
    height: '10px',
    backgroundSize: '10px',
  },
  medium: {
    fontSize: '1.4rem',
    width: '15px',
    height: '15px',
    backgroundSize: '15px',
  },
  large: {
    fontSize: '1.6rem',
    width: '20px',
    height: '20px',
    backgroundSize: '20px',
  },
};

const fontSizeStyle = css`
  ${props => css`
    font-size: ${sizes[props.size].fontSize};
  `}
`;

const boxSizeStyle = css`
  ${props => css`
    width: ${sizes[props.size].width};
    height: ${sizes[props.size].height};
    background-size: ${sizes[props.size].backgroundSize};
  `}
`;

const StyledLabel = styled.label`
  ${fontSizeStyle};
  padding-left: 5px;
  ${props =>
    props.isDisable &&
    css`
      color: '#666';
    `};
`;

const StyledCheckbox = styled.input`
  ${boxSizeStyle}
  -webkit-appearance: none;
  -moz-appearance: none;
  -o-appearance: none;
  appearance: none;
  outline: none;
  box-shadow: none;
  background-image: url('/images/uncheck.png');
  cursor: pointer;
  :checked {
    background-image: url('/images/check.png');
  }
  :disabled {
    cursor: not-allowed;
    background-image: url('/images/checkdisable.png');
  }
`;

const CheckBox = ({ label, id, isDisable, size, onClick }) => {
  return (
    <span>
      <StyledCheckbox
        type="checkbox"
        id={id}
        disabled={isDisable}
        size={size}
        onClick={onClick}
      />
      <StyledLabel htmlFor={id} isDisable size={size}>
        {label}
      </StyledLabel>
    </span>
  );
};

export default CheckBox;
