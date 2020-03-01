import React from 'react';
import * as S from './footerStyled';

const Footer = props => {
  return (
    <S.Footer>
      <S.Copy>&copy; 2020. FastScanner . ALL RIGHTS RESERVED.</S.Copy>
      <S.MemberList>
        <S.Member>
          <a href="https://github.com/publizm" rel="noopener noreferrer">
            <img src="/images/publee.png" alt="publee" />
          </a>
        </S.Member>
        <S.Member>
          <a
            href="https://github.com/kwansikdev"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/images/austin.png" alt="austin" />
          </a>
        </S.Member>
        <S.Member>
          <a
            href="https://github.com/eternalarchive"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/images/dahee.png" alt="dahee" />
          </a>
        </S.Member>
      </S.MemberList>
    </S.Footer>
  );
};

export default Footer;
