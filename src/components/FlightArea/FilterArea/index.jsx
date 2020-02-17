import React, { useState } from 'react';
import * as S from './FilterAreaStyled';
import DropBox from '../../Common/DropBox';
import CheckBox from '../../Common/CheckBox';
import A11yTitle from '../../Common/A11yTitle';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import useTime from '../../../hooks/useTime';

const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

function valuetext(value) {
  return `${Math.floor(value[0] / 2)}시 ${value[1] / 2 ? '30' : '00'}분`;
}

const FilterArea = React.memo(() => {
  const classes = useStyles();
  const [outboundTime, setOutboundTime] = useState([0, 48]);
  const [inboundTime, setInboundTime] = useState([0, 48]);
  const [outboundStartTime, outboundEndTime] = useTime(outboundTime);
  const [inboundStartTime, inboundEndTime] = useTime(inboundTime);

  const handleChangeOutbound = (event, newValue) => {
    setOutboundTime(newValue);
  };

  const handleChangeInbound = (event, newValue) => {
    setInboundTime(newValue);
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
            <CheckBox size="medium" label="1번 경유" id="nonstopp2" />
          </S.DropItem>
          <S.DropItem>
            <CheckBox size="medium" label="2번 이상 경유 " id="nonstopp3" />
          </S.DropItem>
        </DropBox>
        <DropBox title="출발 시간대 설정">
          <S.DropItem>
            <Typography gutterBottom>가는날 출발시간</Typography>
            <p>{`${outboundStartTime} - ${outboundEndTime}`}</p>
            <Slider
              value={outboundTime}
              onChange={handleChangeOutbound}
              aria-labelledby="range-slider"
              getAriaValueText={valuetext}
              min={0}
              max={48}
            />
          </S.DropItem>
          <S.DropItem>
            <Typography gutterBottom>오는날 출발시간</Typography>
            <p>{`${inboundStartTime} - ${inboundEndTime}`}</p>
            <Slider
              value={inboundTime}
              onChange={handleChangeInbound}
              aria-labelledby="range-slider"
              getAriaValueText={valuetext}
              min={0}
              max={48}
            />
          </S.DropItem>
        </DropBox>
        <DropBox title="총 소요시간 설정">
          <CheckBox size="medium" label="직항" id="nonstopp4" />
          <CheckBox size="medium" label="1번 경유" id="nonstopp5" />
          <CheckBox size="medium" label="2번 이상 경유 " id="nonstopp6" />
        </DropBox>
      </S.DropBoxList>
    </S.FilterAreaLayout>
  );
});

export default FilterArea;
