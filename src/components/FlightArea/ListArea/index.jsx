import React, { useState, useCallback } from 'react';
import uuid from 'uuid';
import FlightItem from './FlightItem';
import A11yTitle from '../../Common/A11yTitle';
import Loader from './Loader';
import * as S from './ListAreaStyled';
import InfiniteScroller from 'react-infinite-scroller';
import Loading from './Loading';
import CircularProgress from '@material-ui/core/CircularProgress';
import Updating from './Updating';

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
    filterDatas,
    pageIndex,
    loading,
    renderLiveSearch,
  }) => {
    const compare = key => {
      return function(a, b) {
        return a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0;
      };
    };
    console.log(
      filterDatas &&
        filterDatas.sort(
          compare(filterDatas.map(filterData => filterData.price)),
        ),
    );
    const minPrice =
      filterDatas &&
      Math.min(...filterDatas.map(filterData => filterData.price));
    const minPriceDatas =
      filterDatas &&
      filterDatas.filter(filterData => +filterData.price === minPrice)[0];
    const minPriceDuration =
      filterDatas &&
      minPriceDatas &&
      minPriceDatas.Outbound &&
      minPriceDatas.Outbound.Duration +
        (minPriceDatas.Inbound ? minPriceDatas.Inbound.Duration : 0);

    const [isActive, setActive] = useState('price');
    const regExp = /\B(?=(\d{3})+(?!\d))/g;

    const openFilterArea = useCallback(() => {
      setFilterModalVisible(true);
    }, [setFilterModalVisible]);

    const changeCategory = useCallback(e => {
      if (e.target.id === 'recommend') return alert('준비중입니다.');
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
            <S.TabItem
              id="price"
              onClick={changeCategory}
              isActive={isActive === 'price'}
              role="button"
              tabindex="0"
            >
              <p>최저가</p>
              <S.TabPrice isActive={isActive === 'price'}>
                {filterDatas && minPriceDatas && minPriceDatas.Outbound ? (
                  `₩ ${minPrice.toString().replace(regExp, ',')}`
                ) : (
                  <CircularProgress disableShrink size={20} />
                )}
              </S.TabPrice>
              <small>
                {filterDatas && minPriceDatas && minPriceDatas.Outbound
                  ? `${Math.floor(
                      minPriceDuration / 60,
                    )}시간 ${minPriceDuration % 60}분 ${
                      minPriceDatas.Inbound ? '(평균)' : ''
                    }`
                  : ''}
              </small>
            </S.TabItem>
            <S.TabItem
              id="duration"
              onClick={changeCategory}
              isActive={isActive === 'duration'}
              role="button"
              tabindex="0"
            >
              <p>최단 여행시간</p>
              <em>₩ 222,222</em>
              <small>(평균) 13시간 50분</small>
            </S.TabItem>
            <S.TabItem
              id="recommend"
              onClick={changeCategory}
              isActive={isActive === 'recommend'}
              role="button"
              tabindex="0"
            >
              <p>추천순</p>
              <em>₩ 222,222</em>
              <small>(평균) 13시간 50분</small>
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
