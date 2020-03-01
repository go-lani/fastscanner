import React from 'react';
import { animateScroll as scroll } from 'react-scroll';
import styled, { keyframes } from 'styled-components';

const fly = keyframes`
  0% {
    top: 0;
  }
  50% {
    top: -10px;
  }
  100% {
    top: 0;
  }
`;

const TopTrigger = styled.button`
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 9;
  background: none;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  &:hover {
    img {
      position: relative;
      animation: ${fly} 1.5s infinite linear both;
    }
  }

  img {
    width: 100%;
    height: 100%;
  }
`;

const ScrollTop = props => {
  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  return (
    <TopTrigger type="button" onClick={scrollToTop}>
      <img src="/images/top-trigger.png" alt="TOP" />
    </TopTrigger>
  );
};

export default ScrollTop;
