import React, { useState, useEffect } from 'react';
import ModalPortal from './ModalPotal';
import * as S from './popupStyled';

const Popup = ({ visible, children, hide, title, name }) => {
  const [animate, setAnimate] = useState(false);
  const [localVisible, setLocalVisible] = useState(visible);

  useEffect(() => {
    if (localVisible && !visible) {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 300);
    }
    setLocalVisible(visible);
  }, [localVisible, visible]);

  if (!localVisible && !animate) return null;

  return (
    <ModalPortal>
      <S.PopupLayout>
        <S.Dim disappear={!visible} onClick={hide} />
        <S.PopupInner disappear={!visible}>
          {name !== 'optionsPopup' && (
            <>
              {title && <p>{title}</p>}
              <S.CloseButton onClick={hide}>취소</S.CloseButton>
            </>
          )}
          {children}
        </S.PopupInner>
      </S.PopupLayout>
    </ModalPortal>
  );
};

export default Popup;
