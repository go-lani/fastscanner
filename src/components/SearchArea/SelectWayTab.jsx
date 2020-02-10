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
        radioId="test"
        size="large"
        categoryName="hello"
        text="test text"
      />
      <Radio
        radioId="test2"
        size="medium"
        categoryName="hello"
        text="test text2"
      />
      <Radio
        radioId="test3"
        size="small"
        categoryName="hello"
        text="test text2"
      />
    </fieldset>
  );
};

export default SelectWayTab;
