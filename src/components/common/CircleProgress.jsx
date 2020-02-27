import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/styles';

const CircleProgress = props => {
  const useStyles = makeStyles({
    active: props => ({
      color: '#fff',
    }),
    white: props => ({
      color: '#fff',
    }),
  });

  const classes = useStyles();

  return (
    <CircularProgress className={`${classes[props.classtype]}`} {...props} />
  );
};

export default CircleProgress;
