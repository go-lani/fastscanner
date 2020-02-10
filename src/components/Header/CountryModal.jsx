import React from 'react';
import * as S from './headerStyled';
import CloseIcon from '@material-ui/icons/Close';
import CountryModalContents from './CountryModalContents';

const CountryModal = ({ status, closeClick, selectLang, setSelectLang }) => {
  const click = e => {
    if (e.target.className === 'sc-AxheI dhCDjk') return closeClick();
  };

  return (
    <>
      <S.Modal onClick={click} status={status}>
        <S.ModalContents>
          <S.ModalButton onClick={closeClick} autoFocus={true}>
            <CloseIcon style={{ width: '2.0em', height: '2.0em' }} />
          </S.ModalButton>
          <CountryModalContents
            selectLang={selectLang}
            setSelectLang={setSelectLang}
            closeClick={closeClick}
          />
        </S.ModalContents>
      </S.Modal>
    </>
  );
};

export default CountryModal;
