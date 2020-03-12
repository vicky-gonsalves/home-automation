import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import React, {useState} from 'react';

const useStyles = makeStyles(theme => ({
  buttonsGrp: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }
}));

const Outdoor = () => {
  const classes = useStyles();

  const [state, setState] = useState({
    light1: false,
    light2: false,
    light3: false,
    light4: false
  });

  const handleChange = name => event => {
    setState({...state, [name]: event.target.checked});
  };
  return (
    <React.Fragment>
      <Grid container spacing={1}>
        <Grid item xs={3} className={classes.buttonsGrp}>
          <div>
            <EmojiObjectsIcon fontSize="large" color="secondary"/>
          </div>
          <div>
            <Switch
              checked={state.light1}
              onChange={handleChange('light1')}
              value="true"
              inputProps={{'aria-label': 'Light 1'}}
            />
          </div>
        </Grid>
        <Grid item xs={3} className={classes.buttonsGrp}>
          <div>
            <EmojiObjectsIcon fontSize="large" color="secondary"/>
          </div>
          <div>
            <Switch
              checked={state.light2}
              onChange={handleChange('light2')}
              value="true"
              inputProps={{'aria-label': 'Light 2'}}
            />
          </div>
        </Grid>
        <Grid item xs={3} className={classes.buttonsGrp}>
          <div>
            <EmojiObjectsIcon fontSize="large" color="secondary"/>
          </div>
          <div>
            <Switch
              checked={state.light3}
              onChange={handleChange('light3')}
              value="true"
              inputProps={{'aria-label': 'Light 3'}}
            />
          </div>
        </Grid>
        <Grid item xs={3} className={classes.buttonsGrp}>
          <div>
            <EmojiObjectsIcon fontSize="large" color="secondary"/>
          </div>
          <div>
            <Switch
              checked={state.light4}
              onChange={handleChange('light4')}
              value="true"
              inputProps={{'aria-label': 'Light 4'}}
            />
          </div>
        </Grid>
      </Grid>

    </React.Fragment>
  );
};

export default Outdoor;
