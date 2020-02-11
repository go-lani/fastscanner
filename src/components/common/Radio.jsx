import React from 'react';
import styled, { css, keyframes } from 'styled-components';

const ripple = keyframes`
  0% {
    box-shadow: 0px 0px 0px 1px rgba(3, 169, 244, 0.0);
  }
  50% {
    box-shadow: 0px 0px 0px 5px rgba(3, 169, 244, 0.3);
  }
  100% {
    box-shadow: 0px 0px 0px 10px rgba(3, 169, 244, 0);
  }
`;

const sizes = {
  small: {
    radio: 14,
    fontSize: '1.4rem',
  },
  medium: {
    radio: 16,
    fontSize: '1.6rem',
  },
  large: {
    radio: 24,
    fontSize: '2rem',
  },
};

const sizeStyle = css`
  ${({ size }) => css`
    width: ${sizes[size].radio}px;
    height: ${sizes[size].radio}px;
    margin: -${sizes[size].radio / 2}px 0 0;
    background-position: 0 -${sizes[size].radio}px;
    background-size: ${sizes[size].radio}px;
  `}
`;

const Label = styled.label`
  display: inline-block;
  position: relative;

  ${({ size }) => css`
    padding: 0 0 0 ${sizes[size].radio * 1.5}px;
  `}

  span {
    display: block;
    line-height: 1.2;

    ${({ size }) => css`
      font-size: ${sizes[size].fontSize};
    `}

    &:before {
      position: absolute;
      content: '';
      top: 50%;
      left: 0;
      background-image: url('/images/radio.png');
      background-repeat: no-repeat;

      ${sizeStyle}
    }

    &:after {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      border-radius: 50%;
      transition: all 0.3s;
      opacity: 0;

      ${sizeStyle}

      background-position: center center;
      background-size: auto;
    }
  }
  & + & {
    margin: 0 0 0 20px;
  }
`;

const Input = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 1px;
  height: 1px;
  opacity: 0;
  cursor: pointer;

  &:checked + span:before {
    background-position: 0 0;
  }
  &:checked + span:after {
    animation: ${ripple} 0.3s linear forwards;
    opacity: 1;
  }
`;

const Radio = props => {
  return (
    <Label htmlFor={props.radioId} size={props.size}>
      <Input
        id={props.radioId}
        name={props.categoryName}
        type="radio"
        value={props.value}
        onChange={props.onChange}
        checked={props.default}
      />
      <span>{props.label}</span>
    </Label>
  );
};

export default Radio;
