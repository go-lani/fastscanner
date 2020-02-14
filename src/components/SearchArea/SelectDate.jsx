import React, { useState, useEffect } from 'react';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import moment from 'moment';
import koLocale from 'moment/locale/ko';
import 'react-dates/lib/css/_datepicker.css';
import './Date.css';
import * as S from './SearchAreaStyled';

const SelectDate = ({
  way,
  inboundDate,
  selectOutboundDate,
  selectInboundDate,
  momentOutDate,
  momentInDate,
  selectMomentOutboundDate,
  selectMoemntInboundDate,
}) => {
  const [focusedInput, setFocusedInput] = useState(null);

  useEffect(() => {
    console.log(moment());
    moment.locale('ko', koLocale);
    selectMomentOutboundDate(moment());
  }, [selectMomentOutboundDate]);

  useEffect(() => {
    selectOutboundDate(
      moment()
        ._d.toISOString()
        .split('')
        .slice(0, 10)
        .join(''),
    );
  }, [selectOutboundDate]);

  useEffect(() => {
    if (way === 'oneway') {
      selectInboundDate(null);
    }
  }, [inboundDate, selectInboundDate, way]);

  const setStartDate = startDate => {
    selectMomentOutboundDate(startDate);
    selectOutboundDate(
      startDate._d
        .toISOString()
        .split('')
        .slice(0, 10)
        .join(''),
    );
  };

  const setEndDate = endDate => {
    if (!endDate) return;
    selectMoemntInboundDate(endDate);
    selectInboundDate(
      endDate
        .toISOString()
        .split('')
        .slice(0, 10)
        .join(''),
    );
  };

  return (
    <fieldset className="option-field date">
      <S.FieldTitle>가는날 / 오는날</S.FieldTitle>
      <DateRangePicker
        startDateId="startDate"
        endDateId="endDate"
        startDate={momentOutDate}
        endDate={way === 'round' ? momentInDate : null}
        endDatePlaceholderText={way === 'oneway' ? '(편도)' : '입국날짜'}
        onDatesChange={({ startDate, endDate }) => {
          setStartDate(startDate);
          setEndDate(endDate);
        }}
        focusedInput={focusedInput}
        onFocusChange={focusedInput => {
          setFocusedInput(focusedInput);
        }}
        disabled={way === 'oneway' ? 'endDate' : null}
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
