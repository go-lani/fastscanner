import React from 'react';
import uuid from 'uuid';
import FlightItem from './FlightItem';
import A11yTitle from '../../Common/A11yTitle';
import Loader from './Loader';
import * as S from './ListAreaStyled';
import InfiniteScroller from 'react-infinite-scroller';
import Loading from './Loading';
import CircularProgress from '@material-ui/core/CircularProgress';

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
      <S.ProgressBox loading={pageIndex}>
        <S.ProgressTextBox>
          <CircularProgress disableShrink size={20} />
          <S.ProgressText>
            ({progress.all}개의 항공사중 {progress.complete}개 확인)
          </S.ProgressText>
        </S.ProgressTextBox>
        <S.Progress variant="determinate" value={progress.per} />
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
        {/* <InfiniteScroller
          loadMore={() => getLiveSearch()}
          hasMore={!!pageIndex && pageIndex !== 'lastIndex'}
          loader={<Loading key={uuid.v4()} />}
        >
          {datas && datas.map(data => <FlightItem key={uuid.v4()} {...data} />)}
          {datas && !loading && !datas.length && '해당하는 결과가 없습니다.'}
        </InfiniteScroller> */}
      </S.FlightList>
    </S.ListLayout>
  );
};

export default ListArea;
