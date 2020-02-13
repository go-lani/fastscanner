import React, { useState, useEffect } from 'react';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import moment from 'moment';
import koLocale from 'moment/locale/ko';
import 'react-dates/lib/css/_datepicker.css';
import './Date.css';
import * as S from './SearchAreaStyled';
import { useSelector, useDispatch } from 'react-redux';
import { getOutDateSaga, getInDateSaga } from '../../redux/modules/search';

const SelectDate = () => {
  const [outboundDate, setOutboundDate] = useState(moment());
  const [inboundDate, setInboundDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);
  const way = useSelector(state => state.search.way);
  const inboundDateInRedux = useSelector(state => state.search.inboundDate);

  const dispatch = useDispatch();

  useEffect(() => {
    moment.locale('ko', koLocale);
    dispatch(
      getOutDateSaga(
        moment()
          .toISOString()
          .split('')
          .slice(0, 10)
          .join(''),
      ),
    );
  }, [dispatch]);

  useEffect(() => {
    if (way === 'oneway') {
      dispatch(getInDateSaga(null));
    } else {
      if (!inboundDateInRedux && inboundDate) {
        dispatch(
          getInDateSaga(
            inboundDate
              .toISOString()
              .split('')
              .slice(0, 10)
              .join(''),
          ),
        );
      }
    }
  }, [dispatch, inboundDate, inboundDateInRedux, way]);

  const setStartDate = startDate => {
    if (
      outboundDate
        .toISOString()
        .split('')
        .slice(0, 10)
        .join('') ===
      startDate
        .toISOString()
        .split('')
        .slice(0, 10)
        .join('')
    )
      return;

    setOutboundDate(startDate);
    dispatch(
      getOutDateSaga(
        startDate
          .toISOString()
          .split('')
          .slice(0, 10)
          .join(''),
      ),
    );
  };

  const setEndDate = endDate => {
    if (!endDate) return;

    setInboundDate(endDate);
    if (way === 'round') {
      dispatch(
        getInDateSaga(
          endDate
            .toISOString()
            .split('')
            .slice(0, 10)
            .join(''),
        ),
      );
    }
  };

  return (
    <fieldset className="option-field date">
      <S.FieldTitle>가는날 / 오는날</S.FieldTitle>
      <DateRangePicker
        startDateId="startDate"
        endDateId="endDate"
        startDate={outboundDate}
        endDate={way === 'round' ? inboundDate : null}
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
