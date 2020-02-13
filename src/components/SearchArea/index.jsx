import React from 'react';
import SelectWayTab from './SelectWayTab';
import SelectAirport from './SelectAirport';
import SelectDate from './SelectDate';
import SelectOption from './SelectOption';
import CheckBox from '../Common/CheckBox';
import * as S from './SearchAreaStyled';
import Button from '../Common/Button';
import SearchAreaPopup from './SearchAreaPopup';

const SearchArea = ({
  searchOrigin,
  selectOrigin,
  originSearchList,
  originName,
  searchDestination,
  selectDestination,
  destinationSearchList,
  destinationName,
}) => {
  return (
    <S.SearchWrapper isOpen={true}>
      <S.Greeting>어디로 떠나볼까요?</S.Greeting>
      <S.SearchForm isHeader={false}>
        <SelectWayTab />
        <S.SearchTop>
          <SelectAirport
            originSearchList={originSearchList}
            searchOrigin={searchOrigin}
            selectOrigin={selectOrigin}
            originName={originName}
            destinationSearchList={destinationSearchList}
            searchDestination={searchDestination}
            selectDestination={selectDestination}
            destinationName={destinationName}
          />
          <SelectDate />
          <SelectOption />
        </S.SearchTop>
        <S.SearchBottom>
          <CheckBox label="직항" id="nonstop" isDisable={false} />
          <Button text="항공권 검색" size="medium" color="blue" image="plane" />
        </S.SearchBottom>
      </S.SearchForm>
      <SearchAreaPopup />
    </S.SearchWrapper>
  );
};

export default SearchArea;
