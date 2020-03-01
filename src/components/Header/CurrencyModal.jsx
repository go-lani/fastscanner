import React from 'react';
import * as S from './headerStyled';
import CloseIcon from '@material-ui/icons/Close';
import CurrencyModalContents from './CurrencyModalContents';

const CurrencyModal = ({ closeClick, selectCurrnecy, setSelectCurrency }) => {
  return (
    <div>
      <S.ModalContents>
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
    </div>
  );
};

export default CurrencyModal;
