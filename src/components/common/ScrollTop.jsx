import React from 'react';
import { animateScroll as scroll } from 'react-scroll';
import styled from 'styled-components';

const TopTrigger = styled.button`
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 1000;
  background: none;
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;

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
