import styled, { css } from 'styled-components';
import media from '../../libs/MediaQuery';

// button style

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: flex-start;
  width: ${({ isView }) => (isView ? 'auto' : '100vw')};
  min-height: 60px;
  padding: ${({ isView }) => (isView ? '0 20px' : '0')};
  background: ${({ isView }) => (isView ? 'rgba(0,0,0,.6)' : 'transparent')};

  ${media.mobile`
    flex-direction: column;
    align-items: flex-start;
    padding: ${({ isView }) => (isView ? '20px' : '20px 0')};
  `}
`;

// logo
export const Logo = styled.h1`
  width: 180px;
  a {
    display: block;
  }
`;

// navigation
export const Nav = styled.nav``;

export const NavUl = styled.ul`
  display: flex;

  li {
    position: relative;
    margin: 0 0 0 10px;

    &:first-child {
      margin: 0;
    }

    &:after {
      content: '';
      position: absolute;
      right: 0;
      bottom: 10px;
      left: 0;
      width: 100%;
      height: 2px;
      background: #fff;
      opacity: 0;
      transform: scaleX(0);
      transition: all 0.3s;
    }
    &:hover {
      &:after {
        transform: scaleX(1);
        opacity: 1;
      }
    }
  }
`;

export const NavButton = styled.button`
  width: 100%;
  font-size: 1.4rem;
  line-height: 25px;
  padding: 15px 10px;
  font-weight: 600;
  background: transparent;
  border: none;
  color: #fff;
`;

export const NavDiv = styled.div`
  display: inline-block;
  width: 100%;
  vertical-align: middle;

  svg {
    vertical-align: sub;
    font-size: 1.8rem;
  }

  span {
    display: inline-block;
  }

  span + span {
    margin: 0 0 0 2.5px;
  }
`;

// Modal
export const ModalContents = styled.div`
  position: relative;
  /* min-width: 320px;
  max-width: 1000px; */
  padding: 24px;
  background: #fff;
  border-radius: 12px;
`;
export const ModalSection = styled.section`
  width: 100%;

  & > div {
    margin: 0 0 20px;

    &:last-child {
      margin: 0;
    }
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 0 20px;
  padding: 0 0 10px;
  border-bottom: 2px solid #0288d1;
`;

export const ModalTitle = styled.p`
  font-weight: 700;
  font-size: 2.5rem;
`;

export const ModalButton = styled.button`
  width: 30px;
  height: 30px;
  border-style: none;
  font-size: 1.4rem;

  &:hover {
    border-radius: 50%;
    background: #0288d1;
    color: #fff;
  }
`;

export const ModalSectionTitle = styled.p`
  font-weight: 700;
  font-size: 2.2rem;
  margin-bottom: 24px;
`;

export const ModalContentScroll = styled.div`
  overflow-x: scroll;

  ${media.desktop`
    overflow-x: hidden;
  `}
`;

export const ModalContentUl = styled.ul`
  display: inline-flex;

  ${media.desktop`
    display: flex;
    flex-wrap: wrap;
  `}
`;

export const ModalContentsLi = styled.li`
  width: 190px;
  padding: 8px;

  p {
    text-align: left;
  }
`;

export const ModalContentsButton = styled.button`
  width: 100%;
  background: transparent;
  border-radius: 8px;
  padding: 9px 12px 9px 12px;
  font-size: 1.4rem;
  border-style: none;
  border: 1px solid transparent;

  &:hover {
    background: #0288d1;
    color: #fff;
  }

  ${props =>
    props.status &&
    css`
      border: 1px solid #0288d1;
    `}
`;
