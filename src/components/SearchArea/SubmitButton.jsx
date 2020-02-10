import React from 'react';
import styled, { keyframes } from 'styled-components';
import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';
import * as S from './SearchAreaStyled';

const SubmitButton = props => {
  return (
    <>
      <S.SearchButton>
        <S.ButtonText>{props.btxt}</S.ButtonText>
        <ArrowForwardRoundedIcon fontSize="large" />
      </S.SearchButton>
    </>
  );
};

export default SubmitButton;
