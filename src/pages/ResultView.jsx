import React from 'react';
import ViewLayout from '../layouts/ViewLayout';
import ResultArea from '../components/ResultArea';
import FilterArea from '../components/FilterArea';

const ResultView = () => {
  return (
    <ViewLayout>
      <FilterArea />
      <ResultArea />
    </ViewLayout>
  );
};

export default ResultView;
