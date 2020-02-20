import React from 'react';
import uuid from 'uuid';
import { LinearProgress } from '@material-ui/core';
import FlightItem from './FlightItem';
import A11yTitle from '../../Common/A11yTitle';
import Loader from './Loader';
import * as S from './ListAreaStyled';
import InfiniteScroller from 'react-infinite-scroller';

const loaderRender = (() => {
  const loaderGroup = [];
  for (let i = 0; i < 5; i++) {
    loaderGroup.push(<Loader key={uuid.v4()} />);
  }

  return loaderGroup;
})();

const ListArea = ({
  datas,
  progress,
  setFilterModalVisible,
  getLiveSearch,
  pageIndex,
  loading,
}) => {
  const openFilterArea = () => {
    setFilterModalVisible(true);
  };

  return (
    <S.ListLayout>
      <A11yTitle>항공권 검색 결과</A11yTitle>
      <LinearProgress variant="determinate" value={progress} />
      <S.FilterButton onClick={openFilterArea}>필터(조건)</S.FilterButton>
      <S.CategoryTab>
        <li>
          <button>최저가</button>
        </li>
        <li>
          <button>최단여행시간</button>
        </li>
        <li>
          <button>추천순</button>
        </li>
      </S.CategoryTab>
      <S.FlightList>
        {loading && !pageIndex && loaderRender}
        <InfiniteScroller
          loadMore={() => getLiveSearch()}
          hasMore={!!pageIndex}
          loader={<div key={uuid.v4()}> loading....</div>}
        >
          {datas && datas.map(data => <FlightItem key={uuid.v4()} {...data} />)}
          {!datas && '해당하는 결과가 없습니다.'}
        </InfiniteScroller>
      </S.FlightList>
    </S.ListLayout>
  );
};

export default ListArea;
