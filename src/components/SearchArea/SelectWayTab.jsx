import React, { useCallback } from 'react';
import A11yTitle from '../Common/A11yTitle';
import Radio from '../Common/Radio';

const SelectWayTab = ({ way, changeWay }) => {
  const handleChange = useCallback(
    event => {
      changeWay(event.target.id);
    },
    [changeWay],
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
        checked={way === 'round'}
        // checked={way === 'round' ? true : false}
      />
      <Radio
        radioId="oneway"
        size="medium"
        categoryName="way"
        value="편도"
        label="편도"
        onChange={handleChange}
        checked={way === 'oneway'}
        // checked={way === 'oneway' ? true : false}
      />
    </fieldset>
  );
};

export default SelectWayTab;
