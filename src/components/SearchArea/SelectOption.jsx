import React, { useState, createRef } from 'react';
import OptionPopupContainer from '../../container/OptionPopupContainer';
import ArrowDropDownOutlinedIcon from '@material-ui/icons/ArrowDropDownOutlined';
import * as S from './SearchAreaStyled';

const SelectOption = ({ cabinClass, adults, children, infants }) => {
  const [isOpen, setIsOpen] = useState(false);
  const popupOpen = e => setIsOpen(true);
  const popupClose = () => setIsOpen(!isOpen);

  const dimRef = createRef();

  const cabinClassName = () => {
    return cabinClass === 'economy'
      ? '일반석'
      : cabinClass === 'premiumeconomy'
      ? '프리미엄 일반석'
      : cabinClass === 'business'
      ? '비즈니스석'
      : '일등석';
  };

  const click = e => {
    if (dimRef.current.contains(e.target)) setIsOpen(false);
  };
  return (
    <>
      <div className="option-field options">
        <S.FieldTitle as="p">좌석등급 / 승객</S.FieldTitle>
        <S.OptionButton onClick={popupOpen} type="button">
          <S.OptionValue>
            <span>
              {adults + children + infants} 승객, {cabinClassName()}
            </span>
            <ArrowDropDownOutlinedIcon />
          </S.OptionValue>
        </S.OptionButton>
        <OptionPopupContainer isOpen={isOpen} hidePopup={popupClose} />

        <S.Dim ref={dimRef} isOpen={isOpen} onClick={click} />
      </div>
    </>
  );
};

export default SelectOption;
