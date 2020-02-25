import React from 'react';
import * as S from './footerStyled';

const Footer = props => {
  return (
    <S.Footer>
      <S.Copy>&copy; 2020. FastScanner . ALL RIGHTS RESERVED.</S.Copy>
      <S.MemberList>
        <S.Member>이철환</S.Member>
        <S.Member>정다희</S.Member>
        <S.Member>김관식</S.Member>
      </S.MemberList>
    </S.Footer>
  );
};

export default Footer;
