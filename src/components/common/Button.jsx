import React from 'react';
import styled, { css, keyframes } from 'styled-components';

const sizes = {
  small: {
    width: '80px',
    fontSize: '1.6rem',
    fontWeight: 400,
    svgSize: '2.0rem',
  },
  medium: {
    width: '150px',
    fontSize: '1.8rem',
    fontWeight: 700,
    svgSize: '2.2rem',
  },
  large: {
    width: '200px',
    fontSize: '2.0rem',
    fontWeight: 900,
    svgSize: '2.4rem',
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
    width: ${sizes[props.size].width};
    font-size: ${sizes[props.size].fontSize};
    font-weight: ${sizes[props.size].fontWeight};

    img {
      font-size: ${sizes[props.size].svgSize};
    }
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
  height: 40px;
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
  /* background: url('/images/plane.png') no-repeat;
  background-repeat: no-repeat;
  background-size: contain; */
  span + img {
    margin-left: 7px;
  }
`;

const Span = styled.span``;

const Button = ({ text, size, color, image }) => {
  const a = images[image];
  console.log(a);

  return (
    <>
      <StyledButton text={text} size={size} color={color} image={image}>
        <Span>{text}</Span>
        <img src={`${a}`} alt={text} />
      </StyledButton>
    </>
  );
};

export default Button;
