import React, { useState, useEffect, useRef } from 'react';
import * as S from './SearchAreaStyled';
import uuid from 'uuid';

const AirportOriginPlaceBox = ({
  id,
  placeholder,
  originSearchList,
  searchOrigin,
  selectOrigin,
  originName,
  originInputCheck,
}) => {
  const [visible, setVisible] = useState(false);
  const originInput = useRef();

  useEffect(() => {
    originInput.current.value = originName;
  }, [originInput, originName]);

  useEffect(() => {
    if (originSearchList.length) setVisible(true);
    else setVisible(false);
  }, [originSearchList]);

  function handledChange(e) {
    const value = e.target.value.trim();
    searchOrigin(value);
    originInputCheck(value);
  }

  function handledClick(PlaceId, PlaceName) {
    if (originName === `${PlaceName}(${PlaceId})`) {
      originInput.current.value = originName;
      setVisible(false);
      return;
    }
    selectOrigin({ PlaceName, PlaceId });
    setVisible(false);
  }

  function hide() {
    const { PlaceName, PlaceId } = originSearchList[0];

    if (originName === `${PlaceName}(${PlaceId})`) {
      originInput.current.value = originName;
      setVisible(false);
      return;
    }

    selectOrigin({ PlaceName, PlaceId });
    setVisible(false);
  }

  return (
    <S.AirportInputBox>
      <S.AirportInput
        ref={originInput}
        type="text"
        id={id}
        defaultValue={originName}
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

export default AirportOriginPlaceBox;
