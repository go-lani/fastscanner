import React, { createRef } from 'react';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';
import * as S from './SearchAreaStyled';

const OptionPopup = ({
  isOpen,
  hidePopup,
  way,
  destinationPlace,
  inboundDate,
  adults,
  children,
  infants,
  selectCabinClass,
  selectAdults,
  selectChildren,
  selectInfants,
}) => {
  const cabinClassRef = createRef();
  const allCount = adults + children + infants;

  const minusAdult = () => {
    selectAdults(adults - 1);
  };

  const minusChild = () => {
    selectChildren(children - 1);
  };

  const minusInfants = () => {
    selectInfants(infants - 1);
  };

  const plusAdult = () => {
    selectAdults(adults + 1);
  };

  const plusChild = () => {
    selectChildren(children + 1);
  };

  const plusInfants = () => {
    // countInfants를 올리는데 countAdults의 수와 같지 않다면 alert을 표시
    if (adults === infants)
      return alert('성인 1명당 유아 1명까지 선택할 수 있습니다.');
    selectInfants(infants + 1);
  };

  const changeCabinClass = ({ target }) => {
    selectCabinClass(cabinClassRef.current.value);
  };

  const submitOption = () => {
    hidePopup();
  };

  const selectClass = () => {
    if (way === 'round')
      return !destinationPlace || !inboundDate ? false : true;
    else return !destinationPlace ? false : true;
  };

  return (
    <>
      <S.OptionPopupWrapper isOpen={isOpen}>
        <S.OptionPopup>
          <S.CategoryTitle>좌석 등급</S.CategoryTitle>
          {selectClass() ? (
            <S.SelectCabinClass
              name="cabinClass"
              onChange={changeCabinClass}
              required
              ref={cabinClassRef}
            >
              <option value="economy">일반석</option>
              <option value="premiumeconomy">프리미엄 일반석</option>
              <option value="business">비즈니스석</option>
              <option value="first">일등석</option>
            </S.SelectCabinClass>
          ) : (
            <S.RequestRequiredNotice>
              <p style={{ fontWeight: '700' }}>
                검색하신 노선은 일반석 가격만 보여 드릴 수 있습니다.
              </p>
              <p>
                비즈니스석 및 일등석 옵션을 보려면 정확한 날짜 및 도착지 도시
                이름을 알려주세요.
              </p>
            </S.RequestRequiredNotice>
          )}
          <S.CategoryTitle>성인</S.CategoryTitle>
          <S.CountArea>
            <S.CountButton
              type="button"
              disabled={adults === 1 ? true : false}
              onClick={minusAdult}
            >
              <RemoveRoundedIcon fontSize="large" />
            </S.CountButton>
            <S.CountNum>{adults}</S.CountNum>
            <S.CountButton
              type="button"
              disabled={allCount === 16 ? true : false}
              onClick={plusAdult}
            >
              <AddRoundedIcon fontSize="large" />
            </S.CountButton>
            <S.AgeRangText>만 16세 이상</S.AgeRangText>
          </S.CountArea>
          <S.CategoryTitle>소아</S.CategoryTitle>
          <S.CountArea>
            <S.CountButton
              type="button"
              disabled={children ? false : true}
              onClick={minusChild}
            >
              <RemoveRoundedIcon fontSize="large" />
            </S.CountButton>
            <S.CountNum>{children}</S.CountNum>
            <S.CountButton
              type="button"
              disabled={allCount === 16 ? true : false}
              onClick={plusChild}
            >
              <AddRoundedIcon fontSize="large" />
            </S.CountButton>
            <S.AgeRangText>만 16세 미만</S.AgeRangText>
          </S.CountArea>
          <S.CategoryTitle>유아</S.CategoryTitle>
          <S.CountArea>
            <S.CountButton
              type="button"
              disabled={infants ? false : true}
              onClick={minusInfants}
            >
              <RemoveRoundedIcon fontSize="large" />
            </S.CountButton>
            <S.CountNum>{infants}</S.CountNum>
            <S.CountButton
              type="button"
              disabled={allCount === 16 ? true : false}
              onClick={plusInfants}
            >
              <AddRoundedIcon fontSize="large" />
            </S.CountButton>
            <S.AgeRangText>만 24개월 미만</S.AgeRangText>
          </S.CountArea>
          <S.Notice>
            여행 시 탑승객의 나이는 예약된 연령 범주에 부합해야 합니다. 항공사는
            만 18세 미만의 단독 여행 탑승객에 대한 제한이 있습니다.
          </S.Notice>
          <S.Notice>
            유/소아 동반 여행 시 연령 제한과 정책은 항공사별로 다를 수 있으니
            예약하기 전에 해당 항공사와 확인하시기 바랍니다.
          </S.Notice>
          <S.CompleteButton type="button" onClick={submitOption}>
            완료
          </S.CompleteButton>
        </S.OptionPopup>
      </S.OptionPopupWrapper>
    </>
  );
};

export default OptionPopup;
