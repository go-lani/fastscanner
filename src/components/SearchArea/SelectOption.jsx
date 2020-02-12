import React, { useState, createRef } from 'react';
import ArrowDropDownOutlinedIcon from '@material-ui/icons/ArrowDropDownOutlined';
import OptionPopup from './OptionPopup';
import * as S from './SearchAreaStyled';
import { useSelector } from 'react-redux';

const SelectOption = () => {
  const [isOpen, setIsOpen] = useState(false);
  const cabinClass = useSelector(state => state.search.cabinClass);
  const countAdults = useSelector(state => state.search.adults);
  const countChildren = useSelector(state => state.search.children);
  // const dimRef = createRef();

  const popupOpen = e => setIsOpen(true);
  const popupClose = () => setIsOpen(!isOpen);

  // const click = e => {
  //   console.log(e.target);
  //   if (dimRef.current.contains(e.target)) setIsOpen(false);
  // };

  const cabinClassName = () => {
    return cabinClass === 'economy'
      ? '일반석'
      : cabinClass === 'premiumeconomy'
      ? '프리미엄 일반석'
      : cabinClass === 'business'
      ? '비즈니스석'
      : '일등석';
  };

  return (
    <>
      {/* <S.Dim ref={dimRef} onClick={click} /> */}
      <div className="option-field options">
        <S.FieldTitle as="p">좌석등급 / 승객</S.FieldTitle>
        <S.OptionButton onClick={popupOpen} type="button">
          <S.OptionValue>
            <span>
              {countAdults + countChildren} 승객, {cabinClassName()}
            </span>
            <ArrowDropDownOutlinedIcon />
          </S.OptionValue>
        </S.OptionButton>
        <OptionPopup
          isOpen={isOpen}
          hidePopup={popupClose}
          cabinClass={cabinClass}
        />
      </div>
    </>
  );
};

export default SelectOption;
