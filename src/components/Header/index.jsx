import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import * as S from './headerStyled';
import Country from './Country';
import Currency from './Currency';
import Info from './Info';
import Popup from '../Popup';
import CountryModal from './CountryModal';
import CurrencyModal from './CurrencyModal';

const Header = React.memo(props => {
  const [status, setStatus] = useState({
    lang: false,
    currency: false,
  });

  const [selectLang, setSelectLang] = useState({
    Id: 'KR',
    country: '대한민국',
    lang: '한국어',
  });

  const [selectCurrnecy, setSelectCurrency] = useState({
    Id: 'KR',
    name: 'South Korea',
    currencyId: 'KRW',
    currency: '₩',
    currencyName: '한국 원',
  });

  const openClick = useCallback(id => {
    if (id === 'lang')
      return setStatus({
        lang: true,
        currency: false,
      });

    if (id === 'currency')
      return setStatus({
        lang: false,
        currency: true,
      });
  }, []);

  const closeClick = useCallback(() => {
    setStatus({
      lang: false,
      currency: false,
    });
  }, []);

  console.log(status);
  return (
    <>
      <S.Header isView={props.isView}>
        <S.Logo>
          <Link to="/">
            <img
              src="/images/logo_white.png"
              alt="fastscanner"
              style={{ width: '100%' }}
            />
          </Link>
        </S.Logo>
        <S.Nav>
          <S.NavUl>
            <Country
              status={status}
              openClick={openClick}
              closeClick={closeClick}
              selectLang={selectLang}
              setSelectLang={setSelectLang}
            />
            <Currency
              status={status}
              openClick={openClick}
              closeClick={closeClick}
              selectCurrnecy={selectCurrnecy}
              setSelectCurrency={setSelectCurrency}
            />
            <Info />
          </S.NavUl>
        </S.Nav>
        <Popup visible={status.lang} hide={closeClick}>
          <CountryModal
            closeClick={closeClick}
            selectLang={selectLang}
            setSelectLang={setSelectLang}
          />
        </Popup>
        <Popup visible={status.currency} hide={closeClick}>
          <CurrencyModal
            closeClick={closeClick}
            selectCurrnecy={selectCurrnecy}
            setSelectCurrency={setSelectCurrency}
          />
        </Popup>
      </S.Header>
    </>
  );
});

export default Header;
