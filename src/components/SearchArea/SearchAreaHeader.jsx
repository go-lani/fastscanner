import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import A11yTitle from '../Common/A11yTitle';
import * as S from './SearchAreaStyled';
import SearchAreaContainer from '../../container/SearchAreaContainer';

const SearchAreaHeader = React.forwardRef(({ fixed }, ref) => {
  const originAirport = useSelector(state => state.search.originPlace);
  const [isOpen, setIsOpen] = useState(false);
  const showSearchForm = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <S.SearchHeaderWrapper ref={ref}>
        <S.FlightInfoSection onClick={showSearchForm}>
          <A11yTitle>항공권 입력 정보</A11yTitle>
          <S.AirportInfoBox>
            <S.AirportName>{originAirport}</S.AirportName>
            <S.FlightIcon
              src="/images/flight-white.png"
              alt="출발지에서 도착지로 이동"
            />
            <S.AirportName>파리샤를드골 (CDG)</S.AirportName>
          </S.AirportInfoBox>
          <S.OptionArea isOpen={isOpen}>
            <S.DateOpionInfoBox>
              <S.DateText>2020년 02월 12일 (수)</S.DateText>
              <S.DateText>2020년 02월 19일 (수)</S.DateText>
            </S.DateOpionInfoBox>
            <S.DateOpionInfoBox>
              <S.OptionText>1 성인</S.OptionText>
              <S.OptionText>일반석</S.OptionText>
              <S.OptionText>왕복</S.OptionText>
            </S.DateOpionInfoBox>
          </S.OptionArea>
        </S.FlightInfoSection>
        <SearchAreaContainer isOpen={isOpen} isHeader={true} />
        <S.DownButton type="button" onClick={showSearchForm}>
          <S.ArrowIcon
            src="/images/arrow-white-down.png"
            alt="항공권 정보 재입력하기"
            isOpen={isOpen}
          />
        </S.DownButton>
      </S.SearchHeaderWrapper>
    </>
  );
});

export default SearchAreaHeader;
