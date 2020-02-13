import axios from 'axios';
import qs from 'query-string';

export default class FlightService {
  static createSession = async requestBody => {
    console.log('service', requestBody);
    return await axios.post(
      'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing/v1.0',
      qs.stringify(requestBody),
      {
        headers: {
          'x-rapidapi-host':
            'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com',
          'x-rapidapi-key':
            'b20a7db9a8mshb4bf43e083c436fp191230jsn6725c3b09598',
        },
      },
    );
  };
  // static getFlightData = async value => {
  //   return await axios.get(
  //     `https://www.skyscanner.co.kr/g/autosuggest-flights/KR/ko-KR/${value}`,
  //     {
  //       headers: {
  //         isDestination: true,
  //         enable_general_search_v2: true,
  //       },
  //     },
  //   );
  // };
}
