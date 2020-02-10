import React from 'react';
import * as S from './headerStyled';
import { language } from './data';

const CountryModalContents = ({ selectLang, setSelectLang, closeClick }) => {
  const recommandLang = language.filter(item =>
    selectLang.Id === 'KR'
      ? item.Id === 'UK' || item.Id === 'US'
      : selectLang.Id === 'UK'
      ? item.Id === 'US' || item.Id === 'KR'
      : selectLang.Id === 'US'
      ? item.Id === 'KR' || item.Id === 'UK'
      : item.Id === 'KR' || item.Id === 'UK' || item.Id === 'US',
  );

  const sortLang = [
    selectLang,
    ...language
      .filter(item => selectLang.Id !== item.Id)
      .sort((a, b) => {
        return a.lang < b.lang ? -1 : a.lang > b.lang ? 1 : 0;
      }),
  ];

  const clickLang = item => {
    setSelectLang(item);
    closeClick();
  };

  return (
    <>
      <S.ModalSection>
        <div>
          <S.ModalSectionTitle>추천 언어 및 지역</S.ModalSectionTitle>
          <S.ModalContentUl>
            {recommandLang.map((item, i) => (
              <S.ModalContentsLi key={i}>
                <S.ModalContentsButton
                  onClick={() => clickLang(item)}
                  status={selectLang.Id === item.Id}
                >
                  <p>{item.lang}</p>
                  <p>{item.country}</p>
                </S.ModalContentsButton>
              </S.ModalContentsLi>
            ))}
          </S.ModalContentUl>
        </div>
        <div>
          <S.ModalSectionTitle>언어와 지역을 선택해주세요</S.ModalSectionTitle>
          <S.ModalContentUl>
            {sortLang.map((item, i) => (
              <S.ModalContentsLi key={i}>
                <S.ModalContentsButton
                  onClick={() => clickLang(item)}
                  status={selectLang.Id === item.Id}
                >
                  <p>{item.lang}</p>
                  <p>{item.country}</p>
                </S.ModalContentsButton>
              </S.ModalContentsLi>
            ))}
          </S.ModalContentUl>
        </div>
      </S.ModalSection>
    </>
  );
};

export default CountryModalContents;
