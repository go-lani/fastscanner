import React from 'react';
import qs from 'query-string';
import { withRouter } from 'react-router-dom';
import SelectWayTab from './SelectWayTab';
import SelectAirport from './SelectAirport';
import SelectDate from './SelectDate';
import SelectOption from './SelectOption';
import CheckBox from '../Common/CheckBox';
import Button from '../Common/Button';
import SearchAreaPopup from './SearchAreaPopup';
import * as S from './SearchAreaStyled';

const SearchArea = ({
  way,
  changeWay,
  searchOrigin,
  selectOrigin,
  originSearchList,
  originName,
  originPlace,
  searchDestination,
  selectDestination,
  destinationSearchList,
  destinationName,
  destinationPlace,
  inboundDate,
  outboundDate,
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
    const originCode = originPlace.slice(0, -4).toLowerCase();
    const outboundCode = outboundDate
      .split('-')
      .join('')
      .slice(-6);
    const inboundCode = inboundDate
      .split('-')
      .join('')
      .slice(-6);

    const params = qs.stringify({
      adults: 1,
    });

    if (way === 'oneway') {
    } else {
      // history.push('/transport/flights/');
    }
    history.push(
      `/transport/flights/${originCode}/${outboundCode}/${inboundCode}/?${params}`,
    );
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
