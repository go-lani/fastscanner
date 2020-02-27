import React, { useState, useCallback, useEffect } from 'react';
import InfiniteScroller from 'react-infinite-scroller';
import { useSelector } from 'react-redux';
import uuid from 'uuid';
import { cloneDeep } from 'lodash';
import FlightItem from './FlightItem';
import PendingItem from './PendingItem';
import A11yTitle from '../../Common/A11yTitle';
import Loader from './Loader';
import NonResult from './NonResult';
import Loading from './Loading';
import Updating from './Updating';
import * as S from './ListAreaStyled';
import CircleProgress from '../../Common/CircleProgress';

const ListArea = React.memo(
  ({
    progress,
    setFilterModalVisible,
    originDatas,
    filterDatas,
    renderDatas,
    pendingDatas,
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
    const [count, setCount] = useState(1);
    const per = useSelector(state => state.flight.progress.per);
    const storeLoading = useSelector(state => state.flight.loading);

    useEffect(() => {
      if (per === 100 && !storeLoading) {
        if (filterOptions !== undefined) {
          if (count === 1) {
            const initialOptions = { ...cloneDeep(filterOptions), init: true };
            setDefaultFilterOptions(initialOption =>
              initialOption !== filterOptions ? initialOptions : initialOptions,
            );
            setCount(2);
          }
        }
      }
    }, [count, filterOptions, per, storeLoading]);

    useEffect(() => {
      console.log(defaultFilterOptions);
    }, [defaultFilterOptions]);
    // console.log(filterOptions);

    // useEffect(() => {
    //   setDefaultFilterOptions(cloneDeep(filterOptions));
    // }, [filterOptions]);

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

      if (loading) return alert('로딩중에 정렬을 변경할 수 없습니다.');

      setFilterOptions({
        sortBy: e.target.parentNode.id || e.target.id,
      });

      setActive(e.target.parentNode.id || e.target.id);
    };

    useEffect(() => {
      const regExp = /\B(?=(\d{3})+(?!\d))/g;

      if (filterDatas && filterDatas.length) {
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

        const minRecommend =
          filterDatas &&
          Math.min(
            ...filterDatas.map(
              data =>
                (data.Outbound && data.Outbound.Duration) +
                ((data.Inbound ? data.Inbound.Duration : 0) / 60).toFixed(1) *
                  4 +
                (data.Outbound.Stops.length +
                  (data.Inbound ? data.Inbound.Stops.length : 0)) *
                  20 +
                Math.floor(data.price / 10000) * 5,
            ),
          );

        if (minRecommend === Infinity) return;

        const minRecommendDatas =
          filterDatas &&
          minRecommend &&
          filterDatas.filter(
            data =>
              (data.Outbound && data.Outbound.Duration) +
                ((data.Inbound ? data.Inbound.Duration : 0) / 60).toFixed(1) *
                  4 +
                (data.Outbound.Stops.length +
                  (data.Inbound ? data.Inbound.Stops.length : 0)) *
                  20 +
                Math.floor(data.price / 10000) * 5 ===
              minRecommend,
          )[0];

        const minRecommendDuration =
          filterDatas && minRecommendDatas.Outbound && minRecommendDatas.Inbound
            ? (minRecommendDatas.Outbound + minRecommendDatas.Inbound) / 2
            : minRecommendDatas.Outbound;

        setRecommendAverage({
          time: `${Math.floor(minRecommendDuration / 60)}시간 ${Math.floor(
            minRecommendDuration % 60,
          )}분`,
          price: minRecommendDatas.price.toString().replace(regExp, ','),
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
        console.log(defaultFilterOptions);
      },
      [defaultFilterOptions, filterLiveSearch, isActive, setFilterOptions],
    );

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
                <CircleProgress disableShrink size={20} />
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
                      <S.NonAverage isActive={isActive === 'price'}>
                        {loading ? '' : '데이터가 존재하지 않습니다'}
                      </S.NonAverage>
                    </>
                  )}
                </>
              )}
              {(loading || filterUpdate) && (
                <CircleProgress
                  classtype={isActive === 'price' ? 'active' : ''}
                  disableShrink
                  size={30}
                />
              )}
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
                      <S.NonAverage isActive={isActive === 'duration'}>
                        {loading ? '' : '데이터가 존재하지 않습니다'}
                      </S.NonAverage>
                    </>
                  )}
                </>
              )}
              {(loading || filterUpdate) && (
                <CircleProgress
                  classtype={isActive === 'duration' ? 'active' : ''}
                  disableShrink
                  size={30}
                />
              )}
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
                      <S.NonAverage isActive={isActive === 'recommend'}>
                        {loading ? '' : '데이터가 존재하지 않습니다'}
                      </S.NonAverage>
                    </>
                  )}
                </>
              )}
              {(loading || filterUpdate) && (
                <CircleProgress
                  classtype={isActive === 'recommend' ? 'active' : ''}
                  disableShrink
                  size={30}
                />
              )}
            </S.TabItem>
          </S.CategoryTab>
        </S.TabArea>

        {loading && !pageIndex && pendingDatas && (
          <S.FlightList>
            {pendingDatas.map(data =>
              data === null ? (
                <Loader key={uuid.v4()} />
              ) : (
                <PendingItem key={uuid.v4()} {...data} />
              ),
            )}
          </S.FlightList>
        )}

        {!loading && renderDatas && (
          <InfiniteScroller
            loadMore={() => renderLiveSearch()}
            hasMore={!!pageIndex && pageIndex !== 'lastIndex'}
            loader={<Loading key={uuid.v4()} />}
          >
            <S.FlightList>
              {filterUpdate && <Updating filterUpdate={filterUpdate} />}
              {renderDatas &&
                renderDatas.map(data => (
                  <FlightItem key={uuid.v4()} {...data} />
                ))}
            </S.FlightList>
          </InfiniteScroller>
        )}
        {renderDatas && !loading && !renderDatas.length && <NonResult />}
      </S.ListLayout>
    );
  },
);

export default ListArea;
