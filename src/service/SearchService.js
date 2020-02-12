import axios from 'axios';

export default class SearchService {
  static originSearch = async value => {
    return await axios.get(
      `https://www.skyscanner.co.kr/g/autosuggest-flights/KR/ko-KR/${value}`,
      {
        headers: {
          isDestination: false,
          enable_general_search_v2: true,
        },
      },
    );
  };
  static destinationSearch = async value => {
    return await axios.get(
      `https://www.skyscanner.co.kr/g/autosuggest-flights/KR/ko-KR/${value}`,
      {
        headers: {
          isDestination: true,
          enable_general_search_v2: true,
        },
      },
    );
  };
}
