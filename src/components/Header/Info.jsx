import React from 'react';
import * as S from './headerStyled';

const Info = props => {
  return (
    <li style={{ padding: '0 8px' }}>
      <S.NavButton>
        <S.NavDiv>
          <a
            target="blank"
            href="https://help.skyscanner.net/hc/ko?skyCurrency=currency_krw&skyLanguage=lang_ko&skyMarket=kr_skyscanner&_mp=16ff4ccff4239b-0164690c1c78c8-39607b0f-1aeaa0-16ff4ccff43cd1_1581148372085&preferences=5e2085009ab34e48a5c7fd1b262a7eb9&traveller_context=5e208500-9ab3-4e48-a5c7-fd1b262a7eb9&_ga=2.226152158.536721819.1580704657-845691301.1580360073&_gac=1.83133028.1581042411.CjwKCAiAj-_xBRBjEiwAmRbqYpone4YJAuzukGql4Z_K8Cdx1XSbuyvdb48fUFobcGe0xMnRaQ5ZtBoCz-UQAvD_BwE"
          >
            <span>도움말</span>
          </a>
        </S.NavDiv>
      </S.NavButton>
    </li>
  );
};

export default Info;
