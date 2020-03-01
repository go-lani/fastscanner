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
    originInput.current.value = placeName;
  }, [originInput, placeName]);

  useEffect(() => {
    if (searchList.length) setVisible(true);
    else setVisible(false);
  }, [searchList]);

  function handledChange(e) {
    const value = e.target.value.trim();
    searchPlace(value);
    placeInputCheck(value);
  }

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
