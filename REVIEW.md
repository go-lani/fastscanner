![fastscanner-mock](https://user-images.githubusercontent.com/28818698/79063571-7b82ae80-7cdd-11ea-8c51-9a61492e11ef.png)

<hr />

# FastScanner Code Review

**구현항목**

1. 디렉토리 구조
2. 검색 페이지
   - 출발지/도착지 검색시 API 호출하여 출발지/도착지에 대한 데이터를 실시간 노출
   - 출발지/도착지 선택 후 Response 데이터를 가공하여 상태 저장
   - 출발지/도착지 교차 변경
3. 메인 페이지
   - URL 파라미터와 쿼리를 통해 Session 발급 및 해당 Session키로 데이터 재가공
   - URL 파라미터와 쿼리를 통해 재검색 영역 데이터 바인딩
   - 최저가에 대한 소팅 및 해당 필터의 평균 시간 및 가격 렌더링
   - 가는날/오는날 출발시간 기준 필터링하여 UI 노출
   - ProgressBar 구현
   - Infinity scroll 구현
   - Pendding 상태의 경우 완료된 데이터만 미리 UI 노출 구현(최소가로 Sorting)
   - 경유지 및 항공사 로고 마우스 오버시 노출

------

## 1. 디렉토리 구조

### 1-1. components

![1586502826558](https://user-images.githubusercontent.com/28818698/79063574-850c1680-7cdd-11ea-9a10-6d6b3b7c6241.png)

<br />

### 1-2. Container

container를 만들어 컴포넌트와 Store 사이에서 데이터 가공 및 처리를 위한 로직을 작성하였습니다.

![1586502917724](https://user-images.githubusercontent.com/28818698/79063580-889f9d80-7cdd-11ea-83c4-e8c241c93e87.png)

<br />

### 1-3. custom hooks

![1586502961246](https://user-images.githubusercontent.com/28818698/79063588-8d645180-7cdd-11ea-8ae9-1acfc3802147.png)

<br />

### 1-4. libs

media 쿼리를 styled-components와 함께 사용하기 위한 라이브러리 등을 모아놓기 위한 폴더

![1586503251077](https://user-images.githubusercontent.com/28818698/79063589-92290580-7cdd-11ea-9648-fcc8d79660e6.png)

```javascript
import { css } from 'styled-components';

const sizes = {
  desktop: 1025,
  tablet: 1024,
  mobile: 768,
};

const sizeCheck = label => {
  if (label === 'desktop') return `all and (min-width: ${sizes[label]}px)`;
  if (label === 'tablet')
    return `all and (min-width: ${+sizes['mobile'] + 1}px) and (max-width: ${
      sizes[label]
    }px)`;
  if (label === 'mobile') return `all and (max-width: ${sizes[label]}px)`;
};

const media = Object.keys(sizes).reduce((points, label) => {
  points[label] = (...args) => css`
    @media ${sizeCheck(label)} {
      ${css(...args)}
    }
  `;

  return points;
}, {});

export default media;

```

<br />

### 1-5. pages

페이지는 Home(검색 화면), NotFound, ResultView(검색 결과 화면)

![1586503281777](https://user-images.githubusercontent.com/28818698/79063590-98b77d00-7cdd-11ea-9bae-735a31ef0176.png)

<br />

### 1-6.redux

리덕스의 경우 ducks 패턴을 활용하여 액션 타입과, 액션, 리듀서를 나누지 않고 관심사 별로 하나의 파일로 관리하였습니다.

![1586503314358](https://user-images.githubusercontent.com/28818698/79063594-9d7c3100-7cdd-11ea-994a-fbfe2291922c.png)

/src/redux/modules/reducer.js

```jsx
import { combineReducers } from 'redux';
import search from './search';
import flight from './flight';
import util from './util';
import { connectRouter } from 'connected-react-router';

const reducer = history =>
  combineReducers({
    search,
    flight,
    util,
    router: connectRouter(history),
  });

export default reducer;
```

<br />

### 1-7. service

API 호출에 대한 로직을 관심사 별로 나누어 관리하였습니다.

![1586503344288](https://user-images.githubusercontent.com/28818698/79063598-a3721200-7cdd-11ea-8214-3299ba9ebdfb.png)

<br />

## 2. 검색 페이지

### 2-1. 출발지/도착지 검색시 API 호출하여 출발지/도착지에 대한 데이터를 실시간 노출

![fastscanner-source03](https://user-images.githubusercontent.com/28818698/79063606-ab31b680-7cdd-11ea-80e2-a901baba3dbd.png)

/src/components/SearchArea/index.jsx

```jsx
...
const [originInputValue, setOriginInputValue] = useState(originPlace);
const [destinationInputValue, setDestinationInputValue] = useState(
    destinationPlace,
);

useEffect(() => {
    setDestinationInputValue(destinationPlace);
}, [destinationPlace]);

const originInputCheck = useCallback(value => {
    setOriginInputValue(value);
}, []);

const destinationInputCheck = useCallback(value => {
    setDestinationInputValue(value);
}, []);
...
<S.SearchTop>
    <SelectAirportContainer
        originInputCheck={originInputCheck}
        destinationInputCheck={destinationInputCheck}
        />
    <SelectDateContainer />
    <SelectOptionContainer />
</S.SearchTop>
...
```

1. 선택된 공항을 저장하기 위한 함수인 `originInputCheck`함수와 `destinationInputCheck` 함수를 Props로 전달했습니다.

2. Container에서는 다음과 같이 검색에 필요한 상태와 사가함수를 dispatch해주는 함수를 만들어 react-redux의 HOC인 connect 함수를 활용하여 전달해주었습니다.

   /src/container/SelectAirportContainer.jsx

   ```jsx
   import { connect } from 'react-redux';
   import SelectAirport from '../components/SearchArea/SelectAirport';
   import {
     setOriginSearchSaga,
     setOriginSelectSaga,
     setDestinationSelectSaga,
     setDestinationSearchSaga,
     setChangePlaceSaga,
   } from '../redux/modules/search';

   export default connect(
     state => ({
       originSearchList: state.search.originSearch,
       destinationSearchList: state.search.destinationSearch,
       originName: state.search.originName,
       originPlace: state.search.originPlace,
       destinationName: state.search.destinationName,
       destinationPlace: state.search.destinationPlace,
     }),
     dispatch => ({
       searchOrigin: value => {
         dispatch(setOriginSearchSaga(value));
       },
       selectOrigin: id => {
         dispatch(setOriginSelectSaga(id));
       },
       searchDestination: value => {
         dispatch(setDestinationSearchSaga(value));
       },
       selectDestination: id => {
         dispatch(setDestinationSelectSaga(id));
       },
       changePlace: () => {
         dispatch(setChangePlaceSaga());
       },
     }),
   )(SelectAirport);

   ```

3. 출발지/도착지에 대한 컴포넌트를 하나의 컴포넌트로 재사용 가능하게 하였고 각각 필요한 함수 및 상태를 props로 전달해주었습니다.

   /src/components/SearchArea/SelectAirport.jsx

   ```jsx
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
   ```

    AirportPlaceBox의 props<br />

   - `id` : 해당 컴포넌트의 id 값
   - `title` : 컴포넌트 내에서 모바일 환경에서 사용할 title 문구
   - `placeholder` : input에 대한 placeholder 값
   - `searchList` : 검색 결과에 대한 리스트를 저장한 상태
   - `searchPlace` : input 값을 받아 검색하는 로직을 가진 함수
   - `selectPlace` : 선택 결과를 store에 저장하는 함수
   - `placeName` :  현재 선택된 출발지/목적지에 대한 store에 담겨있는 상태
   - `placeInputCheck` : value에 대한 상태를 저장하기 위한 함수(이 상태는 최종 검색시 유효성 검사에 사용하기 위함)

4. 출발지/도착지에 대한 입력시 로직

   /src/components/SearchArea/AirportPlaceBox.jsx

   ```jsx
   import React, { useState, useEffect, useRef } from 'react';
   import * as S from './SearchAreaStyled';
   import uuid from 'uuid';

   const AirportPlaceBox = ({
       title,
       id,
       placeholder,
       searchList,
       searchPlace,
       selectPlace,
       placeName,
       placeInputCheck,
   }) => {
       const [visible, setVisible] = useState(false);
       const originInput = useRef();

       useEffect(() => {
           if (searchList.length) setVisible(true);
           else setVisible(false);
       }, [searchList]);

       function handledChange(e) {
           const value = e.target.value.trim();
           searchPlace(value);
           placeInputCheck(value);
       }

       return (
           <S.AirportInputBox>
               <S.AirportInput
                   ref={originInput}
                   type="text"
                   id={id}
                   defaultValue={placeName}
                   placeholder={placeholder}
                   autoComplete="off"
                   onChange={handledChange}
                   />

               {searchList && (
                   <>
                   <S.SearchPlaceDim onClick={hide} visible={visible} />
                   <S.AirportListArea visible={visible}>
                       <S.SearchCategoryTitle>{title}</S.SearchCategoryTitle>
                       <S.AirportList>
                           {searchList.map(list => (
                               <S.AirportListItem key={uuid.v4()}>
                                   <button
                                       type="button"
                                       onClick={() => handledClick(list.PlaceId, list.PlaceName)}
                                       >
                                       <span>{`${list.PlaceName}(${list.PlaceId})`}</span>
                                       <span>{list.CountryName}</span>
                                   </button>
                               </S.AirportListItem>
                           ))}
                       </S.AirportList>
                   </S.AirportListArea>
                   </>
               )}
           </S.AirportInputBox>
       );
   };

   export default AirportPlaceBox;

   ```

   1. `handledChange` 함수를 통해 해당 컴포넌트의 input 값이 변경될때 마다 `searchPlace(saga 함수)`에 value 값을 받아 API 호출을 하였습니다.

      /src/container/SelectAirportContainer.jsx

      ```jsx
      // searchPlace props에 담긴 사가 함수
      selectOrigin: id => {
          dispatch(setOriginSelectSaga(id));
      },
      searchDestination: value => {
          dispatch(setDestinationSearchSaga(value));
      },
      ```

   2. /src/redux/modules/search.js

      ```javascript
      import { put, call, select, takeEvery, takeLatest } from 'redux-saga/effects';
      import { createAction, createActions, handleActions } from 'redux-actions';
      import SearchService from '../../service/SearchService';
      import moment from 'moment';

      const options = {
        prefix: 'fastscanner/SearchArea',
        namespace: '/',
      };

      const { success, pending, fail } = createActions(
        {
          SUCCESS: search => ({ search }),
        },
        'PENDING',
        'FAIL',
        options,
      );

      // 출발지 & 도착지
      export const setOriginSearchSaga = createAction('SET_ORIGIN_SEARCH_SAGA');
      export const setDestinationSearchSaga = createAction(
        'SET_DESTINATION_SEARCH_SAGA',
      );
      ...

      function* searchOriginSaga({ payload }) {
        const prevOriginSearch = yield select(state => state.search.originSearch);

        try {
          yield put(pending());

          if (payload === '') return yield put(success({ originSearch: [] }));

          const { data } = yield call(SearchService.originSearch, payload);

          const newData = data.filter(
            list => list.PlaceId !== list.CountryId && !list.IataCode,
          );

          if (newData.length) yield put(success({ originSearch: newData }));
          else yield put(success({ originSearch: prevOriginSearch }));
        } catch (error) {
          yield put(fail(error));
        }
      }

      function* searchDestinationSaga({ payload }) {
        const prevDestinationSearch = yield select(
          state => state.search.destinationSearch,
        );
        try {
          yield put(pending());

          if (payload === '') return yield put(success({ destinationSearch: [] }));

          const { data } = yield call(SearchService.destinationSearch, payload);

          const newData = data.filter(
            list => list.PlaceId !== list.CountryId && !list.IataCode,
          );

          if (newData.length) yield put(success({ destinationSearch: newData }));
          else yield put(success({ destinationSearch: prevDestinationSearch }));
        } catch (error) {
          yield put(fail(error));
        }
      }

      ...

      export function* searchSaga() {
        yield takeEvery('SET_ORIGIN_SEARCH_SAGA', searchOriginSaga);
        yield takeEvery('SET_DESTINATION_SEARCH_SAGA', searchDestinationSaga);
        ...
      }

      // initialState
      const initialState = {
        country: 'KR',
        currency: 'KRW',
        locale: 'ko-KR',
        originPlace: 'ICN-sky',
        destinationPlace: null,
        outboundDate: moment().format('YYYY-MM-DD'),
        inboundDate: '',
        adults: 1,
        cabinClass: 'economy',
        children: 0,
        infants: 0,
        nonStops: false,
        loading: false,
        error: null,
        way: 'round',
        originSearch: [],
        originName: '인천국제공항(ICN)',
        destinationSearch: [],
        destinationName: null,
        momentOutDate: moment(),
        momentInDate: '',
      };

      // reducer
      const search = handleActions(
        {
          PENDING: (state, action) => ({
            ...state,
            loading: true,
            error: null,
          }),
          SUCCESS: (state, action) => ({
            ...state,
            ...action.payload.search,
            loading: false,
            error: null,
          }),
          FAIL: (state, action) => ({
            ...state,
            loading: false,
            error: action.paload,
          }),
        },
        initialState,
        options,
      );

      export default search;
      ```

      1. 검색에 대한 사가 함수 로직

         ```javascript
         function* searchOriginSaga({ payload }) {
           const prevOriginSearch = yield select(state => state.search.originSearch);

           try {
             yield put(pending());

           	// 1
             if (payload === '') return yield put(success({ originSearch: [] }));

             // 2
             const { data } = yield call(SearchService.originSearch, payload);

             const newData = data.filter(
               list => list.PlaceId !== list.CountryId && !list.IataCode,
             );

             if (newData.length) yield put(success({ originSearch: newData }));
             else yield put(success({ originSearch: prevOriginSearch }));
           } catch (error) {
             yield put(fail(error));
           }
         }
         ```

         1. payload로 전달받은 input 값을 빈 값이면 store의 originSeach 상태를 초기화해줬습니다.

         2. 만약 payload가 빈 값이 아니라면 아래의 로직을 수행합니다.

            1. `SearchService.originSearch`를 payload와 함께 호출해줍니다.

               /src/service/SearchService.js

               ```javascript
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
               ```

            2. 다음과 같은 Response 값을 전달받아 도시 이름을 뺀 공항이름을 필터한 데이터를 받아 originSearch에 저장해줬습니다.

               ![1586674346749](https://user-images.githubusercontent.com/28818698/79063626-be448680-7cdd-11ea-812a-d4ce3d6d692f.png)

               ![1586674586666](https://user-images.githubusercontent.com/28818698/79063633-c1d80d80-7cdd-11ea-8979-3b52dfa1f7ff.png)

      2. 스토어에 저장된 originSearch를 컨테이너에서 전달해주어 AirportPlaceBox 컴포넌트에서 ui를 구현했습니다.

         /src/components/SearchArea/SelectAirport.jsx

         ```jsx
         <AirportPlaceBox
             id="airport-depature"
             title="출발지를 선택해주세요"
             placeholder="출발지 선택"
             searchList={originSearchList} // store에 담긴 searchlist를 전달
             searchPlace={searchOrigin}
             selectPlace={selectOrigin}
             placeName={originName}
             placeInputCheck={originInputCheck}
             />
         ```

         /src/components/SearchArea/AirportPlaceBox.jsx

         ```jsx
         ...
           const [visible, setVisible] = useState(false);
           ...

           useEffect(() => {
             if (searchList.length) setVisible(true);
             else setVisible(false);
           }, [searchList]);
             ...

           return (
             <S.AirportInputBox>
               <S.AirportInput
                 ref={originInput}
                 type="text"
                 id={id}
                 defaultValue={placeName}
                 placeholder={placeholder}
                 autoComplete="off"
                 onChange={handledChange}
               />

               {searchList && (
                 <>
                   <S.SearchPlaceDim onClick={hide} visible={visible} />
                   <S.AirportListArea visible={visible}>
                     <S.SearchCategoryTitle>{title}</S.SearchCategoryTitle>
                     <S.AirportList>
                       {searchList.map(list => (
                         <S.AirportListItem key={uuid.v4()}>
                           <button
                             type="button"
                             onClick={() => handledClick(list.PlaceId, list.PlaceName)}
                           >
                             <span>{`${list.PlaceName}(${list.PlaceId})`}</span>
                             <span>{list.CountryName}</span>
                           </button>
                         </S.AirportListItem>
                       ))}
                     </S.AirportList>
                   </S.AirportListArea>
                 </>
               )}
             </S.AirportInputBox>
           );
         };
         ...
         ```

         1. visible 상태를 만들어 List에 목록이 있을때만 리스트 모달이 노출되게끔 작업했습니다. 이때 searchList의 변화에만 감지하기위해 useEffect에 의존성 배열로 searchList를 넣어 변화가 감지될때마다 체크해줬습니다.

            ```jsx
            useEffect(() => {
                if (searchList.length) setVisible(true);
                else setVisible(false);
            }, [searchList]);
            ```

<br />

### 2-2. 출발지/도착지 선택 후 Response 데이터를 가공하여 상태 저장

store에 담긴 모습

![1586676183575](https://user-images.githubusercontent.com/28818698/79063640-c7cdee80-7cdd-11ea-8016-5de9c1f42cf1.png)

![1586676220313](https://user-images.githubusercontent.com/28818698/79063641-c997b200-7cdd-11ea-9e82-8ea3400407a0.png)

/src/components/SearchArea/AirpotPlaceBox.jsx

```jsx
import React, { useState, useEffect, useRef } from 'react';
import * as S from './SearchAreaStyled';
import uuid from 'uuid';

const AirportPlaceBox = ({
  title,
  id,
  placeholder,
  searchList,
  searchPlace,
  selectPlace,
  placeName,
  placeInputCheck,
}) => {
  const [visible, setVisible] = useState(false);
  const originInput = useRef();
  ...

  function handledClick(PlaceId, PlaceName) {
    if (placeName === `${PlaceName}(${PlaceId})`) {
      originInput.current.value = placeName;
      setVisible(false);
      return;
    }
    selectPlace({ PlaceName, PlaceId });
    setVisible(false);
  }

  function hide() {
    const { PlaceName, PlaceId } = searchList[0];

    if (placeName === `${PlaceName}(${PlaceId})`) {
      originInput.current.value = placeName;
      setVisible(false);
      return;
    }

    selectPlace({ PlaceName, PlaceId });
    setVisible(false);
  }

  return (
    <S.AirportInputBox>
      <S.AirportInput
        ref={originInput}
        type="text"
        id={id}
        defaultValue={placeName}
        placeholder={placeholder}
        autoComplete="off"
        onChange={handledChange}
      />

      {searchList && (
        <>
          <S.SearchPlaceDim onClick={hide} visible={visible} />
          <S.AirportListArea visible={visible}>
            <S.SearchCategoryTitle>{title}</S.SearchCategoryTitle>
            <S.AirportList>
              {searchList.map(list => (
                <S.AirportListItem key={uuid.v4()}>
                  <button
                    type="button"
                    onClick={() => handledClick(list.PlaceId, list.PlaceName)}
                  >
                    <span>{`${list.PlaceName}(${list.PlaceId})`}</span>
                    <span>{list.CountryName}</span>
                  </button>
                </S.AirportListItem>
              ))}
            </S.AirportList>
          </S.AirportListArea>
        </>
      )}
    </S.AirportInputBox>
  );
};

export default AirportPlaceBox;
```

1. 검색 리스트 아이템은 클릭하면 `handledClick` 함수를 호출했습니다.

   ```jsx
   function handledClick(PlaceId, PlaceName) {
       if (placeName === `${PlaceName}(${PlaceId})`) {
           originInput.current.value = placeName;
           setVisible(false);
           return;
       }
       selectPlace({ PlaceName, PlaceId });
       setVisible(false);
   }
   ```

   1. `placeName`은 현재 store에 저장된 placeName을 의미하며, 공항이름(공항ID) 형식으로 저장되어 있습니다.

   2. `placeName`과 현재 클릭된 Item의 정보와 일치하면 List 모달을 숨깁니다.

   3. 만약 다르다면 selectPlace라는 함수를 호출하며 parameter로 PlaceName과 PlaceId를 전달해줬습니다.

      selectPlace 함수는 사가함수로서 다음과 같은 로직으로 작성되었습니다.

      /src/redux/modules/search.js

      ```javascript
      function* selectOriginSaga({ payload }) {
        try {
          yield put(pending());
          yield put(
            success({
              originPlace: `${payload.PlaceId}-sky`,
              originName: `${payload.PlaceName}(${payload.PlaceId})`,
            }),
          );
        } catch (error) {
          yield put(fail(error));
        }
      }
      ```

      1. payload로 전달받은 PlaceName과 PlaceId를 받아 저장했습니다.
         1. `PlaceId` : 이후 템플릿 리터럴(``)을 활용하여 liveSearch API로 사용하기 편하게 형식을 맞추어 PlaceId-sky로 상태 저장
         2. `PlaceName` : 현재 선택된 아이템 UI 형식에 맞게 상태를 저장

2. 아무런 선택을 하지 않고 다른영역을 클릭했을 경우 `hide` 함수를 호출했습니다.

   ```jsx
   function hide() {
       const { PlaceName, PlaceId } = searchList[0];

       if (placeName === `${PlaceName}(${PlaceId})`) {
           originInput.current.value = placeName;
           setVisible(false);
           return;
       }

       selectPlace({ PlaceName, PlaceId });
       setVisible(false);
   }
   ```

   1. hide가 되었을 경우 사용자 편의를 더하기 위해 노출된 검색 list의 제일 첫번째 아이템을 선택되게 하였습니다.
   2. 그리고 선택된 결과값을 `selectPlace`함수를 호출하여 상태에 저장했습니다.

<br />

### 2-3. 출발지/도착지 교차 변경

/src/components/SearchArea/SelectAirport.jsx

```jsx
...
const SelectAirport = ({
  ...
  changePlace,
}) => {
  const changeAirport = () => {
    changePlace();
  };
  return (
    <fieldset className="option-field airport">
       ...
      <S.AirportChangeButton type="button" onClick={changeAirport}>
        <SwapHorizRoundedIcon style={{ color: '#666' }} fontSize="large" />
      </S.AirportChangeButton>
      ...
    </fieldset>
  );
};
```

1. 변경 버튼을 누르면 `changeAirport` 함수가 호출됩니다.

2. `changeAirport`함수 내부에서 `changePlace` 사가함수가 호출됩니다.

   /src/container/SelectAirportContainer.jsx

   ```jsx
   ...
   export default connect(
     state => ({
         ...
     }),
     dispatch => ({
       ...
       changePlace: () => {
         dispatch(setChangePlaceSaga());
       },
     }),
   )(SelectAirport);
   ```

   /src/redux/modules/search.js

   ```javascript
   function* changePlaceSaga() {
     const prevOriginName = yield select(state => state.search.originName);
     const prevOriginPlace = yield select(state => state.search.originPlace);
     const prevDestinationName = yield select(
       state => state.search.destinationName,
     );
     const prevDestinationPlace = yield select(
       state => state.search.destinationPlace,
     );
     try {
       yield put(pending());
       yield put(
         success({
           originName: prevDestinationName,
           originPlace: prevDestinationPlace,
           destinationPlace: prevOriginPlace,
           destinationName: prevOriginName,
         }),
       );
     } catch (error) {
       yield put(fail(error));
     }
   }
   ```

   1. redux-saga/effects에 있는 `select` 사용하여 현재 스토어의 출발지에 대한 상태와 목적지에 대한 상태를 가져와서 변경해줍니다.
   2. 이렇게하면 스토어의 상태를 활용하고 있는 컴포넌트는 리렌더링되면서 ui를 최신상태로 유지합니다.

<br />

## 3. 메인 페이지

### 3-1. URL 파라미터와 쿼리를 통해 Session 발급 및 해당 Session키로 데이터 재가공

항공권 검색 버튼을 누르면 다음과 같은 로직이 동작합니다

검색시 store에 저장된 상태 값

![1586759357338](https://user-images.githubusercontent.com/28818698/79099346-df20e080-7d9e-11ea-9dc7-948259b0a4d8.png)

- `country` : 현재 사용중인 국가(KR - 고정)
- `currency` : 노출 화폐 표시(KRW - 원화 고정)
- `locale` : 언어(ko-KR - 한국어 고정)
- `originPlace` : 출발지
- `destinationPlace` : 도착지
- `outbounbDate` : 출국시간
- `inboundDate` : 입국 시간
- `adults` : 성인수
- `cabinClass` : 좌석등급(economy / premiumeconomy / business / first)
- `children` : 소아(만 16세 미만)수
- `infants` : 유아(만 24개월 미만)수
- `nonStops` : 직항 여부(true - 직항, false - 경유)
- `way` : 왕복/편도(round, way)
- `originSearch` : 출발지 검색어 입력시 노출되는 리스트 배열
- `originName` : 현재 선택된 출발지
- `destinationSearch` : 출발지 검색어 입력시 노출되는 리스트 배열
- `destinationName` : 현재 선택된 도착지
- `momentOutdate` : 출국날짜에 대한 moment format 저장(가공을 위한 용도)
- `momentIndate` : 입국날짜에 대한 moment format 저장(가공을 위한 용도)
- `loading`
- `error`

/src/components/SearchArea/index.jsx

```jsx
...
function searchSubmit() {
    const originCode = originPlace.slice(0, -4).toLowerCase();
    const destinationCode = destinationPlace && destinationPlace.slice(0, -4).toLowerCase();

    if (originCode === destinationCode)
        return alert('출발지와 도착지가 같으면 검색이 불가능합니다.');

    const outboundCode = outboundDate.split('-').join('').slice(-6);

    const inboundCode = inboundDate && inboundDate.split('-').join('').slice(-6);

    const params = qs.stringify({
        adults: adults,
        children: children,
        cabinclass: cabinClass,
        infants: infants,
        rtn: way === 'round' ? 1 : 0,
        preferdirects: nonStops,
    });

    if (way === 'round') {
        if (!originInputValue) return alert('출발지를 선택해주세요.');
        if (!destinationInputValue) return alert('도착지를 선택해주세요.');
        if (!inboundDate) return alert('입국날짜를 선택해주세요.');

        history.push(            `/transport/flights/${originCode}/${destinationCode}/${outboundCode}/${inboundCode}/?${params}`,
        );

        setIsOpen && setIsOpen(false);
    } else {
        if (!originInputValue) return alert('출발지를 선택해주세요.');
        if (!destinationInputValue) return alert('도착지를 선택해주세요.');

        history.push(            `/transport/flights/${originCode}/${destinationCode}/${outboundCode}/?${params}`,
        );
        setIsOpen && setIsOpen(false);
    }

    if (isHeader) {
        scroll.scrollToTop();
    }
}

return (
    <S.SearchWrapper isOpen={isOpen} isHeader={isHeader}>
        <S.Greeting isHeader={isHeader}>어디로 떠나볼까요?</S.Greeting>
        <S.SearchForm isHeader={isHeader} isOpen={isOpen}>
            ...
            <S.SearchBottom>
                ...
                <Button
                    type="button"
                    text="항공권 검색"
                    size="medium"
                    color="blue"
                    image="plane"
                    onClick={searchSubmit}
                    />
            </S.SearchBottom>
        </S.SearchForm>
    </S.SearchWrapper>
);
...
```
<br />

#### 3-1-1. store에 담겨있는 출발지/목적지 가공

/src/components/SearchArea/index.jsx

```jsx
const originCode = originPlace.slice(0, -4).toLowerCase();
const destinationCode = destinationPlace && destinationPlace.slice(0, -4).toLowerCase();
```

store의 originPlace는 `공항-sky` 형식으로 저장이 되어있으나 url 파라미터에는 출발지공항 명칭만 노출시키기위해 `-sky`부분을 잘라 가공했습니다.

<br />

#### 3-1-2. 출국일자와 입국일자 가공

출국일자와 입국일자는 srore에 다음과 같이 저장되어 있습니다.

![1586759939396](https://user-images.githubusercontent.com/28818698/79099355-e34cfe00-7d9e-11ea-9244-7095c3dfa560.png)

url 파라미터로 `.../200513/200525/...` 형식으로 활용하기 위해 다음과 같이 가공했습니다.

/src/components/SearchArea/index.jsx

```jsx
const outboundCode = outboundDate.split('-').join('').slice(-6);
const inboundCode = inboundDate && inboundDate.split('-').join('').slice(-6);
```

1. split으로 - 를 걷어내었고, join으로 합쳐서 20200513로 변환하였습니다.
2. 걷어낸 date를 slice로 하여 -6, 즉 맨앞 2자리를 제외하여 잘라내었습니다.

이렇게 slice로 걷어낸 이유는 `outboundDate`와 `inboundDate`가 2020-XX-XX 형식으로 들어온다느 보장이 있었기 때문입니다.

<br />

#### 3-1-3. store에 담겨있는 정보를 query-string으로 변환

/src/components/SearchArea/index.jsx

```jsx
const params = qs.stringify({
    adults: adults,
    children: children,
    cabinclass: cabinClass,
    infants: infants,
    rtn: way === 'round' ? 1 : 0,
    preferdirects: nonStops,
});
```

나머지 정보들은 query-string으로 변환하였습니다. rtn은 API에서 경유,편도를 1 또는 0으로 요청을 보내야됬기 때문에 삼항연산자를 활용하여 할당해주었습니다.

#### 3-1-4. history push

/src/components/SearchArea/index.jsx

```jsx
function searchSubmit() {
    ...
    if (way === 'round') {
        if (!originInputValue) return alert('출발지를 선택해주세요.');
        if (!destinationInputValue) return alert('도착지를 선택해주세요.');
        if (!inboundDate) return alert('입국날짜를 선택해주세요.');

        history.push(            `/transport/flights/${originCode}/${destinationCode}/${outboundCode}/${inboundCode}/?${params}`,
        );

        setIsOpen && setIsOpen(false);
    } else {
        if (!originInputValue) return alert('출발지를 선택해주세요.');
        if (!destinationInputValue) return alert('도착지를 선택해주세요.');

        history.push(            `/transport/flights/${originCode}/${destinationCode}/${outboundCode}/?${params}`,
        );
        setIsOpen && setIsOpen(false);
    }
    ...
}
```

왕복/편도에 따라 분기 처리하여 history push를 했습니다.

<br />

작성중...