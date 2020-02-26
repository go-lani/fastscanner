import React, { useState, useCallback, useEffect } from 'react';
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
    filterDatas,
    renderDatas,
    pageIndex,
    loading,
    renderLiveSearch,
    filterLiveSearch,
  }) => {
    const [isActive, setActive] = useState('price');
    const [durationAverage, setDurationAverage] = useState();
    const [durationData, setDurationData] = useState();
    const regExp = /\B(?=(\d{3})+(?!\d))/g;

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

    const openFilterArea = useCallback(() => {
      setFilterModalVisible(true);
    }, [setFilterModalVisible]);

    const changeCategory = e => {
      e.stopPropagation();

      if (e.target.parentNode.id === 'recommend' || e.target.id === 'recommend')
        return alert('준비중입니다.');

      setActive(e.target.parentNode.id || e.target.id);

      if (e.target.parentNode.id === 'duration' || e.target.id === 'duration') {
        if (filterDatas) {
          setDurationData(
            filterDatas.sort(
              (pre, cur) =>
                pre.Outbound.Duration +
                pre.Inbound.Duration -
                (cur.Outbound.Duration + cur.Inbound.Duration),
            ),
          );
        }
      }
    };

    useEffect(() => {
      if (durationData) {
        filterLiveSearch(durationData);
      }
    }, [filterLiveSearch, durationData]);

    useEffect(() => {
      const regExp = /\B(?=(\d{3})+(?!\d))/g;

      if (filterDatas) {
        const _copyFilterDatas = filterDatas.slice();

        _copyFilterDatas.sort(
          (pre, cur) =>
            pre.Outbound.Duration +
            pre.Inbound.Duration -
            (cur.Outbound.Duration + cur.Inbound.Duration),
        );

        const durationAverage = Math.floor(
          filterDatas
            .map(data => (data.Outbound.Duration + data.Inbound.Duration) / 2)
            .reduce((pre, cur) => {
              pre = pre + cur;
              return pre;
            }, 0) / filterDatas.length,
        );

        setDurationAverage({
          time: `${Math.floor(durationAverage / 60)}시간${Math.floor(
            durationAverage % 60,
          )}분`,
          price:
            _copyFilterDatas &&
            _copyFilterDatas[0] &&
            _copyFilterDatas[0].price.toString().replace(regExp, ','),
        });
      }
    }, [durationData, filterDatas]);

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
          <S.CategoryTab onClick={changeCategory}>
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
              <em>₩ {durationAverage && durationAverage.price}</em>
              <small>(평균) {durationAverage && durationAverage.time}</small>
            </S.TabItem>
            <S.TabItem
              id="recommend"
              onClick={changeCategory}
              isActive={isActive === 'recommend'}
              role="button"
              tabindex="0"
            >
              <p>추천순</p>
              <em>₩ 0</em>
              <small>(평균) 00시간 00분</small>
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
