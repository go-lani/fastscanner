import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import ArrowDropDownOutlinedIcon from '@material-ui/icons/ArrowDropDownOutlined';
// import OptionPopup from './OpenPopup';

const StyledOptionButton = styled.button`
  width: 220px;
  height: 50px;
  border: 0;
  border-radius: 0 5px 5px 0;
  color: #000;
  padding: 0 10px;
`;

const StyledOptionValue = styled.span`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const StyledPopup = styled.div`
  width: 370px;
  height: 460px;
  padding: 15px;
  border-radius: 10px;
  background-color: #fff;
`;
const optionWidgetRoot = document.getElementById('select-option-root');

const SelectOption = () => {
  const [isOpen, setIsOpen] = useState(true);
  const handleOpenButtonClick = e => {
    console.log(e);
    setIsOpen(true);
  };
  const handleCloseButtonClick = () => setIsOpen(!isOpen);

  // const renderWidget = () => {
  //   return <>{isOpen && <OptionPopup />}</>;
  // };

  return (
    <>
      <StyledOptionButton
        onClick={handleOpenButtonClick}
        id="select-option-root"
      >
        <StyledOptionValue>
          <span>1 성인, 일반석</span>
          <ArrowDropDownOutlinedIcon />
        </StyledOptionValue>
      </StyledOptionButton>
      {/* {ReactDOM.createPortal(renderWidget(), optionWidgetRoot)} */}
    </>
  );
};

export default SelectOption;
