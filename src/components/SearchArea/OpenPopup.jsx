import React, { useState } from 'react';
import styled from 'styled-components';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';
import { lightBlue } from '@material-ui/core/colors';
import ArrowDropDownOutlinedIcon from '@material-ui/icons/ArrowDropDownOutlined';

const StyledOptionPopupWrapper = styled.div`
  width: 370px;
`;
const StyledOptionPopup = styled.div`
  padding: 15px;
  border-radius: 5px;
  background-color: #fff;
  font-size: 1.6rem;
  font-weight: 500;
`;

const StyledCategoryTitle = styled.p`
  font-weight: 700;
  margin: 10px 0;
`;

const StyledSelectCabinClass = styled.select`
  width: 100%;
  height: 35px;
  padding-left: 10px;
  border-radius: 5px;
  -webkit-appearance: ;
  appearance: ;
`;

const StyledRequestRequiredNotice = styled.div`
  width: 100%;
  padding: 15px;
  font-size: 1.2rem;
  border-radius: 5px;
  background-color: #eee;
`;

const StyledCountArea = styled.div`
  width: 100%;
  height: 35px;
  display: flex;
  align-items: center;
`;

const StyledCountButton = styled.button`
  width: 35px;
  height: 35px;
  border-radius: 18px;
  color: ${props => (props.disabled ? '#666' : `${lightBlue[800]}`)};
  background-color: ${props => (props.disabled ? '#eee' : '')};
  cursor: ${props => (props.disabled ? 'default' : 'pointer')};
  border: 2px solid #eee;
`;

const StyledCountNum = styled.span`
  display: inline-block;
  width: 15px;
  text-align: center;
  font-size: 2.2rem;
  margin: 0 10px;
`;

const StyledAgeRangText = styled.span`
  margin-left: 10px;
`;

const StyledNotice = styled.p`
  font-size: 1.2rem;
  margin: 20px 0;
  color: #999;
`;

const StyledLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: #eee;
`;

const StyledCompleteButton = styled.button`
  color: #0288d1;
  font-weight: 700;
  border: 0;
  margin: 10px 0 0 auto;
  display: block;
`;

const StyledTriangle = styled.div`
  width: 15px;
  height: 15px;
  border-right: 15px solid transparent;
  border-bottom: 15px solid #fff;
  border-left: 15px solid transparent;
  margin: 0 auto;
`;

const OptionPopup = () => {
  const [countAdults, setCountAdults] = useState(1);
  const [countChildren, setCountChildren] = useState(0);
  const [cabinClass, setCabinClass] = useState('economy');

  const minusChild = () => {
    setCountChildren(countChildren - 1);
  };

  const minusAdult = () => {
    setCountAdults(countAdults - 1);
  };

  const plusChild = () => {
    setCountChildren(countChildren + 1);
  };

  const plusAdult = () => {
    setCountAdults(countAdults + 1);
  };

  const changeCabinClass = ({ target }) => {
    setCabinClass(target.value);
    console.log(target.value);
  };

  return (
    <StyledOptionPopupWrapper>
      <StyledTriangle />
      <StyledOptionPopup>
        <StyledCategoryTitle>좌석 등급</StyledCategoryTitle>
        <StyledSelectCabinClass
          name="cabinClass"
          onChange={changeCabinClass}
          required
        >
          <option value="economy">일반석</option>
          <option value="premiumeconomy">프리미엄 일반석</option>
          <option value="business">비즈니스석</option>
          <option value="first">일등석</option>
        </StyledSelectCabinClass>
        <StyledRequestRequiredNotice>
          <p style={{ fontWeight: '700' }}>
            검색하신 노선은 일반석 가격만 보여 드릴 수 있습니다.
          </p>
          <p>
            비즈니스석 및 일등석 옵션을 보려면 정확한 날짜 및/또는 도착지 도시
            이름을 알려주세요.
          </p>
        </StyledRequestRequiredNotice>
        <StyledCategoryTitle>성인</StyledCategoryTitle>
        <StyledCountArea>
          <StyledCountButton
            disabled={countAdults ? false : true}
            onClick={minusAdult}
          >
            <RemoveRoundedIcon fontSize="large" />
          </StyledCountButton>
          <StyledCountNum>{countAdults}</StyledCountNum>
          <StyledCountButton onClick={plusAdult}>
            <AddRoundedIcon fontSize="large" />
          </StyledCountButton>
          <StyledAgeRangText>만 16세 이상</StyledAgeRangText>
        </StyledCountArea>
        <StyledCategoryTitle>유/소아</StyledCategoryTitle>
        <StyledCountArea>
          <StyledCountButton
            disabled={countChildren ? false : true}
            onClick={minusChild}
          >
            <RemoveRoundedIcon fontSize="large" />
          </StyledCountButton>
          <StyledCountNum>{countChildren}</StyledCountNum>
          <StyledCountButton onClick={plusChild}>
            <AddRoundedIcon fontSize="large" />
          </StyledCountButton>
          <StyledAgeRangText>만 0 - 15세</StyledAgeRangText>
        </StyledCountArea>
        <StyledNotice>
          여행 시 탑승객의 나이는 예약된 연령 범주에 부합해야 합니다. 항공사는
          만 18세 미만의 단독 여행 탑승객에 대한 제한이 있습니다.
        </StyledNotice>
        <StyledNotice>
          유/소아 동반 여행 시 연령 제한과 정책은 항공사별로 다를 수 있으니
          예약하기 전에 해당 항공사와 확인하시기 바랍니다.
        </StyledNotice>
        <StyledLine />
        <StyledCompleteButton>완료</StyledCompleteButton>
      </StyledOptionPopup>
    </StyledOptionPopupWrapper>
  );
};

export default OptionPopup;
