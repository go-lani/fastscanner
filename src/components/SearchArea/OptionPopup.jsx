import React, { useState, useCallback, createRef, useEffect } from 'react';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';
import * as S from './SearchAreaStyled';
import {
  getClassSaga,
  getAdultsSaga,
  getChildrenSaga,
} from '../../redux/modules/search';
import { useSelector, useDispatch } from 'react-redux';

const OptionPopup = ({ isOpen, hidePopup }) => {
  const [countAdults, setCountAdults] = useState(1);
  const [countChildren, setCountChildren] = useState(0);
  const [cabinClass, setCabinClass] = useState('economy');
  // const cabinClass = useSelector(state => state.search.cabinClass)
  const cabinClassRef = createRef();

  const dispatch = useDispatch();

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
    dispatch(getClassSaga(cabinClassRef.current.value));
    console.log(target.value);
  };

  const submitOption = () => {
    hidePopup();
  };

  useEffect(() => {
    dispatch(getAdultsSaga(countAdults));
  }, [countAdults, dispatch]);

  useEffect(() => {
    dispatch(getChildrenSaga(countChildren));
  }, [countChildren, dispatch]);

  return (
    <>
      <S.OptionPopupWrapper isOpen={isOpen}>
        <S.Triangle />
        <S.OptionPopup>
          <S.CategoryTitle>좌석 등급</S.CategoryTitle>
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
          <S.RequestRequiredNotice>
            <p style={{ fontWeight: '700' }}>
              검색하신 노선은 일반석 가격만 보여 드릴 수 있습니다.
            </p>
            <p>
              비즈니스석 및 일등석 옵션을 보려면 정확한 날짜 및/또는 도착지 도시
              이름을 알려주세요.
            </p>
          </S.RequestRequiredNotice>
          <S.CategoryTitle>성인</S.CategoryTitle>
          <S.CountArea>
            <S.CountButton
              type="button"
              disabled={countAdults === 1 ? true : false}
              onClick={minusAdult}
            >
              <RemoveRoundedIcon fontSize="large" />
            </S.CountButton>
            <S.CountNum>{countAdults}</S.CountNum>
            <S.CountButton type="button" onClick={plusAdult}>
              <AddRoundedIcon fontSize="large" />
            </S.CountButton>
            <S.AgeRangText>만 16세 이상</S.AgeRangText>
          </S.CountArea>
          <S.CategoryTitle>유/소아</S.CategoryTitle>
          <S.CountArea>
            <S.CountButton
              type="button"
              disabled={countChildren ? false : true}
              onClick={minusChild}
            >
              <RemoveRoundedIcon fontSize="large" />
            </S.CountButton>
            <S.CountNum>{countChildren}</S.CountNum>
            <S.CountButton type="button" onClick={plusChild}>
              <AddRoundedIcon fontSize="large" />
            </S.CountButton>
            <S.AgeRangText>만 0 - 15세</S.AgeRangText>
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
