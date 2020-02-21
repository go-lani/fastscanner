import React from 'react';
import styled from 'styled-components';

const StyledLoadingImg = styled.img`
  display: block;
  margin: 0 auto;
  width: 100px;
  height: auto;
`;

const Loading = () => {
  return (
    <>
      <StyledLoadingImg src="/images/airplane.gif" alt="loading" />
    </>
  );
};

export default Loading;
