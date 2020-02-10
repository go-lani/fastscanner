import React from 'react';
import * as S from './headerStyled';

const Currency = ({ status, openClick, closeClick, selectCurrnecy }) => {
  return (
    <>
      <li>
        <S.NavButton onClick={() => openClick('currency')}>
          <S.NavDiv>
            <span>{selectCurrnecy.currency}</span>
            <span>{selectCurrnecy.currencyId}</span>
          </S.NavDiv>
        </S.NavButton>
      </li>
    </>
  );
};

export default Currency;
