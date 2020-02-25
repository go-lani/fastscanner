import React from 'react';
import * as S from './ListAreaStyled';
import A11yTitle from '../../Common/A11yTitle';
import moment from 'moment';
import uuid from 'uuid';
import { useSelector } from 'react-redux';

const Boundinfo = React.memo(
  ({
    title,
    info: { Departure, Arrival, Duration, StopsInfo, AirlinesInfo },
  }) => {
    const departureName = useSelector(
      state => state.search.originPlace,
      [],
    ).split('-')[0];
    const arrivalName = useSelector(
      state => state.search.destinationPlace,
      [],
    ).split('-')[0];
    return (
      <S.FlightBound>
        <A11yTitle as="p">{title}</A11yTitle>
        <S.AirlineInfo>
          {AirlinesInfo && (
            <>
              {AirlinesInfo.map(info => (
                <S.AirlineList key={uuid.v4()}>
                  <img src={info.imgUrl} alt={info.name} />
                  <S.AirlineName>{info.name}</S.AirlineName>
                </S.AirlineList>
              ))}
            </>
          )}
        </S.AirlineInfo>
        <S.FlyInfo>
          <S.DepartureInfo>
            <S.DepartureDate>
              {moment(Departure).format('MMM Do')}
            </S.DepartureDate>
            <S.DepartureTime>
              {moment(Departure).format('a h:mm')}
            </S.DepartureTime>
            <S.DeparturePlace>
              {title === '출국정보' ? departureName : arrivalName}
            </S.DeparturePlace>
          </S.DepartureInfo>
          <S.FlightTimeInfo>
            <S.TimeContainer>
              <S.DurationText>{`${Math.floor(Duration / 60)}시간${Duration %
                60}분`}</S.DurationText>
              <S.StopsInfo>
                {StopsInfo && StopsInfo.length
                  ? StopsInfo.map(item => <i key={uuid.v4()} />)
                  : null}
              </S.StopsInfo>
              {StopsInfo.length ? (
                <>
                  <S.StopsDetail>
                    <S.StopsText>{StopsInfo.length}회 경유</S.StopsText>
                    <ul>
                      {StopsInfo.map(stopInfo => (
                        <li key={uuid.v4()}>
                          {`${stopInfo.name}, ${stopInfo.countryName}`}
                        </li>
                      ))}
                    </ul>
                  </S.StopsDetail>
                </>
              ) : (
                <S.StopsText>직항</S.StopsText>
              )}
            </S.TimeContainer>
            <S.ImgOuter>
              <img src="/images/flight.png" alt="flight" />
            </S.ImgOuter>
          </S.FlightTimeInfo>
          <S.ArriveInfo>
            <S.ArriveDate>{moment(Arrival).format('MMM Do')}</S.ArriveDate>
            <S.ArriveTime>{moment(Arrival).format('a h:mm')}</S.ArriveTime>
            <S.ArrivePlace>
              {title === '출국정보' ? arrivalName : departureName}
            </S.ArrivePlace>
          </S.ArriveInfo>
        </S.FlyInfo>
      </S.FlightBound>
    );
  },
);

export default Boundinfo;
