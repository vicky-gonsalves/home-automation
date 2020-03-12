import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import ToysIcon from '@material-ui/icons/Toys';
import React, { useState } from 'react';

const useStyles = makeStyles(() => ({
  buttonsGrp: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const Bedroom = () => {
  const classes = useStyles();

  const [state, setState] = useState({
    tubeLight: false,
    fan: false,
  });

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };
  return (
    <React.Fragment>
      <Grid container spacing={1}>
        <Grid item xs={6} className={classes.buttonsGrp}>
          <div>
            <EmojiObjectsIcon fontSize="large" color="secondary" />
          </div>
          <div>
            <Switch
              checked={state.tubeLight}
              onChange={handleChange('tubeLight')}
              value="true"
              inputProps={{ 'aria-label': 'Tubelight' }}
            />
          </div>
        </Grid>
        <Grid item xs={6} className={classes.buttonsGrp}>
          <div>
            <ToysIcon fontSize="large" color="secondary" />
          </div>
          <div>
            <Switch checked={state.fan} onChange={handleChange('fan')} value="true" inputProps={{ 'aria-label': 'Fan' }} />
          </div>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Bedroom;
