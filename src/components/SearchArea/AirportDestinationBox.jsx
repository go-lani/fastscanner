import React, { useState, useEffect, createRef } from 'react';
import * as S from './SearchAreaStyled';
import uuid from 'uuid';
import { debounce } from 'lodash';

const AirportDestinationBox = ({
  id,
  placeholder,
  destinationSearchList,
  searchDestination,
  selectDestination,
  destinationName,
}) => {
  const [destination, setDestination] = useState(destinationName);
  const [visible, setVisible] = useState(false);
  const destinationInput = createRef();

  useEffect(() => {
    destinationInput.current.value = destination;
  }, [destination, destinationInput]);

  const _handleChange = debounce(value => {
    searchDestination(value);
  }, 300);

  function handledChange(e) {
    setVisible(true);
    const value = e.target.value.trim();

    _handleChange(value);
  }

  function handledClick(PlaceId, PlaceName) {
    console.log(handledClick);
    selectDestination({ PlaceName, PlaceId });
    setDestination(`${PlaceName}(${PlaceId})`);
    setVisible(false);
  }

  function hide() {
    setVisible(false);
  }

  return (
    <S.AirportInputBox>
      <S.AirportInput
        ref={destinationInput}
        type="text"
        id={id}
        defaultValue={destination}
        placeholder={placeholder}
        autoComplete="off"
        onChange={handledChange}
      />
      {destinationSearchList && (
        <>
          <S.SearchPlaceDim onClick={hide} visible={visible} />
          <S.AirportListArea visible={visible}>
            <S.SearchCategoryTitle>출발지를 선택해주세요</S.SearchCategoryTitle>
            <S.AirportList>
              {destinationSearchList.map(list => (
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

export default AirportDestinationBox;
