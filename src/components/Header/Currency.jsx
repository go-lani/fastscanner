import React from 'react';
import { NavButton, NavDiv } from './headerStyled';

const Currency = ({ status, openClick, closeClick, selectCurrnecy }) => {
  return (
    <>
      <li style={{ padding: '0 8px' }}>
        <NavButton onClick={() => openClick('currency')}>
          <NavDiv>
            <span>{selectCurrnecy.currency}</span>
            <span>{selectCurrnecy.currencyId}</span>
          </NavDiv>
        </NavButton>
      </li>
    </>
  );
};

export default Currency;
