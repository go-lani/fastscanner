import React, { useState, useEffect } from 'react';
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
  momentOutDate,
  momentInDate,
  cabinClass,
  adults,
  children,
  infants,
  stops,
  selectOutboundDate,
  selectInboundDate,
  selectMomentOutboundDate,
  selectMoemntInboundDate,
  selectCabinClass,
  selectAdults,
  selectChildren,
  selectInfants,
  selectStops,
  isOpen,
  isHeader,
  history,
}) => {
  const [originInputValue, setOriginInputValue] = useState(originPlace);
  const [destinationInputValue, setDestinationInputValue] = useState();

  function originInputCheck(value) {
    setOriginInputValue(value);
  }

  function destinationInputCheck(value) {
    setDestinationInputValue(value);
  }

  useEffect(() => {
    console.log('originInputValue', originInputValue);
    console.log('destinationInputValue', destinationInputValue);
  }, [originInputValue, destinationInputValue]);

  function searchSubmit() {
    const originCode = originPlace.slice(0, -4).toLowerCase();

    const destinationCode =
      destinationPlace && destinationPlace.slice(0, -4).toLowerCase();

    const outboundCode = outboundDate
      .split('-')
      .join('')
      .slice(-6);

    const inboundCode =
      inboundDate &&
      inboundDate
        .split('-')
        .join('')
        .slice(-6);

    const params = qs.stringify({
      adults: adults,
      children: children,
      cabinclass: cabinClass,
      infants: 0,
      rtn: way === 'round' ? 1 : 0,
      preferdirects: stops ? false : true,
    });

    function resetSearchList() {
      searchOrigin('');
      searchDestination('');
    }

    if (way === 'round') {
      if (!originInputValue) return alert('출발지를 선택해주세요.');
      if (!destinationInputValue) return alert('도착지를 선택해주세요.');
      if (!inboundDate) return alert('입국날짜를 선택해주세요.');

      history.push(
        `/transport/flights/${originCode}/${destinationCode}/${outboundCode}/${inboundCode}/?${params}`,
      );
      resetSearchList();
    } else {
      if (!originInputValue) return alert('출발지를 선택해주세요.');
      if (!destinationInputValue) return alert('도착지를 선택해주세요.');

      history.push(
        `/transport/flights/${originCode}/${destinationCode}/${outboundCode}/?${params}`,
      );
      resetSearchList();
    }
  }

  const checkNonstops = e => {
    selectStops(e.target.checked ? 0 : 1);
  };

  return (
    <S.SearchWrapper isOpen={isOpen} isHeader={isHeader}>
      <S.Greeting isHeader={isHeader}>어디로 떠나볼까요?</S.Greeting>
      <S.SearchForm isHeader={isHeader} isOpen={isOpen}>
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
            originInputCheck={originInputCheck}
            destinationInputCheck={destinationInputCheck}
          />
          <SelectDate
            way={way}
            outboundDate={outboundDate}
            inboundDate={inboundDate}
            selectOutboundDate={selectOutboundDate}
            selectInboundDate={selectInboundDate}
            momentOutDate={momentOutDate}
            momentInDate={momentInDate}
            selectMomentOutboundDate={selectMomentOutboundDate}
            selectMoemntInboundDate={selectMoemntInboundDate}
          />
          <SelectOption
            cabinClass={cabinClass}
            adults={adults}
            children={children}
            infants={infants}
            selectCabinClass={selectCabinClass}
            selectAdults={selectAdults}
            selectChildren={selectChildren}
            selectInfants={selectInfants}
            originPlace={originPlace}
            destinationPlace={destinationPlace}
            outboundDate={outboundDate}
            inboundDate={inboundDate}
          />
        </S.SearchTop>
        <S.SearchBottom>
          <CheckBox
            label="직항"
            id="nonstop"
            isDisable={false}
            size="large"
            onClick={checkNonstops}
          />
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
