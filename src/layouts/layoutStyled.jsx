import styled from 'styled-components';
import media from '../libs/MediaQuery';

export const S = {};

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
