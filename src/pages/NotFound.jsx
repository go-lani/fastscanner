import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const StyledNotFoundLayout = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;

  footer {
    margin-top: auto;
  }
`;

const StyledLogo = styled.img`
  align-self: flex-start;
  max-width: 200px;
  height: auto;
`;

const StyledNotFoundImg = styled.img`
  max-width: 512px;
  width: 100%;
`;

const StyledNotFoundInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;

  em {
    font-weight: 700;
    font-size: 2.2rem;
    text-align: center;
  }

  p {
    margin: 15px 0 0;
    font-size: 1.8rem;
    word-break: keep-all;
    text-align: center;
  }

  a {
    margin: 30px 0 0;
    padding: 10px 20px;
    border-radius: 3px;
    background: #0288d1;
    font-size: 2rem;
    color: #fff;
  }
`;

const NotFound = props => {
  return (
    <StyledNotFoundLayout>
      <StyledNotFoundInfo>
        <StyledLogo src="/images/logo_blue.png" alt="fastScanner" />
        <StyledNotFoundImg src="/images/not-found.png" alt="404" />
        <em>페이지를 찾을 수 없습니다.</em>
        <p>
          패스트스캐너와 함께라면 어디든지 가실 수 있어요. 하지만 먼저
          홈페이지로 돌아가셔야 해요.
        </p>
        <Link to="/">홈으로</Link>
      </StyledNotFoundInfo>
      <Footer />
    </StyledNotFoundLayout>
  );
};

export default NotFound;
