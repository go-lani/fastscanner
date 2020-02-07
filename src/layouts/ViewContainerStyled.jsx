import styled from 'styled-components';
import media from '../libs/MediaQuery';

export const ViewContainerLayout = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 400px 0 0;
  background: url('/images/test3.jpg') 0 0 no-repeat fixed;


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
