import React from 'react';
import SelectWayTab from './SelectWayTab';
import SelectAirport from './SelectAirport';
import SelectDate from './SelectDate';
import SelectOption from './SelectOption';
import SubmitButton from './SubmitButton';
import A11yTitle from '../common/A11yTitle';
import { S } from './SearchAreaStyled';

const SearchArea = () => {
  const [way, setWay] = React.useState('왕복');
  return (
    <S.SearchWrapper>
      <A11yTitle>SearchArea(a11yText)</A11yTitle>
      <S.SearchForm>
        <S.SearchTop>
          <SelectWayTab way={way} setWay={setWay} />
          <SelectAirport />
          <SelectDate way={way} />
          <SelectOption />
        </S.SearchTop>
        <S.SearchBottom>
          <span>
            <S.NonstopsCheck type="checkbox" id="nonstops" />
            <label htmlFor="nonstops">직항</label>
          </span>
          <SubmitButton btxt="항공권 검색" />
        </S.SearchBottom>
      </S.SearchForm>
    </S.SearchWrapper>
  );
};

export default SearchArea;
