import React, { useState, useRef, useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';

const StyledDropBoxContainer = styled.li`
  width: 100%;
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
`;

const StyledDropBoxButton = styled.button`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  border: 0;
  border-bottom: 1px solid #dedede;
  background-color: transparent;
  padding: 10px 0;
  text-align: left;
  word-break: keep-all;
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
    padding: 10px 0;
    height: auto;
  }
  100% {
    padding: 0;
    height: 0;
  }
`;

const slideDown = keyframes`
  0% {
    padding: 0;
    height: 0;
  }
  100% {
  }
`;

const StyledDropBoxList = styled.ul`
  padding: 0;
  height: 0;
  transition: all 0.3s;

  ${({ isOpen }) =>
    isOpen &&
    css`
      padding: 10px 0;
      height: auto;
    `}
  li + li {
    margin-top: 0;
  }
`;

const DropBox = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isClicked, setIsClicked] = useState(false);

  const dropState = () => {
    setIsOpen(!isOpen);
    setIsClicked(!isClicked);
  };

  return (
    <StyledDropBoxContainer>
      <StyledDropBoxButton onClick={dropState}>
        <StyledDropBoxTitle>{title}</StyledDropBoxTitle>
        <StyledArrow isClicked={isClicked}></StyledArrow>
      </StyledDropBoxButton>
      <StyledDropBoxList isOpen={isOpen}>{children}</StyledDropBoxList>
    </StyledDropBoxContainer>
  );
};

export default DropBox;
