import React, { useState, createRef, useEffect } from 'react';
import FlightAreaContainer from '../container/FlightAreaContainer';
import Header from '../components/Header';
import SearchAreaHeader from '../components/SearchArea/SearchAreaHeader';

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
    <>
      <Header isView={true} />
      <SearchAreaHeader ref={searchArea} fixed={fixed} />
      <FlightAreaContainer />
    </>
  );
};

export default ResultView;
