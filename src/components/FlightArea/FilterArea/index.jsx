import React, { useState, useEffect } from 'react';
import * as S from './FilterAreaStyled';
import DropBox from '../../Common/DropBox';
import CheckBox from '../../Common/CheckBox';
import A11yTitle from '../../Common/A11yTitle';
import useTime from '../../../hooks/useTime';

function valuetext(value) {
  return `${Math.floor(value[0] / 2)}시 ${value[1] / 2 ? '30' : '00'}분`;
}

function durationValueText(value) {
  return `${Math.floor(value / 60)}시 ${value % 60}분`;
}

const FilterArea = React.memo(
  ({
    filterModalVisible,
    setFilterModalVisible,
    originDatas,
    changeFilterDatas,
    directDisable,
    viaDisable,
    filterOptions,
    setFilterOptions,
  }) => {
    const [outboundTime, setOutboundTime] = useState([0, 48]);
    const [inboundTime, setInboundTime] = useState([0, 48]);
    const [durationTime, setDurationTime] = useState(1000);
    const [minDuration, setMinDuration] = useState(null);
    const [maxDuration, setMaxDuration] = useState(null);
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

    // 필터조건 탭 닫기
    const closeFilterArea = () => {
      setFilterModalVisible(false);
    };

    // 직항,경유 선택
    const setWays = ({ target: { id, checked } }) => {
      setFilterOptions({ [id]: checked });
      changeFilterDatas();
    };

    // 출국 출발시간 옵션
    const handleChangeOutbound = (event, newValue) => {
      setOutboundTime(newValue);
    };

    const handleChangeOutboundDatas = () => {
      setFilterOptions({
        OutBound: {
          start: outboundStartFormat.split(':').join(''),
          end: outboundEndFormat.split(':').join(''),
        },
      });
      changeFilterDatas();
    };

    // 입국 출발시간 옵션
    const handleChangeInbound = (event, newValue) => {
      setInboundTime(newValue);
    };

    const handleChangeInboundDatas = () => {
      setFilterOptions({
        InBound: {
          start: inboundStartFormat.split(':').join(''),
          end: inboundEndFormat.split(':').join(''),
        },
      });
      changeFilterDatas();
    };

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

    const handleChangeDuration = (event, newValue) => {
      setDurationTime(newValue);
    };

    const handleChangeDurationDatas = (event, newValue) => {
      setFilterOptions({
        Duration: newValue,
      });

      changeFilterDatas();
    };

    return (
      <>
        <S.FilterOverlay
          onClick={closeFilterArea}
          filterModalVisible={filterModalVisible}
        ></S.FilterOverlay>
        <S.FilterAreaLayout filterModalVisible={filterModalVisible}>
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
                />
              </S.DropItem>
            </DropBox>
            <DropBox title="출발 시간대 설정" range={true}>
              <S.DropItem>
                <S.DropTitleBox>
                  <S.DropTitle>가는날 출발시간</S.DropTitle>
                  <p>{`${outboundStartFormat} - ${outboundEndFormat}`}</p>
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
              <S.DropItem>
                <S.DropTitleBox>
                  <S.DropTitle>오는날 출발시간</S.DropTitle>
                  <p>{`${inboundStartFormat} - ${inboundEndFormat}`}</p>
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
        </S.FilterAreaLayout>
      </>
    );
  },
);

export default FilterArea;
