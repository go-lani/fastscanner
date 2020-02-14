import React from 'react';
import Header from '../components/Header';
import SearchAreaContainer from '../container/SearchAreaContainer';
import styled from 'styled-components';

const MainLayout = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 0 20px;
  background: url('/images/test2.jpg') center center no-repeat;
  background-size: cover;
`;

const Home = () => {
  return (
    <>
      <MainLayout>
        <Header />
        <SearchAreaContainer />
      </MainLayout>
      <div style={{ height: 300 }}></div>
    </>
  );
};

export default Home;
