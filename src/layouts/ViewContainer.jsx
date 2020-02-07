import React from 'react';
import { ViewContainerLayout } from './ViewContainerStyled';

const ViewContainer = props => {
  return <ViewContainerLayout>{props.children}</ViewContainerLayout>;
};

export default ViewContainer;
