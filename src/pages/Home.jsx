import React from 'react';
import Header from '../components/Header';
import SearchAreaContainer from '../container/SearchAreaContainer';
import styled from 'styled-components';
import Footer from '../components/Footer';

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
      <Footer />
    </>
  );
};

export default Home;
