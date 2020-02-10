import React from 'react';
import * as S from './headerStyled';
import LanguageIcon from '@material-ui/icons/Language';

const Country = ({ openClick, selectLang }) => {
  return (
    <>
      <li>
        <S.NavButton onClick={() => openClick('lang')}>
          <S.NavDiv>
            <span>
              <LanguageIcon />
            </span>
            <span>{selectLang.lang}</span>
            <span>({selectLang.Id})</span>
          </S.NavDiv>
        </S.NavButton>
      </li>
    </>
  );
};

export default Country;
