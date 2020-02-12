import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import A11yTitle from '../Common/A11yTitle';
import Radio from '../Common/Radio';
import { changeWaySaga, getInDateSaga } from '../../redux/modules/search';

const SelectWayTab = () => {
  const way = useSelector(state => state.search.way);
  const dispatch = useDispatch();

  const handleChange = useCallback(
    event => {
      dispatch(changeWaySaga(event.target.id));
      dispatch(getInDateSaga(null));
    },
    [dispatch],
  );

  return (
    <fieldset className="way-tab">
      <A11yTitle as="legend">구간 설정</A11yTitle>
      <Radio
        radioId="round"
        size="medium"
        categoryName="way"
        value="왕복"
        label="왕복"
        onChange={handleChange}
        default={way === 'round'}
      />
      <Radio
        radioId="oneway"
        size="medium"
        categoryName="way"
        value="편도"
        label="편도"
        onChange={handleChange}
        default={way === 'oneway'}
      />
    </fieldset>
  );
};

export default SelectWayTab;
