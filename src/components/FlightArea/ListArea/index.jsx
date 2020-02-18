import React from 'react';
import * as S from './ListAreaStyled';
import FlightItem from './FlightItem';
import A11yTitle from '../../Common/A11yTitle';

const ListArea = props => {
  return (
    <S.ListLayout>
      <A11yTitle>항공권 검색 결과</A11yTitle>
      <S.CategoryTab>
        <li>
          <button>최저가</button>
        </li>
        <li>
          <button>최단여행시간</button>
        </li>
        <li>
          <button>추천순</button>
        </li>
      </S.CategoryTab>
      <S.FlightList>
        {/* map */}
        <FlightItem />
      </S.FlightList>
    </S.ListLayout>
  );
};

export default ListArea;
