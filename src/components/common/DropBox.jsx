import React, { useState } from 'react';
import styled, { css } from 'styled-components';

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

const StyledDropBoxList = styled.ul`
  overflow: hidden;
  ${({ range }) => css`
    padding: ${range ? '0 15px' : '0'};
  `}
  height: 0;
  transition: all 0.3s;

  ${({ isOpen, range }) =>
    isOpen &&
    css`
      padding: ${range ? '15px' : '15px 0'};
      height: auto;
    `}

  li + li {
    margin-top: 10px;
  }
`;

const DropBox = ({ title, range, children }) => {
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
      <StyledDropBoxList isOpen={isOpen} range={range}>
        {children}
      </StyledDropBoxList>
    </StyledDropBoxContainer>
  );
};

export default DropBox;
