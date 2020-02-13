import React from 'react';
import Header from '../components/Header';
import SearchAreaContainer from '../container/SearchAreaContainer';
import styled from 'styled-components';

const MainLayout = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 0 20px;
  background: url('/images/test2.jpg') center center no-repeat;
  background-size: cover;
`;

const Home = () => {
  return (
    <MainLayout>
      <Header />
      <SearchAreaContainer />
    </MainLayout>
  );
};

export default Home;
