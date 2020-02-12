import React, { useState, useEffect, createRef, useCallback } from 'react';
import { S } from './layoutStyled';
import SearchAreaHeader from '../components/SearchArea/SearchAreaHeader';
import Header from '../components/Header';

const ViewLayout = props => {
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
    console.log(fixed);
    window.addEventListener('scroll', handleSearchArea);
    return () => {
      window.removeEventListener('scroll', handleSearchArea);
    };
  }, [fixed, handleSearchArea]);

  return (
    <>
      <Header isView={true} />
      <SearchAreaHeader ref={searchArea} fixed={fixed} />
      <S.ViewLayout>{props.children}</S.ViewLayout>
    </>
  );
};

export default ViewLayout;
