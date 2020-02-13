import React, { createRef } from 'react';
import SelectWayTab from './SelectWayTab';
import SelectAirport from './SelectAirport';
import SelectDate from './SelectDate';
import SelectOption from './SelectOption';
import CheckBox from '../Common/CheckBox';
import * as S from './SearchAreaStyled';
import Button from '../Common/Button';
import SearchAreaPopup from './SearchAreaPopup';
import { withRouter } from 'react-router-dom';

const SearchArea = ({
  way,
  changeWay,
  searchOrigin,
  selectOrigin,
  originSearchList,
  originName,
  searchDestination,
  selectDestination,
  destinationSearchList,
  destinationName,
  inboundDate,
  cabinClass,
  countAdults,
  countChildren,
  selectOutboundDate,
  selectInboundDate,
  selectCabinClass,
  selectAdults,
  selectChildren,
  isOpen,
  isHeader,
  history,
}) => {
  function searchSubmit() {
    history.push('/transport/flights');
  }

  return (
    <S.SearchWrapper isOpen={isOpen} isHeader={isHeader}>
      <S.Greeting isHeader={isHeader}>어디로 떠나볼까요?</S.Greeting>
      <S.SearchForm isHeader={isHeader}>
        <SelectWayTab way={way} changeWay={changeWay} />
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
          <SelectDate
            way={way}
            inboundDate={inboundDate}
            selectOutboundDate={selectOutboundDate}
            selectInboundDate={selectInboundDate}
          />
          <SelectOption
            cabinClass={cabinClass}
            countAdults={countAdults}
            countChildren={countChildren}
            selectCabinClass={selectCabinClass}
            selectAdults={selectAdults}
            selectChildren={selectChildren}
          />
        </S.SearchTop>
        <S.SearchBottom>
          <CheckBox label="직항" id="nonstop" isDisable={false} />
          <Button
            type="button"
            text="항공권 검색"
            size="medium"
            color="blue"
            image="plane"
            onClick={searchSubmit}
          />
        </S.SearchBottom>
      </S.SearchForm>
      <SearchAreaPopup />
    </S.SearchWrapper>
  );
};

export default withRouter(SearchArea);
