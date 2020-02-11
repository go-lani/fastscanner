import React from 'react';
import A11yTitle from '../common/A11yTitle';
import Radio from '../common/Radio';

const SelectWayTab = ({ way, setWay }) => {
  const handleChange = event => {
    setWay(event.target.value);
    console.log(event.target.value);
  };
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
      />
      <Radio
        radioId="oneway"
        size="medium"
        categoryName="way"
        value="편도"
        label="편도"
        onChange={handleChange}
      />
    </fieldset>
  );
};

export default SelectWayTab;
