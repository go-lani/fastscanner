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

  useEffect(() => {
    // outboundDate 와 momentOutboundDate가 다르면 outboundDate를 momnetOutboundDate로 업데이트한다.
    // if (
    //   momentOutDate &&
    //   outboundDate !==
    //     momentOutDate._d
    //       .toISOString()
    //       .split('')
    //       .slice(0, 10)
    //       .join('')
    // )
    //   selectOutboundDate(momentOutDate)
    //     ._d.toISOString()
    //     .split('')
    //     .slice(0, 10)
    //     .join('');
  }, [momentOutDate, outboundDate, selectOutboundDate]);

  const setStartDate = startDate => {
    if (
      startDate._d
        .toISOString()
        .split('')
        .slice(0, 10)
        .join('') ===
      momentOutDate._d
        .toISOString()
        .split('')
        .slice(0, 10)
        .join('')
    )
      return;
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
