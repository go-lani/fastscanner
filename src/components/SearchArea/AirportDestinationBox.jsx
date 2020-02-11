import React from 'react';
import * as S from './SearchAreaStyled';

const AirportDestinationBox = ({ id, value = '인천(ICN)', placeholder }) => {
  return (
    <S.AirportInputBox>
      <S.AirportInput
        type="text"
        id={id}
        defaultValue={value}
        placeholder={placeholder}
        autoComplete="off"
      />
      <S.AirportListArea>
        <S.AirportList>헬로우</S.AirportList>
      </S.AirportListArea>
    </S.AirportInputBox>
  );
};

export default AirportDestinationBox;
