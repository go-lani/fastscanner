import React from 'react';
import Header from '../components/Header';
import SearchArea from '../components/SearchArea';
import MainLayout from '../layouts/MainLayout';

const Home = () => {
  return (
    <MainLayout>
      <Header />
      <SearchArea />
    </MainLayout>
  );
};

export default Home;
