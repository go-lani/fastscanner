import React, { useState, useEffect, useRef } from 'react';
import * as S from './SearchAreaStyled';
import uuid from 'uuid';

const AirportDestinationBox = ({
  id,
  placeholder,
  destinationSearchList,
  searchDestination,
  selectDestination,
  destinationName,
  destinationInputCheck,
}) => {
  const [visible, setVisible] = useState(false);
  const destinationInput = useRef();

  useEffect(() => {
    destinationInput.current.value = destinationName;
  }, [destinationInput, destinationName]);

  useEffect(() => {
    if (destinationSearchList.length) setVisible(true);
    else setVisible(false);
  }, [destinationSearchList]);

  function handledChange(e) {
    const value = e.target.value.trim();
    searchDestination(value);
    destinationInputCheck(value);
  }

  function handledClick(PlaceId, PlaceName) {
    if (destinationName === `${PlaceName}(${PlaceId})`) {
      destinationInput.current.value = destinationName;
      setVisible(false);
      return;
    }
    selectDestination({ PlaceName, PlaceId });
    setVisible(false);
  }

  function hide() {
    const { PlaceName, PlaceId } = destinationSearchList[0];

    if (destinationName === `${PlaceName}(${PlaceId})`) {
      destinationInput.current.value = destinationName;
      setVisible(false);
      return;
    }

    selectDestination({ PlaceName, PlaceId });
    setVisible(false);
  }

  return (
    <S.AirportInputBox>
      <S.AirportInput
        ref={destinationInput}
        type="text"
        id={id}
        defaultValue={destinationName}
        placeholder={placeholder}
        autoComplete="off"
        onChange={handledChange}
      />
      {destinationSearchList && visible && (
        <>
          <S.SearchPlaceDim onClick={hide} visible={visible} />
          <S.AirportListArea visible={visible}>
            <S.SearchCategoryTitle>도착지를 선택해주세요</S.SearchCategoryTitle>
            <S.AirportList>
              {destinationSearchList.map(list => (
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

export default AirportDestinationBox;
