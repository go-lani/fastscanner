import React, { useState, createRef, useEffect } from 'react';
import ArrowDropDownOutlinedIcon from '@material-ui/icons/ArrowDropDownOutlined';
import OptionPopup from './OptionPopup';
import * as S from './SearchAreaStyled';
// import { useSelector } from 'react-redux';

const SelectOption = ({
  cabinClass,
  adults,
  children,
  infants,
  selectCabinClass,
  selectAdults,
  selectChildren,
  selectInfants,
  originPlace,
  destinationPlace,
  outboundDate,
  inboundDate,
}) => {
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
        <OptionPopup
          isOpen={isOpen}
          hidePopup={popupClose}
          cabinClass={cabinClass}
          adults={adults}
          children={children}
          infants={infants}
          selectCabinClass={selectCabinClass}
          selectAdults={selectAdults}
          selectChildren={selectChildren}
          selectInfants={selectInfants}
          originPlace={originPlace}
          destinationPlace={destinationPlace}
          outboundDate={outboundDate}
          inboundDate={inboundDate}
        />
        <S.Dim ref={dimRef} isOpen={isOpen} onClick={click} />
      </div>
    </>
  );
};

export default SelectOption;
