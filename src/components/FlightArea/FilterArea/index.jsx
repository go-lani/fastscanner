import React from 'react';
import * as S from './FilterAreaStyled';
import DropBox from '../../Common/DropBox';
import CheckBox from '../../Common/CheckBox';
import A11yTitle from '../../Common/A11yTitle';

const FilterArea = () => {
  return (
    <S.FilterAreaLayout>
      <A11yTitle>항공권 설정</A11yTitle>
      <S.DropBoxList>
        <DropBox title="경유">
          <S.DropItem>
            <CheckBox size="medium" label="직항" id="nonstopp" />
          </S.DropItem>
          <S.DropItem>
            <CheckBox size="medium" label="1번 경유" id="nonstopp2" />
          </S.DropItem>
          <S.DropItem>
            <CheckBox size="medium" label="2번 이상 경유 " id="nonstopp3" />
          </S.DropItem>
        </DropBox>
        <DropBox title="출발 시간대 설정">
          <CheckBox size="medium" label="직항" id="nonstopp4" />
          <CheckBox size="medium" label="1번 경유" id="nonstopp5" />
          <CheckBox size="medium" label="2번 이상 경유 " id="nonstopp6" />
        </DropBox>
        <DropBox title="총 소요시간 설정">
          <CheckBox size="medium" label="직항" id="nonstopp4" />
          <CheckBox size="medium" label="1번 경유" id="nonstopp5" />
          <CheckBox size="medium" label="2번 이상 경유 " id="nonstopp6" />
        </DropBox>
      </S.DropBoxList>
    </S.FilterAreaLayout>
  );
};

export default FilterArea;
