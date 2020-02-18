import React, { useState } from 'react';
import * as S from './FilterAreaStyled';
import DropBox from '../../Common/DropBox';
import CheckBox from '../../Common/CheckBox';
import A11yTitle from '../../Common/A11yTitle';
import useTime from '../../../hooks/useTime';

function valuetext(value) {
  return `${Math.floor(value[0] / 2)}시 ${value[1] / 2 ? '30' : '00'}분`;
}

const FilterArea = React.memo(() => {
  const [outboundTime, setOutboundTime] = useState([0, 48]);
  const [inboundTime, setInboundTime] = useState([0, 48]);
  const [dutaionTime, setDurationTime] = useState([1000]);
  const [outboundStartTime, outboundEndTime] = useTime(outboundTime);
  const [inboundStartTime, inboundEndTime] = useTime(inboundTime);

  const handleChangeOutbound = (event, newValue) => {
    setOutboundTime(newValue);
  };

  const handleChangeInbound = (event, newValue) => {
    setInboundTime(newValue);
  };

  const handleChangeDuration = (event, newValue) => {
    setDurationTime(newValue);
  };

  return (
    <S.FilterAreaLayout>
      <A11yTitle>항공권 설정</A11yTitle>
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
              value={dutaionTime}
              onChange={handleChangeDuration}
              min={0}
              max={1000}
            />
          </S.DropItem>
        </DropBox>
      </S.DropBoxList>
    </S.FilterAreaLayout>
  );
});

export default FilterArea;
