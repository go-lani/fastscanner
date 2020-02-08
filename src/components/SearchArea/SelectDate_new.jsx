import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import moment from 'moment';
import koLocale from 'moment/locale/ko';
import 'react-dates/lib/css/_datepicker.css';
import './Date.css';

const StyledDateButton = styled.button`
  width: 130px;
  height: 50px;
  border: 0;
  color: #000;
  padding-left: 10px;
`;

const SelectDate = () => {
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(null);
  const [way, setWay] = useState('');
  const [focusedInput, setFocusedInput] = useState(null);

  useEffect(() => {
    moment.locale('ko', koLocale);
  }, []);

  const handleClick = () => {
    console.log(
      '출국날짜',
      startDate
        .toISOString()
        .split('')
        .slice(0, 10)
        .join(''),
    );
    console.log(
      '입국날짜',
      endDate
        .toISOString()
        .split('')
        .slice(0, 10)
        .join(''),
    );
    // console.log(startDate._d.toDateString(), endDate);
  };

  return (
    <>
      <DateRangePicker
        startDateId="startDate"
        endDateId="endDate"
        startDate={startDate}
        endDate={endDate}
        endDatePlaceholderText="입국날짜"
        // disabled="endDate"
        onDatesChange={({ startDate, endDate }) => {
          // console.log(startDate, endDate);
          setStartDate(startDate);
          setEndDate(endDate);
        }}
        focusedInput={focusedInput}
        onFocusChange={focusedInput => {
          setFocusedInput(focusedInput);
        }}
        disabled={way === '편도' ? 'endDate' : null}
        numberOfMonths={1}
        required={true}
        displayFormat="YYYY년 MM월 DD일"
        hideKeyboardShortcutsPanel={true}
        noBorder={true}
        readOnly={true}
      />
    </>
  );
};

export default SelectDate;
