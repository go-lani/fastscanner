import styled from 'styled-components';
import media from '../libs/MediaQuery';

export const S = {};

S.MainLayout = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 0 20px;
  background: url('/images/test2.jpg') center center no-repeat;
  background-size: cover;
`;

S.ViewLayout = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  z-index: -1;
  padding: 190px 0 0;
  background: url('/images/test.jpg') center bottom no-repeat fixed;
  margin-top: -190px;
  /* background-size: cover; */

  /* desktop */
  ${media.desktop`
  `}

  /* tablet */
  ${media.tablet`
  `}

  /* mobile */
  ${media.mobile`
  `}
`;
