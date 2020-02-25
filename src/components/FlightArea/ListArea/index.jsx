import React, { useState, useCallback } from 'react';
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

const ListArea = React.memo(
  ({
    progress,
    setFilterModalVisible,
    renderDatas,
    pageIndex,
    loading,
    renderLiveSearch,
  }) => {
    const [isActive, setActive] = useState('price');

    const openFilterArea = useCallback(() => {
      setFilterModalVisible(true);
    }, [setFilterModalVisible]);

    const changeCategory = useCallback(e => {
      setActive(e.target.id);
    }, []);

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
        <S.TabArea>
          <S.FilterButton onClick={openFilterArea}>필터 (조건)</S.FilterButton>
          <S.CategoryTab>
            <S.TabItem isActive={isActive === 'price'}>
              <button id="price" type="button" onClick={changeCategory}>
                최저가
              </button>
            </S.TabItem>
            <S.TabItem isActive={isActive === 'duration'}>
              <button id="duration" type="button" onClick={changeCategory}>
                최단 여행시간
              </button>
            </S.TabItem>
            <S.TabItem isActive={isActive === 'recommend'}>
              <button id="recommend" type="button" onClick={changeCategory}>
                추천순
              </button>
            </S.TabItem>
          </S.CategoryTab>
        </S.TabArea>
        <S.FlightList>
          {loading && !pageIndex && loaderRender}
          <InfiniteScroller
            loadMore={() => renderLiveSearch()}
            hasMore={!!pageIndex && pageIndex !== 'lastIndex'}
            loader={<Loading key={uuid.v4()} />}
          >
            {renderDatas &&
              renderDatas.map(data => <FlightItem key={uuid.v4()} {...data} />)}
            {renderDatas &&
              !loading &&
              !renderDatas.length &&
              '해당하는 결과가 없습니다.'}
          </InfiniteScroller>
        </S.FlightList>
      </S.ListLayout>
    );
  },
);

export default ListArea;
