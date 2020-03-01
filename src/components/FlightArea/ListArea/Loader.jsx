import React from 'react';
import ContentLoader from 'react-content-loader';
import * as S from './ListAreaStyled';
import { useSelector } from 'react-redux';

const Loader = () => {
  const device = useSelector(state => state.util.device);
  const way = useSelector(state => state.search.way);

  const loaderRender = (() => {
    if (device === 'Desktop') {
      // Desktop
      if (way === 'round') {
        // 왕복
        return (
          <ContentLoader
            style={{ width: '100%', height: '100%' }}
            speed={2}
            viewBox="0 0 1000 260"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect x="14" y="13" rx="15" ry="15" width="676" height="114" />
            <rect x="787" y="134" rx="5" ry="5" width="123" height="39" />
            <rect x="15" y="137" rx="15" ry="15" width="676" height="114" />
            <rect x="791" y="68" rx="5" ry="5" width="114" height="55" />
            <rect x="701" y="21" rx="0" ry="0" width="1" height="226" />
          </ContentLoader>
        );
      } else {
        // 편도
        return (
          <ContentLoader
            style={{ width: '100%', height: '100%' }}
            speed={2}
            viewBox="0 0 1000 150"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect x="33" y="10" rx="15" ry="15" width="636" height="130" />
            <rect x="789" y="89" rx="5" ry="5" width="123" height="39" />
            <rect x="792" y="25" rx="5" ry="5" width="114" height="55" />
            <rect x="700" y="19" rx="0" ry="0" width="1" height="120" />
          </ContentLoader>
        );
      }
    } else {
      // Tablet & Mobile
      if (way === 'round') {
        // 왕복
        return (
          <ContentLoader
            style={{ width: '100%' }}
            speed={2}
            viewBox="0 0 1023 410"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect x="32" y="16" rx="5" ry="5" width="952" height="105" />
            <rect x="32" y="131" rx="5" ry="5" width="952" height="105" />
            <rect x="445" y="341" rx="5" ry="5" width="132" height="43" />
            <rect x="454" y="271" rx="5" ry="5" width="115" height="57" />
            <rect x="1" y="249" rx="0" ry="0" width="1000" height="2" />
          </ContentLoader>
        );
      } else {
        // 편도
        return (
          <ContentLoader
            style={{ width: '100%' }}
            speed={2}
            viewBox="0 0 1023 300"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect x="32" y="16" rx="5" ry="5" width="952" height="105" />
            <rect x="445" y="226" rx="5" ry="5" width="132" height="43" />
            <rect x="454" y="156" rx="5" ry="5" width="115" height="57" />
            <rect x="1" y="134" rx="0" ry="0" width="1000" height="2" />
          </ContentLoader>
        );
      }
    }
  })();

  return <S.FlightItem>{loaderRender}</S.FlightItem>;
};

export default Loader;
