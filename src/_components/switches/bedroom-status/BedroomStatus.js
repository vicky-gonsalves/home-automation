import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import React, {useState} from 'react';


const BedroomStatus = () => {
  const [state, setState] = useState({
    all: false
  });

  const handleChange = name => event => {
    setState({...state, [name]: event.target.checked});
  };

  return (
    <Typography component="div">
      <Grid component="label" container alignItems="center" spacing={2}>
        <Grid item xs={12}>All Appli.</Grid>
        <Grid item  xs={12}>
          <Switch
            checked={state.all}
            onChange={handleChange('all')}
            value="true"
            inputProps={{'aria-label': 'All status'}}
          />
        </Grid>
      </Grid>
    </Typography>
  );
};

export default BedroomStatus;
