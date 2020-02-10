import React from 'react';
import { S } from './layoutStyled';

const MainLayout = props => {
  return <S.MainLayout>{props.children}</S.MainLayout>;
};

export default MainLayout;
