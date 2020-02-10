import React from 'react';
import * as S from './headerStyled';
import CloseIcon from '@material-ui/icons/Close';
import CurrencyModalContents from './CurrencyModalContents';

const CurrencyModal = ({
  status,
  closeClick,
  selectCurrnecy,
  setSelectCurrency,
}) => {
  const click = e => {
    if (e.target.className === 'sc-AxheI dhCDjk') return closeClick();
  };

  return (
    <div>
      <S.Modal status={status} onClick={click}>
        <S.ModalContents>
          <S.ModalButton onClick={closeClick}>
            <CloseIcon style={{ width: '2.0em', height: '2.0em' }} />
          </S.ModalButton>
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
