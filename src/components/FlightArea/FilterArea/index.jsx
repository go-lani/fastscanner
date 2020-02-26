import React, { useState, useEffect, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import qs from 'query-string';
import * as S from './FilterAreaStyled';
import DropBox from '../../Common/DropBox';
import CheckBox from '../../Common/CheckBox';
import A11yTitle from '../../Common/A11yTitle';
import useTime from '../../../hooks/useTime';
import Loading from './Loading';
import { useSelector } from 'react-redux';

const valuetext = value => {
  return `${Math.floor(value[0] / 2)}시 ${value[1] / 2 ? '30' : '00'}분`;
};

const durationValueText = value => {
  return `${Math.floor(value / 60)}시 ${value % 60}분`;
};

const FilterArea = React.memo(
  ({
    location,
    filterModalVisible,
    setFilterModalVisible,
    originDatas,
    directDisable,
    viaDisable,
    filterOptions,
    filterLiveSearch,
    setFilterOptions,
  }) => {
    const [outboundTime, setOutboundTime] = useState([0, 48]);
    const [inboundTime, setInboundTime] = useState([0, 48]);
    const [durationTime, setDurationTime] = useState(1000);
    const [minDuration, setMinDuration] = useState(null);
    const [maxDuration, setMaxDuration] = useState(null);
    const [isOneway, setIsOneway] = useState();
    const [
      outboundStartTime,
      outboundStartFormat,
      outboundEndTime,
      outboundEndFormat,
    ] = useTime(outboundTime);
    const [
      inboundStartTime,
      inboundStartFormat,
      inboundEndTime,
      inboundEndFormat,
    ] = useTime(inboundTime);

    useEffect(() => {
      const query = qs.parse(location.search);
      const { rtn } = query;

      setIsOneway(!+rtn);
    }, [location]);

    const loading = useSelector(state => state.flight.loading);

    // 필터조건 탭 닫기
    const closeFilterArea = useCallback(() => {
      setFilterModalVisible(false);
    }, [setFilterModalVisible]);

    // 직항,경유 선택
    const setWays = useCallback(
      ({ target: { id, checked } }) => {
        setFilterOptions({ [id]: checked });
        filterLiveSearch();
      },
      [filterLiveSearch, setFilterOptions],
    );

    // 출국 출발시간 옵션
    const handleChangeOutbound = useCallback((event, newValue) => {
      setOutboundTime(newValue);
    }, []);

    const handleChangeOutboundDatas = useCallback(() => {
      setFilterOptions({
        OutBound: {
          start: outboundStartFormat.split(':').join(''),
          end: outboundEndFormat.split(':').join(''),
        },
      });
      filterLiveSearch();
    }, [
      filterLiveSearch,
      outboundEndFormat,
      outboundStartFormat,
      setFilterOptions,
    ]);

    // 입국 출발시간 옵션
    const handleChangeInbound = useCallback((event, newValue) => {
      setInboundTime(newValue);
    }, []);

    const handleChangeInboundDatas = useCallback(() => {
      setFilterOptions({
        InBound: {
          start: inboundStartFormat.split(':').join(''),
          end: inboundEndFormat.split(':').join(''),
        },
      });
      filterLiveSearch();
    }, [
      filterLiveSearch,
      inboundEndFormat,
      inboundStartFormat,
      setFilterOptions,
    ]);

    // 총 소요시간 필터
    useEffect(() => {
      if (originDatas && originDatas.length) {
        const roundDurations = originDatas.map(originData =>
          originData.Inbound && originData.Inbound.Duration
            ? originData.Outbound.Duration + originData.Inbound.Duration
            : originData.Outbound.Duration,
        );
        setMinDuration(Math.min(...roundDurations));
        setMaxDuration(Math.max(...roundDurations));
      }
    }, [originDatas]);

    useEffect(() => {
      setDurationTime(maxDuration);
    }, [maxDuration]);

    const handleChangeDuration = useCallback((event, newValue) => {
      setDurationTime(newValue);
    }, []);

    const handleChangeDurationDatas = useCallback(
      (event, newValue) => {
        setFilterOptions({
          Duration: newValue,
        });

        filterLiveSearch();
      },
      [filterLiveSearch, setFilterOptions],
    );

    // 최저가격
    const directLowPrice =
      originDatas &&
      originDatas.filter(data =>
        originDatas.Inbound
          ? data.Outbound.Stops.length === 0 && data.Inbound.Stops.length === 0
          : data.Outbound.Stops.length === 0,
      )[0];

    const viaLowPrice =
      originDatas &&
      originDatas.filter(data =>
        originDatas.Inbound
          ? data.Outbound.Stops.length !== 0 || data.Inbound.Stops.length !== 0
          : data.Outbound.Stops.length !== 0,
      )[0];

    return (
      <>
        <S.FilterOverlay
          onClick={closeFilterArea}
          filterModalVisible={filterModalVisible}
        ></S.FilterOverlay>
        <S.FilterAreaLayout filterModalVisible={filterModalVisible}>
          {loading ? (
            <Loading />
          ) : (
            <>
              <A11yTitle>항공권 설정</A11yTitle>
              <S.FilterHeader>
                필터(조건)
                <S.FilterHeaderCloseButton onClick={closeFilterArea}>
                  완료
                </S.FilterHeaderCloseButton>
              </S.FilterHeader>
              <S.DropBoxList>
                <DropBox title="경유">
                  <S.DropItem>
                    <CheckBox
                      size="medium"
                      label="직항"
                      id="direct"
                      checked={filterOptions.direct}
                      isDisable={directDisable}
                      onChange={setWays}
                      price={directLowPrice && directLowPrice.price}
                    />
                  </S.DropItem>
                  <S.DropItem>
                    <CheckBox
                      size="medium"
                      label="경유"
                      id="via"
                      checked={filterOptions.via}
                      isDisable={viaDisable}
                      onChange={setWays}
                      price={viaLowPrice && viaLowPrice.price}
                    />
                  </S.DropItem>
                </DropBox>
                <DropBox title="출발 시간대 설정" range={true}>
                  <S.DropItem>
                    <S.DropTitleBox>
                      <S.DropTitle>가는날 출발시간</S.DropTitle>
                      <p>{`${outboundStartTime} - ${outboundEndTime}`}</p>
                    </S.DropTitleBox>
                    <S.RangeSlider
                      value={outboundTime}
                      onChange={handleChangeOutbound}
                      onChangeCommitted={handleChangeOutboundDatas}
                      aria-labelledby="range-slider"
                      getAriaValueText={valuetext}
                      min={0}
                      max={48}
                    />
                  </S.DropItem>
                  {!isOneway && (
                    <S.DropItem>
                      <S.DropTitleBox>
                        <S.DropTitle>오는날 출발시간</S.DropTitle>
                        <p>{`${inboundStartTime} - ${inboundEndTime}`}</p>
                      </S.DropTitleBox>
                      <S.RangeSlider
                        value={inboundTime}
                        onChange={handleChangeInbound}
                        onChangeCommitted={handleChangeInboundDatas}
                        aria-labelledby="range-slider"
                        getAriaValueText={valuetext}
                        min={0}
                        max={48}
                      />
                    </S.DropItem>
                  )}
                </DropBox>
                <DropBox title="총 소요시간 설정" range={true}>
                  <S.DropItem>
                    <S.DropTitleBox>
                      <S.DropTitle>총 소요시간</S.DropTitle>
                      <p>{`${Math.floor(minDuration / 60)}시간 ${minDuration %
                        60}분 - ${Math.floor(
                        durationTime / 60,
                      )}시간 ${durationTime % 60}분`}</p>
                    </S.DropTitleBox>
                    <S.RangeSlider
                      value={durationTime || 1000}
                      getAriaValueText={durationValueText}
                      onChange={handleChangeDuration}
                      onChangeCommitted={handleChangeDurationDatas}
                      step={60}
                      min={minDuration || 0}
                      max={maxDuration || 1000}
                    />
                  </S.DropItem>
                </DropBox>
              </S.DropBoxList>
            </>
          )}
        </S.FilterAreaLayout>
      </>
    );
  },
);

export default withRouter(FilterArea);
