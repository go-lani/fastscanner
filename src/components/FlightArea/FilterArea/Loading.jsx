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
  font-weight: 500;
  font-size: 1.4rem;
  color: #333;
  text-align: center;
`;

const Loading = () => {
  return (
    <StyledLoadingContainer>
      <StyledLoadingImg src="/images/grayloading.gif" alt="loading" />
      {/* <StyledLoadingText>검색중...</StyledLoadingText> */}
    </StyledLoadingContainer>
  );
};

export default Loading;
