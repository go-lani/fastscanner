import React, { useState } from 'react';
import styled from 'styled-components';
import 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const StyledDateButton = styled.button`
  width: 130px;
  height: 50px;
  border: 0;
  color: #000;
  padding-left: 10px;
`;

const SelectDate = ({ way }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const DatePick = ({ value, onClick }) => (
    <StyledDateButton onClick={onClick}>{value}</StyledDateButton>
  );
  return (
    <>
      <DatePicker
        dateFormat="yyyy/MM/dd"
        selected={startDate}
        selectsStart
        onChange={date => setStartDate(date)}
        customInput={<DatePick />}
        startDate={startDate}
        minDate={startDate}
      />
      <DatePicker
        dateFormat="yyyy/MM/dd"
        selected={endDate}
        selectsEnd
        onChange={date => setEndDate(date)}
        customInput={<DatePick />}
        disabled={way === '편도' ? true : false}
        endDate={endDate}
        minDate={startDate}
      />
    </>
  );
};

export default SelectDate;
