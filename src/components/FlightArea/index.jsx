import React, { useState, useEffect } from 'react';
import qs from 'query-string';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment';
import FilterArea from './FilterArea';
import media from '../../libs/MediaQuery';
import ListAreaContainer from '../../container/ListAreaContainer';

const FlightLayout = styled.div`
  display: flex;
  flex-direction: column;

  ${media.desktop`
    flex-direction: row;
    justify-content: space-between;
  `}
`;

const FlightArea = ({
  location,
  session,
  createSession,
  getLiveSearch,
  originDatas,
  changeFilterDatas,
  setFilterOptions,
  direct,
  via,
  selectWays,
}) => {
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  useEffect(() => {
    const path = location.pathname
      .slice(1, -1)
      .split('/')
      .slice(2);

    const query = qs.parse(location.search);
    const { cabinclass: cabinClass, children, infants, adults } = query;

    const [originPlace, destinationPlace, outboundDate, inboundDate] = path;
    const outBound = moment(`20${outboundDate}`).format('YYYY-MM-DD');
    const inBound = moment(`20${inboundDate}`).format('YYYY-MM-DD');

    const requestBody = {
      cabinClass: cabinClass,
      children: +children,
      infants: +infants,
      country: 'KR',
      currency: 'KRW',
      locale: 'ko-KR',
      originPlace: `${originPlace}-sky`,
      destinationPlace: `${destinationPlace}-sky`,
      outboundDate: outBound,
      adults: +adults,
      inboundDate: `${+query.rtn ? inBound : ''}`,
    };

    createSession(requestBody);
  }, [createSession, location.pathname, location.search]);

  useEffect(() => {
    if (session) {
      getLiveSearch();
    }
  }, [getLiveSearch, session]);

  return (
    <FlightLayout>
      <FilterArea
        filterModalVisible={filterModalVisible}
        setFilterModalVisible={setFilterModalVisible}
        originDatas={originDatas}
        changeFilterDatas={changeFilterDatas}
        selectWays={selectWays}
        direct={direct}
        via={via}
        setFilterOptions={setFilterOptions}
      />
      <ListAreaContainer setFilterModalVisible={setFilterModalVisible} />
    </FlightLayout>
  );
};

export default withRouter(FlightArea);
