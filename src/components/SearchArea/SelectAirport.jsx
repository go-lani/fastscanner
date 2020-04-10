import React from 'react';
import SwapHorizRoundedIcon from '@material-ui/icons/SwapHorizRounded';
import A11yTitle from '../Common/A11yTitle';
import * as S from './SearchAreaStyled';
import AirportPlaceBox from './AirportPlaceBox';

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
  changePlace,
}) => {
  const changeAirport = () => {
    changePlace();
  };
  return (
    <fieldset className="option-field airport">
      <S.FieldTitle>출발지 / 도착지</S.FieldTitle>
      <A11yTitle as="label" htmlFor="airport-depature">
        출발지
      </A11yTitle>
      <AirportPlaceBox
        id="airport-depature"
        title="출발지를 선택해주세요"
        placeholder="출발지 선택"
        searchList={originSearchList}
        searchPlace={searchOrigin}
        selectPlace={selectOrigin}
        placeName={originName}
        placeInputCheck={originInputCheck}
      />
      <S.AirportChangeButton type="button" onClick={changeAirport}>
        <SwapHorizRoundedIcon style={{ color: '#666' }} fontSize="large" />
      </S.AirportChangeButton>
      <A11yTitle as="label" htmlFor="airport-arrived">
        도착지
      </A11yTitle>
      <AirportPlaceBox
        id="airport-arrived"
        title="도착지를 선택해주세요"
        placeholder="도착지 선택"
        searchList={destinationSearchList}
        searchPlace={searchDestination}
        selectPlace={selectDestination}
        placeName={destinationName}
        placeInputCheck={destinationInputCheck}
      />
    </fieldset>
  );
};

export default SelectAirport;
