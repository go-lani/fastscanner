import styled, { css, keyframes } from 'styled-components';

// button style

// header
export const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  min-width: 600px;
  padding: 0 20px;
  margin-bottom: 10px;
`;

// logo
export const Logo = styled.h1`
  width: 180px;
  height: 76px;
  padding: 20px 0;
`;

// navigation
export const Nav = styled.nav``;

export const NavUl = styled.ul`
  display: flex;
`;

export const NavButton = styled.button`
  width: 100%;
  height: 76px;
  font-size: 1.4rem;
  font-weight: 600;
  border-style: none;
  border-bottom: 2px solid transparent;

  &:hover {
    border-bottom: 2px solid rgb(2, 136, 209);
  }
`;

export const NavDiv = styled.div`
  display: inline-block;
  width: 100%;
  vertical-align: middle;
  padding: 0 8px;

  svg {
    vertical-align: sub;
    font-size: 1.8rem;
  }

  span + span {
    margin: 0 2.5px;
  }
`;

// Modal
const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    background-color: rgba(73, 80, 87, 0.7);
    opacity: 1;
  }
`;

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  ${props =>
    props.status &&
    css`
      animation-name: ${fadeIn};
      animation-duration: 0.3s;
      animation-fill-mode: both;
    `}
`;

export const ModalContents = styled.div`
  position: relative;
  padding: 0 24px 24px 24px;
  background: white;
  width: 100%;
  height: 100%;
  max-width: 1032px;
  height: 755px;
  border-radius: 12px;
`;
export const ModalSection = styled.section`
  width: 100%;
  margin-top: 64px;
  padding-top: 24px;
  border-top: 1px solid #0288d1;
`;

export const ModalButton = styled.button`
  position: absolute;
  top: 24px;
  right: 24px;
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

export const ModalSectionTitle = styled.h2`
  font-size: 2.2rem;
  margin-bottom: 24px;
  font-weight: 700;
`;

export const ModalContentUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
  width: 1000px;
  margin-bottom: 24px;
`;

export const ModalContentsLi = styled.li`
  width: 197px;
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
