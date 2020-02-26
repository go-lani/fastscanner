import React from 'react';
import styled from 'styled-components';

const StyledLoadingContainer = styled.div``;

const StyledLoadingImg = styled.img`
  display: block;
  margin: 0 auto;
  width: 100px;
  height: auto;
`;

const StyledLoadingText = styled.p`
  text-align: center;
  color: #333;
`;

const Loading = () => {
  return (
    <StyledLoadingContainer>
      <StyledLoadingImg src="/images/flight-earth.gif" alt="loading" />
      <StyledLoadingText>지구를 돌고 돌아..</StyledLoadingText>
    </StyledLoadingContainer>
  );
};

export default Loading;
