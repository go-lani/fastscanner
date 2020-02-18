import React from 'react';
import * as S from './ListAreaStyled';
import A11yTitle from '../../Common/A11yTitle';

const Boundinfo = props => {
  return (
    <S.FlightOutbound>
      <A11yTitle as="p">{props.title}</A11yTitle>
      <S.AirlineInfo>
        <img
          src="https://s1.apideeplink.com/images/airlines/OZ.png"
          alt="airline"
        />
        <span>Nordic Regional Airlines</span>
      </S.AirlineInfo>
      <S.FlyInfo>
        <S.DepartureInfo>
          <S.DepartureTime>오후 11:50</S.DepartureTime>
          <S.DeparturePlace>ICN</S.DeparturePlace>
        </S.DepartureInfo>
        <S.FlightTimeInfo>
          <S.TimeContainer>
            <span>20시간 35분</span>
            <S.StopsInfo>
              <i />
            </S.StopsInfo>
            <span>1회 경유</span>
          </S.TimeContainer>
          <S.ImgOuter>
            <img src="/images/flight.png" alt="flight" />
          </S.ImgOuter>
        </S.FlightTimeInfo>
        <S.ArriveInfo>
          <S.ArriveTime>오후 12:25</S.ArriveTime>
          <S.ArrivePlace>CDG</S.ArrivePlace>
        </S.ArriveInfo>
      </S.FlyInfo>
    </S.FlightOutbound>
  );
};

export default Boundinfo;
