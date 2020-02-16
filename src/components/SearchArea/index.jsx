import React, { useState, useEffect } from 'react';
import qs from 'query-string';
import { withRouter } from 'react-router-dom';
import SelectWayTab from './SelectWayTab';
import SelectDateContainer from '../../container/SelectDateContainer';
import SelectAirportContainer from '../../container/SelectAirportContainer';
import SelectOptionContainer from '../../container/SelectOptionContainer';

import CheckBox from '../Common/CheckBox';
import Button from '../Common/Button';
import SearchAreaPopup from './SearchAreaPopup';
import * as S from './SearchAreaStyled';

const SearchArea = ({
  isOpen,
  isHeader,
  history,
  way,
  originPlace,
  destinationPlace,
  inboundDate,
  outboundDate,
  cabinClass,
  adults,
  children,
  infants,
  stops,
  changeWay,
  selectStops,
  searchOrigin,
  searchDestination,
}) => {
  const [originInputValue, setOriginInputValue] = useState(originPlace);
  const [destinationInputValue, setDestinationInputValue] = useState(
    destinationPlace,
  );

  function originInputCheck(value) {
    setOriginInputValue(value);
  }

  function destinationInputCheck(value) {
    setDestinationInputValue(value);
  }

  function resetSearchList() {
    searchOrigin('');
    searchDestination('');
  }

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

    if (way === 'round') {
      if (!originInputValue) return alert('출발지를 선택해주세요.');
      if (!destinationInputValue) return alert('도착지를 선택해주세요.');
      if (!inboundDate) return alert('입국날짜를 선택해주세요.');

      history.push(
        `/transport/flights/${originCode}/${destinationCode}/${outboundCode}/${inboundCode}/?${params}`,
      );
    } else {
      if (!originInputValue) return alert('출발지를 선택해주세요.');
      if (!destinationInputValue) return alert('도착지를 선택해주세요.');

      history.push(
        `/transport/flights/${originCode}/${destinationCode}/${outboundCode}/?${params}`,
      );
    }
  }

  useEffect(() => {
    resetSearchList();
  }, [resetSearchList]);

  const checkNonstops = e => {
    selectStops(e.target.checked ? 0 : 1);
  };

  return (
    <S.SearchWrapper isOpen={isOpen} isHeader={isHeader}>
      <S.Greeting isHeader={isHeader}>어디로 떠나볼까요?</S.Greeting>
      <S.SearchForm isHeader={isHeader} isOpen={isOpen}>
        <SelectWayTab way={way} changeWay={changeWay} />
        <S.SearchTop>
          <SelectAirportContainer
            originInputCheck={originInputCheck}
            destinationInputCheck={destinationInputCheck}
          />
          <SelectDateContainer />
          <SelectOptionContainer />
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
