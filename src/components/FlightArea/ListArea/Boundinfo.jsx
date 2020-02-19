import React from 'react';
import * as S from './ListAreaStyled';
import A11yTitle from '../../Common/A11yTitle';
import moment from 'moment';
import uuid from 'uuid';
import { useSelector } from 'react-redux';

const Boundinfo = ({
  title,
  info: { Departure, Arrival, Duration, StopsName, AirlinesInfo },
}) => {
  const departureName = useSelector(state => state.search.originPlace).split(
    '-',
  )[0];
  const arrivalName = useSelector(state => state.search.destinationPlace).split(
    '-',
  )[0];
  return (
    <S.FlightOutbound>
      <A11yTitle as="p">{title}</A11yTitle>
      <S.AirlineInfo>
        {AirlinesInfo.length > 1 && (
          <div>
            {AirlinesInfo.map(info => (
              <span key={uuid.v4()}>{info.name}</span>
            ))}
          </div>
        )}
        {AirlinesInfo.length === 1 && (
          <>
            <img src={AirlinesInfo[0].imgUrl} alt={AirlinesInfo[0].name} />
            <span>{AirlinesInfo[0].name}</span>
          </>
        )}
      </S.AirlineInfo>
      <S.FlyInfo>
        <S.DepartureInfo>
          <S.DepartureTime>
            {moment(Departure).format('MMM Do')}
          </S.DepartureTime>
          <S.DepartureTime>
            {moment(Departure).format('a h:mm')}
          </S.DepartureTime>
          <S.DeparturePlace>{departureName}</S.DeparturePlace>
        </S.DepartureInfo>
        <S.FlightTimeInfo>
          <S.TimeContainer>
            <span>{`${Math.floor(Duration / 60)}시간${Duration % 60}분`}</span>
            <S.StopsInfo>
              {StopsName.length
                ? StopsName.map(item => <i key={uuid.v4()} />)
                : null}
            </S.StopsInfo>
            {StopsName.length ? (
              <span>{StopsName.length}회 경유</span>
            ) : (
              <span>직항</span>
            )}
          </S.TimeContainer>
          <S.ImgOuter>
            <img src="/images/flight.png" alt="flight" />
          </S.ImgOuter>
        </S.FlightTimeInfo>
        <S.ArriveInfo>
          <S.ArriveTime>{moment(Arrival).format('MMM Do')}</S.ArriveTime>
          <S.ArriveTime>{moment(Arrival).format('a h:mm')}</S.ArriveTime>
          <S.ArrivePlace>{arrivalName}</S.ArrivePlace>
        </S.ArriveInfo>
      </S.FlyInfo>
    </S.FlightOutbound>
  );
};

export default Boundinfo;
