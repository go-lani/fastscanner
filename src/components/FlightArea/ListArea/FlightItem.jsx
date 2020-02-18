import React from 'react';
import * as S from './ListAreaStyled';
import Button from '../../Common/Button';
import Boundinfo from './Boundinfo';

const FlightItem = props => {
  return (
    <>
      <S.FlightItem>
        <S.FlightInfo>
          {/* 바운드 info container에 legId를 던져서 container에서 legId를 검색 */}
          <Boundinfo title="출국정보" />
          <Boundinfo title="입국정보" />
        </S.FlightInfo>
        <S.FlightPrice>
          <p>총 27건 중 최저가</p>
          <em>₩100,000,000</em>
          <Button
            type="button"
            text="예약하기"
            size="small"
            color="blue"
            image="plane"
          />
        </S.FlightPrice>
      </S.FlightItem>
    </>
  );
};

export default FlightItem;
