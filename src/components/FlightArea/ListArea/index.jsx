import React from 'react';
import uuid from 'uuid';
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
  console.log(typeof progress);
  return (
    <S.ListLayout>
      <A11yTitle>항공권 검색 결과</A11yTitle>
      <S.ProgressBox loading={pageIndex}>
        <S.Progress variant="determinate" value={progress} />
      </S.ProgressBox>
      <S.TabUi>
        <S.CategoryTab>
          <li>
            <S.FilterButton>최저가</S.FilterButton>
          </li>
          <li>
            <S.FilterButton>최단 여행시간</S.FilterButton>
          </li>
          <li>
            <S.FilterButton>추천순</S.FilterButton>
          </li>
        </S.CategoryTab>
        <S.FilterButton onClick={openFilterArea}>필터 (조건)</S.FilterButton>
      </S.TabUi>
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
