import React, { useState, useCallback, useEffect } from 'react';
import uuid from 'uuid';
import { cloneDeep } from 'lodash';
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
    originDatas,
    filterDatas,
    renderDatas,
    pageIndex,
    loading,
    renderLiveSearch,
    filterLiveSearch,
    filterOptions,
    filterUpdate,
    setFilterOptions,
  }) => {
    const [isActive, setActive] = useState('price');
    const [priceAverage, setPriceAverage] = useState();
    const [durationAverage, setDurationAverage] = useState();
    const [recommendAverage, setRecommendAverage] = useState();
    const [defaultFilterOptions, setDefaultFilterOptions] = useState();

    useEffect(() => {
      if (
        originDatas &&
        !filterOptions.OutBound &&
        filterOptions.OutBound !== null
      ) {
        setDefaultFilterOptions(filterOptions);
      }
    }, [originDatas, filterOptions]);

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
          minDurationDatas.Inbound
            ? (minDurationDatas.Outbound.Duration +
                minDurationDatas.Inbound.Duration) /
              2
            : minDurationDatas.Outbound.Duration;

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
          minPriceDatas && minPriceDatas.Outbound && minPriceDatas.Inbound
            ? (minPriceDatas.Outbound.Duration +
                minPriceDatas.Inbound.Duration) /
              2
            : minPriceDatas.Outbound.Duration;

        setPriceAverage({
          time: `${Math.floor(minPriceDuration / 60)}시간 ${Math.floor(
            minPriceDuration % 60,
          )}분`,
          price: minPrice.toString().replace(regExp, ','),
        });

        const minRecommendDatas =
          originDatas &&
          cloneDeep(originDatas).sort(
            (pre, cur) =>
              (
                pre.Outbound.Duration +
                (pre.Inbound ? pre.Inbound.Duration : 0) / 60
              ).toFixed(1) *
                4 +
              (pre.Outbound.Stops.length +
                (pre.Inbound ? pre.Inbound.Stops.length : 0)) *
                20 +
              Math.floor(pre.price / 10000) * 5 -
              (
                cur.Outbound.Duration +
                (cur.Inbound ? cur.Inbound.Duration : 0) / 60
              ).toFixed(1) *
                4 +
              (cur.Outbound.Stops.length +
                (cur.Inbound ? cur.Inbound.Stops.length : 0)) *
                20 +
              Math.floor(cur.price / 10000) * 5,
          )[0];

        console.log('minr', minRecommendDatas);

        const minRecommendDuration =
          minRecommendDatas &&
          minRecommendDatas.Outbound &&
          minRecommendDatas.Inbound
            ? (minRecommendDatas.Outbound.Duration +
                minRecommendDatas.Inbound.Duration) /
              2
            : minRecommendDatas.Outbound.Duration;

        console.log(minRecommendDuration);

        setRecommendAverage({
          time: `${Math.floor(minRecommendDuration / 60)}시간 ${Math.floor(
            minRecommendDuration % 60,
          )}분`,
          price:
            minRecommendDatas &&
            minRecommendDatas.price.toString().replace(regExp, ','),
        });
      }
    }, [filterDatas, originDatas]);

    const filterReset = useCallback(
      e => {
        setFilterOptions({
          ...defaultFilterOptions,
          sortBy: isActive,
          OutBound: null,
          InBound: null,
        });
        filterLiveSearch();
      },
      [defaultFilterOptions, filterLiveSearch, isActive, setFilterOptions],
    );

    return (
      <S.ListLayout>
        <A11yTitle>항공권 검색 결과</A11yTitle>
        <S.ProgressBox loading={pageIndex}>
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
                        {filterDatas && filterDatas[0].Inbound
                          ? priceAverage && `${priceAverage.time} (평균)`
                          : priceAverage && `${priceAverage.time}`}
                      </small>
                    </>
                  ) : (
                    <>
                      {loading && <CircularProgress disableShrink size={30} />}
                      <S.NonAverage isActive={isActive === 'price'}>
                        {loading ? '' : '데이터가 존재하지 않습니다'}
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
                        {filterDatas && filterDatas[0].Inbound
                          ? durationAverage && `${durationAverage.time} (평균)`
                          : durationAverage && `${durationAverage.time}`}
                      </small>
                    </>
                  ) : (
                    <>
                      {loading && <CircularProgress disableShrink size={30} />}
                      <S.NonAverage isActive={isActive === 'duration'}>
                        {loading ? '' : '데이터가 존재하지 않습니다'}
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
                  {renderDatas && renderDatas.length ? (
                    <>
                      <S.TabPrice isActive={isActive === 'recommend'}>
                        {recommendAverage && `₩ ${recommendAverage.price}`}
                      </S.TabPrice>
                      <small>
                        {filterDatas && filterDatas[0].Inbound
                          ? recommendAverage &&
                            `${recommendAverage.time} (평균)`
                          : recommendAverage && `${recommendAverage.time}`}
                      </small>
                    </>
                  ) : (
                    <>
                      {loading && <CircularProgress disableShrink size={30} />}
                      <S.NonAverage isActive={isActive === 'recommend'}>
                        {loading ? '' : '데이터가 존재하지 않습니다'}
                      </S.NonAverage>
                    </>
                  )}
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
