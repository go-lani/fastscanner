import React, { useState, useCallback, useEffect } from 'react';
import uuid from 'uuid';
import FlightItem from './FlightItem';
import A11yTitle from '../../Common/A11yTitle';
import Loader from './Loader';
import * as S from './ListAreaStyled';
import InfiniteScroller from 'react-infinite-scroller';
import Loading from './Loading';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useSelector } from 'react-redux';
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
    filterDatas,
    renderDatas,
    pageIndex,
    loading,
    renderLiveSearch,
    filterLiveSearch,
    filterUpdate,
    setFilterOptions,
  }) => {
    const [isActive, setActive] = useState('price');
    const [priceAverage, setPriceAverage] = useState();
    const [durationAverage, setDurationAverage] = useState();
    const originDatas = useSelector(state => state.flight.originDatas);

    const openFilterArea = useCallback(() => {
      setFilterModalVisible(true);
    }, [setFilterModalVisible]);

    useEffect(() => {
      setFilterOptions({
        sortBy: isActive,
      });
      filterLiveSearch();
    }, [filterLiveSearch, isActive, setFilterOptions]);

    const changeCategory = e => {
      e.stopPropagation();

      if (e.target.parentNode.id === 'recommend' || e.target.id === 'recommend')
        return alert('준비중입니다.');

      setFilterOptions({
        sortBy: e.target.parentNode.id || e.target.id,
      });

      setActive(e.target.parentNode.id || e.target.id);
    };

    useEffect(() => {
      const regExp = /\B(?=(\d{3})+(?!\d))/g;

      if (filterDatas) {
        const minDuration =
          filterDatas &&
          Math.min(
            ...filterDatas.map(
              filterData =>
                filterData.Outbound.Duration +
                (filterData.Inbound ? filterData.Inbound.Duration : 0),
            ),
          );

        const minDurationDatas =
          filterDatas &&
          filterDatas.filter(
            filterData =>
              filterData.Outbound.Duration +
                (filterData.Inbound ? filterData.Inbound.Duration : 0) ===
              minDuration,
          )[0];

        const minDurationAverage =
          minDurationDatas &&
          minDurationDatas.Outbound &&
          (minDurationDatas.Outbound.Duration +
            (minDurationDatas.Inbound
              ? minDurationDatas.Inbound.Duration
              : 0)) /
            2;

        setDurationAverage({
          time: `${Math.floor(minDurationAverage / 60)}시간 ${Math.floor(
            minDurationAverage % 60,
          )}분`,
          price:
            minDurationDatas &&
            minDurationDatas.price.toString().replace(regExp, ','),
        });

        const minPrice =
          filterDatas &&
          Math.min(...filterDatas.map(filterData => filterData.price));

        const minPriceDatas =
          filterDatas &&
          filterDatas.filter(filterData => +filterData.price === minPrice)[0];

        const minPriceDuration =
          minPriceDatas &&
          minPriceDatas.Outbound &&
          (minPriceDatas.Outbound.Duration +
            (minPriceDatas.Inbound ? minPriceDatas.Inbound.Duration : 0)) /
            2;

        setPriceAverage({
          time: `${Math.floor(minPriceDuration / 60)}시간 ${Math.floor(
            minPriceDuration % 60,
          )}분`,
          price: minPrice.toString().replace(regExp, ','),
        });
      }
    }, [filterDatas]);

    const filterReset = () => {
      // filterLiveSearch();
    };

    return (
      <S.ListLayout>
        <A11yTitle>항공권 검색 결과</A11yTitle>
        <S.ProgressBox loading={progress.per}>
          <S.ProgressTextBox loading={pageIndex}>
            {progress.per === 100 ? (
              <S.ProgressResult
                onClick={filterReset}
                status={
                  originDatas &&
                  filterDatas &&
                  filterDatas.length !== originDatas.length
                }
              >
                <span>{originDatas && `총 ${originDatas.length}개 중, `}</span>
                <em>{filterDatas && filterDatas.length}개</em>
                {originDatas &&
                  filterDatas &&
                  filterDatas.length !== originDatas.length && (
                    <span> (전체보기)</span>
                  )}
              </S.ProgressResult>
            ) : (
              <>
                <CircularProgress disableShrink size={20} />
                <S.ProgressText>
                  ({progress.all}개의 항공사중 {progress.complete}개 확인)
                </S.ProgressText>
              </>
            )}
          </S.ProgressTextBox>
          <S.Progress variant="determinate" value={progress.per} />
        </S.ProgressBox>
        <S.TabArea>
          <S.FilterButton onClick={openFilterArea}>필터 (조건)</S.FilterButton>
          <S.CategoryTab onClick={changeCategory}>
            <S.TabItem
              id="price"
              onClick={changeCategory}
              isActive={isActive === 'price'}
              role="button"
              tabindex="0"
            >
              <p>최저가</p>
              {!filterUpdate && (
                <>
                  {renderDatas && renderDatas.length ? (
                    <>
                      <S.TabPrice isActive={isActive === 'price'}>
                        {priceAverage && `₩ ${priceAverage.price}`}
                      </S.TabPrice>
                      <small>
                        {priceAverage && `${priceAverage.time}`} (평균)
                      </small>
                    </>
                  ) : (
                    <>
                      <S.NonAverage isActive={isActive === 'price'}>
                        없음
                      </S.NonAverage>
                    </>
                  )}
                </>
              )}
              {filterUpdate && <CircularProgress disableShrink size={30} />}
            </S.TabItem>
            <S.TabItem
              id="duration"
              onClick={changeCategory}
              isActive={isActive === 'duration'}
              role="button"
              tabindex="0"
            >
              <p>최단 여행시간</p>
              {!filterUpdate && (
                <>
                  {renderDatas && renderDatas.length ? (
                    <>
                      <S.TabPrice isActive={isActive === 'duration'}>
                        {durationAverage && `₩ ${durationAverage.price}`}
                      </S.TabPrice>
                      <small>
                        {durationAverage && `${durationAverage.time}`} (평균)
                      </small>
                    </>
                  ) : (
                    <>
                      <S.NonAverage isActive={isActive === 'duration'}>
                        없음
                      </S.NonAverage>
                    </>
                  )}
                </>
              )}
              {filterUpdate && <CircularProgress disableShrink size={30} />}
            </S.TabItem>
            <S.TabItem
              id="recommend"
              onClick={changeCategory}
              isActive={isActive === 'recommend'}
              role="button"
              tabindex="0"
            >
              <p>추천순</p>
              {!filterUpdate && (
                <>
                  <S.TabPrice isActive={isActive === 'recommend'}>
                    준비중..
                  </S.TabPrice>
                </>
              )}
              {filterUpdate && <CircularProgress disableShrink size={30} />}
            </S.TabItem>
          </S.CategoryTab>
        </S.TabArea>
        <S.FlightList>
          {loading && !pageIndex && loaderRender}
          {filterUpdate && <Updating filterUpdate={filterUpdate} />}
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
