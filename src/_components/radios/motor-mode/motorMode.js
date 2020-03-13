import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';

const useStyles = makeStyles(theme => ({
  mode: {
    margin: theme.spacing(1, 0),
  },
}));

const MotorMode = () => {
  const classes = useStyles();
  const [state, setState] = useState({
    mode: 'automatic',
  });

  const handleRadioChange = event => {
    setState({ ...state, mode: event.target.value });
  };

  return (
    <FormControl component="fieldset" className={classes.mode}>
      <FormLabel component="legend">Motor Mode</FormLabel>
      <RadioGroup aria-label="mode" name="mode" value={state.mode} onChange={handleRadioChange} row>
        <FormControlLabel value="automatic" control={<Radio color="primary" />} label="Automatic" labelPlacement="end" />
        <FormControlLabel value="manual" control={<Radio color="primary" />} label="Manual" labelPlacement="end" />
      </RadioGroup>
    </FormControl>
  );
};

export default MotorMode;
