import React from 'react';
import styled from 'styled-components';

const StyledNonResultBox = styled.div`
  padding: 30px 0;
  text-align: center;
  border: 1px solid #e5e5e5;
  border-radius: 10px;
`;

const StyledText = styled.p`
  margin: 15px 0 0;
  font-size: 1.6rem;

  em {
    display: inline-block;
    font-weight: 700;
  }
`;

const StyledAllviewButton = styled.button`
  display: inline-block;
  margin: 10px 0 0;
  padding: 5px 10px;
  border: none;
  background: none;
  font-weight: 700;
  font-size: 1.6rem;
  color: #0288d1;
`;

const NonResult = ({ filterReset }) => {
  return (
    <StyledNonResultBox>
      <img src="/images/non-result.png" alt="" />
      <StyledText>
        죄송합니다.
        <br />
        <em>필터(조건)</em>에 일치하는 항공권이 없습니다.
      </StyledText>
      <StyledAllviewButton type="button" onClick={filterReset}>
        전체보기
      </StyledAllviewButton>
    </StyledNonResultBox>
  );
};

export default NonResult;
