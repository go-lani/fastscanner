import React from 'react';
import Header from '../components/Header';
import MainLayout from '../layouts/MainLayout';
import SearchAreaContainer from '../container/SearchAreaContainer';

const Home = () => {
  return (
    <MainLayout>
      <Header />
      <SearchAreaContainer />
    </MainLayout>
  );
};

export default Home;
