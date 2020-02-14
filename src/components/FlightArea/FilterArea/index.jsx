import React from 'react';
import * as S from './FilterAreaStyled';

const FilterArea = props => {
  return <S.FilterAreaLayout>{props.children}</S.FilterAreaLayout>;
};

export default FilterArea;
