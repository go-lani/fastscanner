import React from 'react';
import uuid from 'uuid';
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
        <div>
          <S.ModalSectionTitle>통화를 선택하세요</S.ModalSectionTitle>
          <S.ModalContentScroll>
            <S.ModalContentUl>
              {sortCurrency.map(item => (
                <S.ModalContentsLi key={uuid.v4()}>
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
            </S.ModalContentUl>
          </S.ModalContentScroll>
        </div>
      </S.ModalSection>
    </>
  );
};

export default CurrencyModalContents;
