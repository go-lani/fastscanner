import React, { useState, createRef, useEffect } from 'react';
import FlightAreaContainer from '../container/FlightAreaContainer';
import Header from '../components/Header';
import SearchAreaHeader from '../components/SearchArea/SearchAreaHeader';
import styled from 'styled-components';

const SubLayout = styled.div`
  position: relative;
  background: url('/images/test2.jpg') 0 50% no-repeat fixed;
  background-size: cover;
`;

const ResultView = () => {
  const [fixed, setFixed] = useState(false);
  const searchArea = createRef();

  const handleSearchArea = () => {
    const searchAreaOffsetTop =
      searchArea.current && searchArea.current.offsetTop;
    if (window.scrollY > searchAreaOffsetTop) {
      setFixed(true);
    } else {
      setFixed(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleSearchArea);
    return () => {
      window.removeEventListener('scroll', handleSearchArea);
    };
  }, [fixed, handleSearchArea]);

  return (
    <SubLayout>
      <Header isView={true} />
      <SearchAreaHeader ref={searchArea} fixed={fixed} />
      <FlightAreaContainer />
    </SubLayout>
  );
};

export default ResultView;
