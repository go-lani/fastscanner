import React from 'react';
import * as S from './headerStyled';
import { currency } from './data';

const CurrencyModalContents = ({
  closeClick,
  selectCurrnecy,
  setSelectCurrency,
}) => {
  const sortCurrency = [
    selectCurrnecy,
    ...currency
      .filter(item => selectCurrnecy.Id !== item.Id)
      .sort((a, b) => {
        return a.lang < b.lang ? -1 : a.lang > b.lang ? 1 : 0;
      }),
  ];

  const clickLang = item => {
    setSelectCurrency(item);
    closeClick();
  };

  return (
    <>
      <S.ModalSection>
        <S.ModalSectionTitle>통화를 선택하세요</S.ModalSectionTitle>
        <ul style={{ display: 'flex', flexWrap: 'wrap', width: '1000px' }}>
          {sortCurrency.map((item, i) => (
            <S.ModalContentsLi key={i}>
              <S.ModalContentsButton
                onClick={() => clickLang(item)}
                status={selectCurrnecy.currencyId === item.currencyId}
              >
                <p>{item.currencyName}</p>
                <p>
                  {item.currencyId} - {item.currency}
                </p>
              </S.ModalContentsButton>
            </S.ModalContentsLi>
          ))}
        </ul>
      </S.ModalSection>
    </>
  );
};

export default CurrencyModalContents;
