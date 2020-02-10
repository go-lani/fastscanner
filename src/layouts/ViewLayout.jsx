import React, { useState, useEffect, createRef } from 'react';
import { S } from './layoutStyled';
import SearchArea from '../components/SearchArea';

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
    window.addEventListener('scroll', handleSearchArea);
    return () => {
      window.removeEventListener('scroll', handleSearchArea);
    };
  }, [handleSearchArea]);

  return (
    <>
      <div
        style={{
          height: 40,
          background: 'pink',
        }}
      >
        헤더
      </div>
      <SearchArea ref={searchArea} fixed={fixed} />
      <S.ViewLayout>{props.children}</S.ViewLayout>
    </>
  );
};

export default ViewLayout;
