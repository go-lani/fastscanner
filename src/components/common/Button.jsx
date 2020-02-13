import React from 'react';
import styled, { css, keyframes } from 'styled-components';

const sizes = {
  small: {
    lineHeight: '24px',
    fontSize: '1.6rem',
    fontWeight: 400,
  },
  medium: {
    lineHeight: '27px',
    fontSize: '1.8rem',
    fontWeight: 700,
  },
  large: {
    lineHeight: '30px',
    fontSize: '2.0rem',
    fontWeight: 900,
  },
};

const colors = {
  blue: {
    background: '#0288d1',
  },
};

const images = {
  plane: '/images/plane.png',
};

const sizeStyle = css`
  ${props => css`
    line-height: ${sizes[props.size].lineHeight};
    font-size: ${sizes[props.size].fontSize};
    font-weight: ${sizes[props.size].fontWeight};
  `}
`;

const colorStyle = css`
  ${props => css`
    background: ${colors[props.color].background};
  `}
`;

const colorChange = keyframes`
  from {
    background: #0288d1;
  }

  to {
    background: #fff;
    color: #0288d1
  }
`;

const StyledButton = styled.button`
  /* 공통 */
  display: inline-block;
  padding: 8px 16px;
  border: 0;
  border-radius: 4px;

  /* 크기 */
  ${sizeStyle}

  /* 색상 */
  ${colorStyle}

  &:hover {
    animation: ${colorChange} 0.5s forwards;
  }

  /* img */
  img {
    display: inline-block;
    ${props => css`
      height: ${sizes[props.size].lineHeight};
    `}
    margin-left: 10px;
    vertical-align: middle;
  }
`;

const Span = styled.span`
  display: inline-block;
  vertical-align: middle;
`;

const Button = ({ text, image, ...rest }) => {
  return (
    <>
      <StyledButton {...rest}>
        <Span>{text}</Span>
        <img src={`${images[image]}`} alt={text} />
      </StyledButton>
    </>
  );
};

export default Button;
