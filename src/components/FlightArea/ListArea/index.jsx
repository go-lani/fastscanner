import React from 'react';
import * as S from './ListAreaStyled';

const ListArea = props => {
  return <S.ListLayout>{props.children}</S.ListLayout>;
};

export default ListArea;
