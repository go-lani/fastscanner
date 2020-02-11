import React from 'react';
import * as S from './SearchAreaStyled';

const AirportOriginPlaceBox = ({ id, value = '인천(ICN)', placeholder }) => {
  return (
    <S.AirportInputBox>
      <S.AirportInput
        type="text"
        id={id}
        defaultValue={value}
        placeholder={placeholder}
      />
      {/*
      1. 입력값이 있을시(show) ? 포커스있을시 show,hide
      2. 검색결과가 있을시(show), 없을시(hide)
      3. 선택시(HIDE)
      length 값이 있을때만 노출 */}
      <S.AirportListArea visible={true}>
        <S.SearchCategoryTitle>출발지를 선택해주세요</S.SearchCategoryTitle>
        <S.AirportList>
          <S.AirportListItem>
            <button>헬로우</button>
          </S.AirportListItem>
        </S.AirportList>
      </S.AirportListArea>
    </S.AirportInputBox>
  );
};

export default AirportOriginPlaceBox;
