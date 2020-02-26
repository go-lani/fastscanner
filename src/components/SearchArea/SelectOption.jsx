import React, { useState, createRef } from 'react';
import { useSelector } from 'react-redux';
import OptionPopupContainer from '../../container/OptionPopupContainer';
import ArrowDropDownOutlinedIcon from '@material-ui/icons/ArrowDropDownOutlined';
import Popup from '../Popup';
import * as S from './SearchAreaStyled';
import { useEffect } from 'react';

const SelectOption = ({ cabinClass, adults, children, infants }) => {
  const [isOpen, setIsOpen] = useState(false);
  const popupOpen = e => setIsOpen(true);
  const popupClose = () => setIsOpen(!isOpen);

  const dimRef = createRef();
  const device = useSelector(state => state.util.device);

  const cabinClassName = (() => {
    return cabinClass === 'economy'
      ? '일반석'
      : cabinClass === 'premiumeconomy'
      ? '프리미엄 일반석'
      : cabinClass === 'business'
      ? '비즈니스석'
      : '일등석';
  })();

  const click = e => {
    if (device === 'Desktop') {
      if (isOpen && dimRef.current.contains(e.target)) setIsOpen(false);
    } else {
      if (isOpen && dimRef.current === e.target) setIsOpen(false);
    }
  };

  useEffect(() => {
    console.log(device);
  }, [device]);

  return (
    <>
      <div className="option-field options">
        <S.FieldTitle as="p">좌석등급 / 승객</S.FieldTitle>
        <S.OptionButton onClick={popupOpen} type="button">
          <S.OptionValue>
            {adults + children + infants} 승객, {cabinClassName}
            <ArrowDropDownOutlinedIcon />
          </S.OptionValue>
        </S.OptionButton>
        {device === 'Desktop' ? (
          <>
            <OptionPopupContainer isOpen={isOpen} hidePopup={popupClose} />
            <S.Dim ref={dimRef} isOpen={isOpen} onClick={click} />
          </>
        ) : isOpen ? (
          <Popup visible={isOpen} hide={popupClose} name="optionsPopup">
            <OptionPopupContainer hidePopup={popupClose} />
          </Popup>
        ) : null}
      </div>
    </>
  );
};

export default SelectOption;
