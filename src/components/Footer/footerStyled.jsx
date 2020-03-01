import styled from 'styled-components';

export const Footer = styled.footer`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  min-height: 250px;
  background: #172126;
  color: #fff;
`;

export const Copy = styled.small`
  font-size: 1.4rem;
`;

export const MemberList = styled.ul`
  display: inline-flex;
  margin: 30px 0 0;
`;

export const Member = styled.li`
  a {
    display: block;
    overflow: hidden;
    width: 55px;
    height: 55px;
    background: #fff;
    border-radius: 100%;
  }

  img {
    width: 100%;
    height: 100%;
  }

  & + & {
    margin: 0 0 0 25px;
  }
`;
