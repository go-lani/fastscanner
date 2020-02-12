import React, { useState, useEffect, createRef } from 'react';
import * as S from './SearchAreaStyled';
import uuid from 'uuid';
import { debounce } from 'lodash';

const AirportOriginPlaceBox = ({
  id,
  placeholder,
  originSearchList,
  searchOrigin,
  selectOrigin,
  originName,
}) => {
  const [origin, setOrigin] = useState(originName);
  const [visible, setVisible] = useState(false);
  const originInput = createRef();

  useEffect(() => {
    originInput.current.value = origin;
  }, [origin, originInput]);

  const _handleChange = debounce(value => {
    searchOrigin(value);
  }, 300);

  function handledChange(e) {
    setVisible(true);
    const value = e.target.value.trim();
    _handleChange(value);
  }

  function handledClick(PlaceId, PlaceName) {
    console.log(handledClick);
    selectOrigin({ PlaceName, PlaceId });
    setOrigin(`${PlaceName}(${PlaceId})`);
    setVisible(false);
  }

  function hide() {
    setVisible(false);
  }

  return (
    <S.AirportInputBox>
      <S.AirportInput
        ref={originInput}
        type="text"
        id={id}
        defaultValue={origin}
        placeholder={placeholder}
        autoComplete="off"
        onChange={handledChange}
      />

      {originSearchList && (
        <>
          <S.SearchPlaceDim onClick={hide} visible={visible} />
          <S.AirportListArea visible={visible}>
            <S.SearchCategoryTitle>출발지를 선택해주세요</S.SearchCategoryTitle>
            <S.AirportList>
              {originSearchList.map(list => (
                <S.AirportListItem key={uuid.v4()}>
                  <button
                    type="button"
                    onClick={() => handledClick(list.PlaceId, list.PlaceName)}
                  >
                    {`${list.PlaceName}(${list.PlaceId})`}
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

export default AirportOriginPlaceBox;
