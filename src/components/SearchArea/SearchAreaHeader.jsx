import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import SelectWayTab from './SelectWayTab';
import SelectAirport from './SelectAirport';
import SelectDate from './SelectDate';
import SelectOption from './SelectOption';
import CheckBox from '../Common/CheckBox';
import A11yTitle from '../Common/A11yTitle';
import * as S from './SearchAreaStyled';
import Button from '../Common/Button';

const SearchAreaHeader = React.forwardRef(({ fixed }, ref) => {
  const originAirport = useSelector(state => state.search.originPlace);
  const [isOpen, setIsOpen] = useState(false);
  const showSearchForm = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <S.SearchHeaderWrapper fixed={fixed} ref={ref}>
        <S.FlightInfoSection onClick={showSearchForm}>
          <A11yTitle>항공권 입력 정보</A11yTitle>
          <S.AirportInfoWrapper isOpen={isOpen}>
            <S.AirportName>{originAirport}</S.AirportName>
            <S.FlightIcon
              src="/images/flight-white.png"
              alt="출발지에서 도착지로 이동"
            />
            <S.AirportName>파리샤를드골 (CDG)</S.AirportName>
          </S.AirportInfoWrapper>
          <S.DateOpionInfoWrapper isOpen={isOpen} fixed={fixed}>
            <S.DateText>2020년 02월 12일 (수)</S.DateText>
            <S.DateText>2020년 02월 19일 (수)</S.DateText>
          </S.DateOpionInfoWrapper>
          <S.DateOpionInfoWrapper isOpen={isOpen} fixed={fixed}>
            <S.OptionText>1 성인</S.OptionText>
            <S.OptionText>일반석</S.OptionText>
            <S.OptionText>왕복</S.OptionText>
          </S.DateOpionInfoWrapper>
        </S.FlightInfoSection>
        <S.SearchWrapperHeader isOpen={isOpen}>
          <A11yTitle>항공권 정보 변경</A11yTitle>
          <S.SearchForm isHeader={true}>
            <SelectWayTab />
            <S.SearchTop>
              <SelectAirport />
              <SelectDate />
              <SelectOption />
            </S.SearchTop>
            <S.SearchBottom>
              <CheckBox label="직항" id="nonstop" isDisable={false} />
              <Button
                text="항공권 검색"
                size="medium"
                color="blue"
                image="plane"
              />
            </S.SearchBottom>
          </S.SearchForm>
        </S.SearchWrapperHeader>
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
