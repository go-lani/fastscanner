import React from 'react';
import uuid from 'uuid';
import { LinearProgress } from '@material-ui/core';
import FlightItem from './FlightItem';
import A11yTitle from '../../Common/A11yTitle';
import Loader from './Loader';
import * as S from './ListAreaStyled';

const ListArea = ({ datas, progress, setFilterModalVisible, loading }) => {
  const openFilterArea = () => {
    setFilterModalVisible(true);
  };
  return (
    <S.ListLayout>
      <A11yTitle>항공권 검색 결과</A11yTitle>
      <LinearProgress variant="determinate" value={progress} />
      <S.FilterButton onClick={openFilterArea}>필터(조건)</S.FilterButton>
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
        {loading && <Loader />}
        {!loading &&
          datas &&
          datas.map(data => <FlightItem key={uuid.v4()} {...data} />)}
        {!loading && !datas && '해당하는 결과가 없습니다.'}
      </S.FlightList>
    </S.ListLayout>
  );
};

export default ListArea;
