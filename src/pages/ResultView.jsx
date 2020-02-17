import React, { useState, createRef, useEffect } from 'react';
import FlightAreaContainer from '../container/FlightAreaContainer';
import SearchAreaHeaderContainer from '../container/SearchAreaHeaderContainer';
import Header from '../components/Header';
import styled from 'styled-components';

const SubLayout = styled.div`
  position: relative;
  background: url('/images/test2.jpg') 0 50% no-repeat fixed;
  background-size: cover;
`;

const ResultView = () => {
  return (
    <SubLayout>
      <Header isView={true} />
      <SearchAreaHeaderContainer />
      <FlightAreaContainer />
    </SubLayout>
  );
};

export default ResultView;
