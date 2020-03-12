import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import React, {useState} from 'react';


const MotorStatus = () => {
  const [state, setState] = useState({
    motorStatus: false
  });

  const handleChange = name => event => {
    setState({...state, [name]: event.target.checked});
  };

  return (
    <Typography component="div">
      <Grid component="label" container alignItems="center" spacing={1}>
        <Grid item>Motor OFF</Grid>
        <Grid item>
          <Switch
            checked={state.motorStatus}
            onChange={handleChange('motorStatus')}
            value="true"
            inputProps={{'aria-label': 'motor status'}}
          />
        </Grid>
        <Grid item>Motor ON</Grid>
      </Grid>
    </Typography>
  );
};

export default MotorStatus;
