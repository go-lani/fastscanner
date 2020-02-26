import React from 'react';
import styled, { css, keyframes } from 'styled-components';

const ghost = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const ghostReverse = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const StyledUpdatingWrapper = styled.div`
  background-color: rgba(245, 245, 245, 0.8);
  width: 100%;
  height: 100%;
  min-height: 100vh;
  border-radius: 10px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 7;
  text-align: center;
  ${props =>
    props.filterUpdate
      ? css`
          animation: ${ghost} 0.3s linear forwards;
        `
      : css`
          animation: ${ghostReverse} 0.3s linear forwards;
        `}
`;

const StyledUpdationText = styled.p`
  display: inline-block;
  background-color: #fff;
  border: 1px solid #c0c0c0;
  border-radius: 5px;
  padding: 10px 20px;
  margin-top: 20%;
  font-size: 2rem;
  text-align: center;
`;

const Updating = ({ filterUpdate }) => {
  return (
    <StyledUpdatingWrapper filterUpdate={filterUpdate}>
      <StyledUpdationText>업데이트중...</StyledUpdationText>
    </StyledUpdatingWrapper>
  );
};

export default Updating;
