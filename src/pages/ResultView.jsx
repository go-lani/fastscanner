import React from 'react';
import ViewContainer from '../layouts/ViewContainer';
import ResultArea from '../components/ResultArea';
import FilterArea from '../components/FilterArea';

const ResultView = () => {
  return (
    <ViewContainer>
      <FilterArea />
      <ResultArea />
    </ViewContainer>
  );
};

export default ResultView;
