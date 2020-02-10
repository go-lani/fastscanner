import React, { useState } from 'react';
import ArrowDropDownOutlinedIcon from '@material-ui/icons/ArrowDropDownOutlined';
import OptionPopup from './OptionPopup';
import * as S from './SearchAreaStyled';

const SelectOption = () => {
  const [isOpen, setIsOpen] = useState(false);
  const popupOpen = e => setIsOpen(true);
  const popupClose = () => setIsOpen(!isOpen);

  return (
    <>
      <S.SelectOptionWrap>
        <S.FieldTitle as="p">좌석등급 / 승객</S.FieldTitle>
        <S.OptionButton onClick={popupOpen} type="button">
          <S.OptionValue>
            <span>1 성인, 일반석</span>
            <ArrowDropDownOutlinedIcon />
          </S.OptionValue>
        </S.OptionButton>
        <OptionPopup isOpen={isOpen} hidePopup={popupClose} />
      </S.SelectOptionWrap>
    </>
  );
};

export default SelectOption;
