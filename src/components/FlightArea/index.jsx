import React, { useEffect } from 'react';
import qs from 'query-string';
import FilterArea from './FilterArea';
import ListArea from './ListArea';
import { withRouter } from 'react-router-dom';

const FlightArea = ({ location, getFlightData }) => {
  useEffect(() => {
    const path = location.pathname
      .slice(1, -1)
      .split('/')
      .slice(2);
    //   location.pathname
    //   inboundDate: '2020-02-19',
    //   originPlace: 'ICN-sky',
    //   destinationPlace: 'CJU-sky',
    //   outboundDate: '2020-02-10',

    const query = qs.parse(location.search);
    const { cabinclass: cabinClass, children, infants, adults } = query;
    console.log('분해', cabinClass, children, infants, adults);

    //   고정
    //   country: 'KR',
    //   currency: 'KRW',
    //   locale: 'ko-KR',

    console.log(query);

    if (+query.rtn) {
      const [originPlace, destinationPlace, outboundDate, inboundDate] = path;

      // requestbody 객체를 만들어 dispatch 해야됨

      const requestBody = {
        inboundDate: '2020-02-19',
        cabinClass: 'economy',
        children: 0,
        infants: 0,
        country: 'KR',
        currency: 'KRW',
        locale: 'ko-KR',
        originPlace: 'ICN-sky',
        destinationPlace: 'CJU-sky',
        outboundDate: '2020-02-15',
        adults: 1,
      };
      getFlightData(requestBody);
    } else {
      const [originPlace, destinationPlace, outboundDate] = path;
      console.log('편도 originPlace', originPlace);
      console.log('편도 destinationPlace', destinationPlace);
      console.log('편도 outboundDate', outboundDate);
      // requestbody 객체를 만들어 dispatch 해야됨
    }
  }, [getFlightData, location.pathname, location.search]);
  return (
    <>
      <FilterArea></FilterArea>
      <ListArea></ListArea>
    </>
  );
};

export default withRouter(FlightArea);
