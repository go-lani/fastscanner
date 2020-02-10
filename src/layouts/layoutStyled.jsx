import styled from 'styled-components';
import media from '../libs/MediaQuery';

export const S = {};

S.MainLayout = styled.div`
  overflow: hidden;
  display: flex;
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
  z-index: 3;
  margin: -200px 0 0;
  padding: 200px 0 0;
  background: url('/images/test.jpg') center bottom no-repeat fixed;
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
