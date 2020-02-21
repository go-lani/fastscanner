import React, { useState, useEffect } from 'react';
import * as S from './FilterAreaStyled';
import DropBox from '../../Common/DropBox';
import CheckBox from '../../Common/CheckBox';
import A11yTitle from '../../Common/A11yTitle';
import useTime from '../../../hooks/useTime';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { debounce } from 'loadsh';

function valuetext(value) {
  return `${Math.floor(value[0] / 2)}시 ${value[1] / 2 ? '30' : '00'}분`;
}

const FilterArea = React.memo(
  ({ filterModalVisible, setFilterModalVisible }) => {
    const originDatas = useSelector(state => state.flight.originDatas);
    const [outboundTime, setOutboundTime] = useState([0, 48]);
    const [inboundTime, setInboundTime] = useState([0, 48]);
    const [durationTime, setDurationTime] = useState(1000);
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

    const handleChangeOutbound = debounce(
      (event, newValue) => {
        setOutboundTime(newValue);
        console.log('aaaa');
      },
      0,
      'later',
    );

    const handleChangeInbound = (event, newValue) => {
      setInboundTime(newValue);
    };

    const handleChangeDuration = (event, newValue) => {
      setDurationTime(newValue);
    };

    const closeFilterArea = () => {
      setFilterModalVisible(false);
    };

    useEffect(() => {
      if (originDatas && originDatas.length) {
        const selectOutboundStartTime = outboundStartFormat.split(':').join('');
        const selectOutboundEndTime = outboundEndFormat.split(':').join('');

        const filterData = originDatas.filter(data => {
          return selectOutboundStartTime <
            moment(data.Outbound.Departure)
              .format('kk:mm')
              .split(':')
              .join('') &&
            selectOutboundEndTime >
              +moment(data.Outbound.Departure)
                .format('kk:mm')
                .split(':')
                .join('')
            ? data
            : null;
        });
        // console.log('filterData', filterData);
      }
      // console.log('originDatas', originDatas);
    }, [originDatas, outboundEndFormat, outboundStartFormat]);

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
                <CheckBox size="medium" label="직항" id="nonstopp" />
              </S.DropItem>
              <S.DropItem>
                <CheckBox size="medium" label="경유" id="nonstopp2" />
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
                </S.DropTitleBox>
                <S.RangeSlider
                  value={durationTime}
                  onChange={handleChangeDuration}
                  min={0}
                  max={1000}
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
