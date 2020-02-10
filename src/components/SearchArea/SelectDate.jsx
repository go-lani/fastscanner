import React, { useState, useEffect } from 'react';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import moment from 'moment';
import koLocale from 'moment/locale/ko';
import 'react-dates/lib/css/_datepicker.css';
import './Date.css';
import * as S from './SearchAreaStyled';

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
    <fieldset>
      <S.FieldTitle>가는날 / 오는날</S.FieldTitle>
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
    </fieldset>
  );
};

export default SelectDate;
