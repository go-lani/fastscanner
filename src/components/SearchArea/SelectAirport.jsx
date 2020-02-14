import React from 'react';
import SwapHorizRoundedIcon from '@material-ui/icons/SwapHorizRounded';
import A11yTitle from '../Common/A11yTitle';
import * as S from './SearchAreaStyled';
import AirportOriginPlaceBox from './AirportOriginPlaceBox';
import AirportDestinationBox from './AirportDestinationBox';

const SelectAirport = ({
  originSearchList,
  selectOrigin,
  searchOrigin,
  originName,
  destinationSearchList,
  searchDestination,
  selectDestination,
  destinationName,
  originInputCheck,
  destinationInputCheck,
}) => {
  const changeAirport = () => {
    console.log('출발지 도착지를 반전시킵니다.');
  };
  return (
    <fieldset className="option-field airport">
      <S.FieldTitle>출발지 / 도착지</S.FieldTitle>
      <A11yTitle as="label" htmlFor="airport-depature">
        출발지
      </A11yTitle>
      <AirportOriginPlaceBox
        id="airport-depature"
        value="인천국제공항(ICN)"
        placeholder="출발지 선택"
        originSearchList={originSearchList}
        searchOrigin={searchOrigin}
        selectOrigin={selectOrigin}
        originName={originName}
        originInputCheck={originInputCheck}
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
      <AirportDestinationBox
        id="airport-arrived"
        value=""
        placeholder="도착지 선택"
        destinationSearchList={destinationSearchList}
        searchDestination={searchDestination}
        selectDestination={selectDestination}
        destinationName={destinationName}
        destinationInputCheck={destinationInputCheck}
      />
    </fieldset>
  );
};

export default SelectAirport;
