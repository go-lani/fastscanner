import React from 'react';
import styled from 'styled-components';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { lightBlue } from '@material-ui/core/colors';
import FormLabel from '@material-ui/core/FormLabel';
import { withStyles } from '@material-ui/core/styles';

const LightBlueRadio = withStyles({
  root: {
    color: lightBlue[50],
    '&$checked': {
      color: lightBlue[500],
    },
  },
  checked: {},
})(props => <Radio color="default" {...props} />);

const StyledLabel = withStyles({
  label: {
    fontSize: '1.6rem',
    fontWeight: '500',
  },
})(FormControlLabel);

const SelectWayTap = ({ way, setWay }) => {
  const handleChange = event => {
    setWay(event.target.value);
    console.log(event.target.value);
  };
  return (
    <div>
      <FormControl component="fieldset">
        <FormLabel component="legend">구간 설정(a11yText)</FormLabel>
        <RadioGroup
          aria-label="왕복 편도 설정"
          name="왕복 편도 설정"
          value={way}
          onChange={handleChange}
          row
        >
          <StyledLabel
            value="왕복"
            control={<LightBlueRadio color="primary" />}
            label="왕복"
            labelPlacement="end"
          />
          <StyledLabel
            value="편도"
            control={<LightBlueRadio color="primary" />}
            label="편도"
            labelPlacement="end"
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default SelectWayTap;
