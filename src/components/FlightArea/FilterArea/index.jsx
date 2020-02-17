import React from 'react';
import * as S from './FilterAreaStyled';
import DropBox from '../../Common/DropBox';
import CheckBox from '../../Common/CheckBox';

const FilterArea = props => {
  return (
    <S.FilterAreaLayout>
      {props.children}
      <DropBox>
        <CheckBox size="medium" label="직항" id="nonstopp" />
        <CheckBox size="medium" label="1번 경유" id="nonstopp2" />
        <CheckBox size="medium" label="2번 이상 경유 " id="nonstopp3" />
      </DropBox>
      <DropBox>
        <CheckBox size="medium" label="직항" id="nonstopp4" />
        <CheckBox size="medium" label="1번 경유" id="nonstopp5" />
        <CheckBox size="medium" label="2번 이상 경유 " id="nonstopp6" />
      </DropBox>
    </S.FilterAreaLayout>
  );
};

export default FilterArea;
