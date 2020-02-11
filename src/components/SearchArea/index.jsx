import React from 'react';
import SelectWayTab from './SelectWayTab';
import SelectAirport from './SelectAirport';
import SelectDate from './SelectDate';
import SelectOption from './SelectOption';
import CheckBox from '../Common/CheckBox';
import * as S from './SearchAreaStyled';
import Button from '../Common/Button';

const SearchArea = () => {
  return (
    <S.SearchWrapper>
      <S.Greeting>어디로 떠나볼까요?</S.Greeting>
      <S.SearchForm>
        <SelectWayTab />
        <S.SearchTop>
          <SelectAirport />
          <SelectDate />
          <SelectOption />
        </S.SearchTop>
        <S.SearchBottom>
          <CheckBox label="직항" id="nonstop" isDisable={false} />
          <Button text="항공권 검색" size="medium" color="blue" image="plane" />
        </S.SearchBottom>
      </S.SearchForm>
    </S.SearchWrapper>
  );
};

export default SearchArea;
