import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import qs from 'query-string';
import A11yTitle from '../Common/A11yTitle';
import * as S from './SearchAreaStyled';
import SearchAreaContainer from '../../container/SearchAreaContainer';
import moment from 'moment';

const ResearchArea = ({
  way,
  location,
  originName,
  destinationName,
  getConfigure,
  selectStops,
  outboundDate,
  inboundDate,
  adults,
  children,
  infants,
  cabinClass,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const path = location.pathname
      .slice(1, -1)
      .split('/')
      .slice(2);

    const query = qs.parse(location.search);
    const {
      cabinclass: $cabinclass,
      adults: $adults,
      children: $children,
      infants: $infants,
      preferdirects,
      rtn,
    } = query;

    // 직항 & 경유 초기세팅
    if (preferdirects === 'true') selectStops(0);
    else selectStops(1);

    if (+rtn) {
      const [originPlace, destinationPlace, outboundDate, inboundDate] = path;
      const outBound = moment(`20${outboundDate}`).format('YYYY-MM-DD');
      const momentOutBound = moment(moment(`20${outboundDate}`));
      const inBound = moment(`20${inboundDate}`).format('YYYY-MM-DD');
      const momentInBound = moment(moment(`20${inboundDate}`));

      // 초기세팅
      getConfigure({
        way: 'round',
        originPlace,
        destinationPlace,
        outboundDate: outBound,
        momentOutDate: momentOutBound,
        inboundDate: inBound,
        momentInDate: momentInBound,
        adults: +$adults,
        children: +$children,
        infants: +$infants,
        cabinclass: $cabinclass,
      });
    } else {
      const [originPlace, destinationPlace, outboundDate] = path;
      const outBound = moment(`20${outboundDate}`).format('YYYY-MM-DD');
      const momentOutBound = moment(moment(`20${outboundDate}`));

      // 초기세팅
      getConfigure({
        way: 'oneway',
        originPlace,
        destinationPlace,
        outboundDate: outBound,
        momentOutDate: momentOutBound,
        adults: +$adults,
        children: +$children,
        infants: +$infants,
        cabinclass: $cabinclass,
      });
    }
  }, [getConfigure, location.pathname, location.search, selectStops]);

  const showSearchForm = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <S.ResearchArea>
        <S.FlightInfoSection onClick={showSearchForm}>
          <A11yTitle>항공권 입력 정보</A11yTitle>
          <S.AirportInfoBox>
            <S.AirportName>{originName}</S.AirportName>
            <S.FlightIcon
              src="/images/flight-white.png"
              alt="출발지에서 도착지로 이동"
            />
            <S.AirportName>{destinationName}</S.AirportName>
          </S.AirportInfoBox>
          <S.OptionArea isOpen={isOpen}>
            <S.DateOpionInfoBox>
              <S.DateText>{moment(outboundDate).format('LL')}</S.DateText>
              {inboundDate && (
                <S.DateText>{moment(inboundDate).format('LL')}</S.DateText>
              )}
            </S.DateOpionInfoBox>
            <S.DateOpionInfoBox>
              <S.OptionText>
                {adults && `성인 ${adults}`}
                {children !== 0 && `소아 ${children}`}
                {infants !== 0 && `유아 ${infants}`}
              </S.OptionText>
              <S.OptionText>
                {cabinClass !== 'economy'
                  ? cabinClass !== 'premiumeconomy'
                    ? cabinClass !== 'business'
                      ? '일등석'
                      : '비즈니스석'
                    : '프리미엄 일반석'
                  : '일반석'}
              </S.OptionText>
              <S.OptionText>{way === 'round' ? '왕복' : '편도'}</S.OptionText>
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
      </S.ResearchArea>
    </>
  );
};

export default withRouter(ResearchArea);
