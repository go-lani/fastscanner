import React, { useState, useRef, useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';

const StyledDropBoxContainer = styled.div`
  width: 100%;
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
`;

const StyledDropBoxTop = styled.button`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  border: 0;
  border-bottom: 1px solid #dedede;
  background-color: transparent;
  padding: 10px 0;
`;

const StyledDropBoxTitle = styled.span`
  font-size: 1.6rem;
`;

const StyledArrow = styled.span`
  background-image: url('/images/arrow-black-down.png');
  background-position-y: center;
  background-repeat: no-repeat;
  background-size: 10px;
  width: 10px;
  height: 10px;
  ${({ isClicked }) =>
    !isClicked &&
    css`
      transform: rotate(180deg);
    `}
`;

const slideUp = keyframes`
  0% {
    max-height: 150px;
  }
  100% {
    height: 0;
    overflow: hidden;
  }
`;

const slideDown = keyframes`
  0% {
    height: 0;
    overflow: hidden;
  }
  100% {
    max-height: 150px;
  }
`;

const StyledDropBoxBottom = styled.div`
  align-items: center;
  height: 100px;
  ${({ isOpen }) =>
    isOpen &&
    css`
      animation-name: ${slideDown};
      animation-duration: 0.4s;
      animation-fill-mode: both;
    `}
  ${({ isOpen }) =>
    !isOpen &&
    css`
      animation-name: ${slideUp};
      animation-duration: 0.4s;
      animation-fill-mode: both;
    `}
`;

const StyledContentBox = styled.div`
  padding: 10px 0;
`;

const DropBox = props => {
  const contentBox = useRef();
  const [isOpen, setIsOpen] = useState(true);
  const [isClicked, setIsClicked] = useState(false);

  const dropState = () => {
    setIsOpen(!isOpen);
    setIsClicked(!isClicked);
  };
  return (
    <StyledDropBoxContainer>
      <StyledDropBoxTop onClick={dropState}>
        <StyledDropBoxTitle>경유</StyledDropBoxTitle>
        <StyledArrow isClicked={isClicked}></StyledArrow>
      </StyledDropBoxTop>
      <StyledDropBoxBottom isOpen={isOpen}>
        <StyledContentBox ref={contentBox}>{props.children}</StyledContentBox>
      </StyledDropBoxBottom>
    </StyledDropBoxContainer>
  );
};

export default DropBox;
