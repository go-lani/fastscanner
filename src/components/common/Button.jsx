import React from 'react';
import styled, { css } from 'styled-components';

const sizes = {
  small: {
    lineHeight: '21px',
    fontSize: '1.6rem',
    fontWeight: 400,
  },
  medium: {
    lineHeight: '26px',
    fontSize: '1.8rem',
    fontWeight: 600,
  },
  large: {
    lineHeight: '29px',
    fontSize: '2.0rem',
    fontWeight: 700,
  },
};

const colors = {
  blue: {
    background: '#0288d1',
  },
};

const images = {
  plane: '/images/plane_white.png',
  planeHover: '/images/plane_blue.png',
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

const StyledButton = styled.button`
  /* 공통 */
  display: inline-block;
  padding: 8px 16px;
  border-radius: 4px;
  border: none;

  color: #fff;

  /* 크기 */
  ${sizeStyle}

  /* 색상 */
  ${colorStyle}

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
