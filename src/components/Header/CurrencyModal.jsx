import React, { createRef } from 'react';
import * as S from './headerStyled';
import CloseIcon from '@material-ui/icons/Close';
import CurrencyModalContents from './CurrencyModalContents';

const CurrencyModal = ({
  status,
  closeClick,
  selectCurrnecy,
  setSelectCurrency,
}) => {
  const modalContainer = createRef();

  const click = e => {
    if (status && !modalContainer.current.contains(e.target)) {
      closeClick();
    }
  };

  return (
    <div>
      <S.Modal status={status} onClick={click}>
        <S.ModalContents ref={modalContainer}>
          <S.ModalHeader>
            <S.ModalTitle>통화 설정</S.ModalTitle>
            <S.ModalButton onClick={closeClick}>
              <CloseIcon style={{ width: '2.0em', height: '2.0em' }} />
            </S.ModalButton>
          </S.ModalHeader>
          <CurrencyModalContents
            selectCurrnecy={selectCurrnecy}
            setSelectCurrency={setSelectCurrency}
            closeClick={closeClick}
          />
        </S.ModalContents>
      </S.Modal>
    </div>
  );
};

export default CurrencyModal;
