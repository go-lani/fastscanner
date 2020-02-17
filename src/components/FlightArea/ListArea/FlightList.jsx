import React from 'react';
import * as S from './ListAreaStyled';
import Button from '../../Common/Button';

const FlightList = props => {
  return (
    <>
      <S.FlightList>
        <S.FlightInfo>
          <S.FlightOutbound>
            <S.AirlineInfo>
              <img src="/images/KE.png" alt="airline" />
              {/* <span>대한항공</span> */}
              {/* <span>항공편</span> */}
            </S.AirlineInfo>
            <S.FlyInfo>
              <S.DepartureInfo>
                <p>오후 11:50</p>
                <span>ICN</span>
              </S.DepartureInfo>
              <S.FlightTimeInfo>
                <S.TimeContainer>
                  <span>20시간 35분</span>
                  <S.StopsInfo>
                    <li />
                  </S.StopsInfo>
                  <span>1회 경유</span>
                </S.TimeContainer>
                <img src="/images/flight.png" alt="flight" />
              </S.FlightTimeInfo>
              <S.ArriveInfo>
                <p>오후 12:25</p>
                <span>CDG</span>
              </S.ArriveInfo>
            </S.FlyInfo>
          </S.FlightOutbound>
          <S.FlightInbound>
            <S.AirlineInfo>
              <img src="/images/KE.png" alt="airline" />
              {/* <span>대한항공</span> */}
              {/* <span>항공편</span> */}
            </S.AirlineInfo>
            <S.FlyInfo>
              <S.DepartureInfo>
                <p>오후 2:25</p>
                <span>CDG</span>
              </S.DepartureInfo>
              <S.FlightTimeInfo>
                <S.TimeContainer>
                  <span>20시간 35분</span>
                  <S.StopsInfo>
                    <li />
                    <li />
                  </S.StopsInfo>
                  <span>2회 경유</span>
                </S.TimeContainer>
                <img src="/images/flight.png" alt="flight" />
              </S.FlightTimeInfo>
              <S.ArriveInfo>
                <p>오후 4:45</p>
                <span>ICN</span>
              </S.ArriveInfo>
            </S.FlyInfo>
          </S.FlightInbound>
        </S.FlightInfo>
        <S.FlightPrice>
          <span>총 27건 중 최저가</span>
          <p>₩733,000</p>
          <Button
            type="button"
            text="선택"
            size="medium"
            color="blue"
            image="plane"
          />
        </S.FlightPrice>
      </S.FlightList>
    </>
  );
};

export default FlightList;
