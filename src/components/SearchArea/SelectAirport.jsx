import React from 'react';
import SwapHorizRoundedIcon from '@material-ui/icons/SwapHorizRounded';
import A11yTitle from '../common/A11yTitle';
import * as S from './SearchAreaStyled';

const SelectAirport = () => {
  const changeAirport = () => {
    console.log('출발지 도착지를 반전시킵니다.');
  };
  return (
    <fieldset className="option-field airport">
      <S.FieldTitle>출발지 / 도착지</S.FieldTitle>
      <A11yTitle as="label" htmlFor="airport-depature">
        출발지
      </A11yTitle>
      <S.AirportInput
        type="text"
        id="airport-depature"
        defaultValue="인천(ICN)"
      />
      <S.AirportChangeButton onClick={changeAirport}>
        <SwapHorizRoundedIcon
          type="button"
          style={{ color: '#666' }}
          fontSize="large"
        />
      </S.AirportChangeButton>
      <A11yTitle as="label" htmlFor="airport-arrived">
        도착지
      </A11yTitle>
      <S.AirportInput
        type="text"
        id="airport-arrived"
        placeholder="도착지 선택"
      />
    </fieldset>
  );
};

export default SelectAirport;
