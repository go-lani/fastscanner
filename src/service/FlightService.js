import axios from 'axios';
import qs from 'query-string';

export default class FlightService {
  static createSession = async requestBody => {
    return await axios.post(
      'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing/v1.0',
      qs.stringify(requestBody),
      {
        headers: {
          'x-rapidapi-host':
            'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com',
          'x-rapidapi-key': process.env.REACT_APP_SKYSCANNER_API_KEY,
        },
      },
    );
  };
  static getLiveData = async ({ session, headers, params }) => {
    const a = new Promise(async (resolve, reject) => {
      setTimeout(async () => {
        const { data } = await axios.get(
          `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing/uk2/v1.0/${session}`,
          {
            headers,
            params,
          },
        );
        resolve(data);
      }, 1000);
    });

    return a;
  };
}
