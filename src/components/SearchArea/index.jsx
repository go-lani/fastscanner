import React from 'react';
import SelectWayTab from './SelectWayTab';
import SelectAirport from './SelectAirport';
import SelectDate from './SelectDate';
import SelectOption from './SelectOption';
import SubmitButton from './SubmitButton';
import A11yTitle from '../common/A11yTitle';
import CheckBox from '../common/CheckBox';
import * as S from './SearchAreaStyled';
import Button from '../common/Button';

const SearchArea = () => {
  const [way, setWay] = React.useState('왕복');
  return (
    <S.SearchWrapper>
      <S.Greeting>어디로 떠나볼까요?</S.Greeting>
      <S.SearchForm>
        <SelectWayTab way={way} setWay={setWay} />
        <S.SearchTop>
          <SelectAirport />
          <SelectDate way={way} />
          <SelectOption />
        </S.SearchTop>
        <S.SearchBottom>
          <CheckBox label="직항" id="nonstop" isDisable={true} />
          <SubmitButton btxt="항공권 검색" />
          <Button
            text="항공권 검색"
            size="large"
            color="blue"
            img="/plane.png"
          />
          <Button
            text="항공권 검색"
            size="medium"
            color="blue"
            img="/plane.png"
          />
          <Button text="선택" size="small" color="blue" image="plane" />
        </S.SearchBottom>
      </S.SearchForm>
    </S.SearchWrapper>
  );
};

export default SearchArea;
