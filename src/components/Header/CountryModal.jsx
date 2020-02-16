import React, { createRef } from 'react';
import * as S from './headerStyled';
import CloseIcon from '@material-ui/icons/Close';
import CountryModalContents from './CountryModalContents';

const CountryModal = ({ status, closeClick, selectLang, setSelectLang }) => {
  const modalContainer = createRef();
  const click = e => {
    if (status && !modalContainer.current.contains(e.target)) {
      closeClick();
    }
  };

  return (
    <>
      <S.Modal onClick={click} status={status}>
        <S.ModalContents ref={modalContainer}>
          <S.ModalHeader>
            <S.ModalTitle>언어 및 지역 설정</S.ModalTitle>
            <S.ModalButton onClick={closeClick} autoFocus={true}>
              <CloseIcon style={{ width: '2.0em', height: '2.0em' }} />
            </S.ModalButton>
          </S.ModalHeader>
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
