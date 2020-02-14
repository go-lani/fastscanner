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
  outboundDate,
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
    moment.locale('ko', koLocale);
    if (momentOutDate) return;
    selectMomentOutboundDate(moment());
  }, [momentOutDate, selectMomentOutboundDate]);

  useEffect(() => {
    if (way === 'oneway') {
      selectInboundDate(null);
    } else {
      if (momentInDate) selectInboundDate(momentInDate.format('YYYY-MM-DD'));
    }
  }, [momentInDate, selectInboundDate, way]);

  const setStartDate = startDate => {
    if (startDate.format('YYYY-MM-DD') === momentOutDate.format('YYYY-MM-DD'))
      return;
    selectMomentOutboundDate(startDate);
    selectOutboundDate(startDate.format('YYYY-MM-DD'));
  };

  const setEndDate = endDate => {
    if (!endDate) return;
    selectMoemntInboundDate(endDate);
    selectInboundDate(endDate.format('YYYY-MM-DD'));
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
