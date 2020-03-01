import React, { useState, useEffect } from 'react';
import qs from 'query-string';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment';
import media from '../../libs/MediaQuery';
import ListAreaContainer from '../../container/ListAreaContainer';
import FilterAreaContainer from '../../container/FilterAreaContainer';

const FlightLayout = styled.div`
  display: flex;
  flex-direction: column;

  ${media.desktop`
    flex-direction: row;
    justify-content: space-between;
  `}
`;

const FlightArea = React.memo(
  ({ location, session, createSession, mainLiveSearch }) => {
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
        groupPricing: +adults + +children + +infants > 1 ? true : false,
      };

      createSession(requestBody);
    }, [createSession, location.pathname, location.search]);

    useEffect(() => {
      if (session) {
        mainLiveSearch();
      }
    }, [mainLiveSearch, session]);

    useEffect(() => {
      const $wrap = document.querySelector('#root');
      if (filterModalVisible) {
        $wrap.style.position = 'fixed';
      } else {
        $wrap.style.position = 'relative';
      }
    }, [filterModalVisible]);

    return (
      <FlightLayout>
        <FilterAreaContainer
          filterModalVisible={filterModalVisible}
          setFilterModalVisible={setFilterModalVisible}
        />
        <ListAreaContainer setFilterModalVisible={setFilterModalVisible} />
      </FlightLayout>
    );
  },
);

export default withRouter(FlightArea);
