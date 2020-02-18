import React from 'react';
import FlightAreaContainer from '../container/FlightAreaContainer';
import ResearchAreaContainer from '../container/ResearchAreaContainer';
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
      <ResearchAreaContainer />
      <FlightAreaContainer />
    </SubLayout>
  );
};

export default ResultView;
