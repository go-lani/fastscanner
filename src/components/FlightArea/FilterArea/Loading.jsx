import React from 'react';
import styled from 'styled-components';

const StyledLoadingContainer = styled.div``;

const StyledLoadingImg = styled.img`
  display: block;
  margin: 0 auto;
  width: 200px;
  height: auto;
`;

const StyledLoadingText = styled.p`
  margin: 10px 0 0;
  font-weight: 700;
  font-size: 1.6rem;
  color: #333;
  text-align: center;
`;

const Loading = () => {
  return (
    <StyledLoadingContainer>
      <StyledLoadingImg src="/images/flight-earth.gif" alt="loading" />
      <StyledLoadingText>설정 준비중...</StyledLoadingText>
    </StyledLoadingContainer>
  );
};

export default Loading;
