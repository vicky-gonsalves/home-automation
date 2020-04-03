import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { subDeviceParamActions } from '../../../_actions';

const MotorSwitch = props => {
  let thisSubDeviceParams;
  const dispatch = useDispatch();
  const subDeviceParams = useSelector(state =>
    state && state.subDeviceParam && state.subDeviceParam.subDeviceParams ? state.subDeviceParam.subDeviceParams : []
  );

  const filterSubDeviceParams = () =>
    subDeviceParams.filter(
      ({ deviceId, paramName, paramValue, subDeviceId }) =>
        paramName && paramValue && deviceId === props.deviceId && subDeviceId === props.subDeviceId && paramName === 'status'
    );

  if (props.deviceId && props.subDeviceId) {
    thisSubDeviceParams = filterSubDeviceParams();
  }

  const handleChange = _subDeviceParam => () => {
    const subDeviceParam = _subDeviceParam;
    subDeviceParam.paramValue = _subDeviceParam.paramValue === 'off' ? 'on' : 'off';
    dispatch(subDeviceParamActions.updateSubDeviceParamStatus(subDeviceParam));
  };

  return (
    <Typography component="div">
      {thisSubDeviceParams && thisSubDeviceParams.length <= 0 && (
        <Alert severity="error">It seems there is some issue with device. Please contact administrator!</Alert>
      )}
      {thisSubDeviceParams && thisSubDeviceParams.length > 0 && (
        <Grid component="label" container alignItems="center" spacing={1}>
          <Grid item>{props.name} OFF</Grid>
          <Grid item>
            <Switch
              color="primary"
              checked={thisSubDeviceParams[0].paramValue === 'on'}
              onChange={handleChange(thisSubDeviceParams[0])}
              inputProps={{ 'aria-label': props.name }}
            />
          </Grid>
          <Grid item>{props.name} ON</Grid>
        </Grid>
      )}
    </Typography>
  );
};

MotorSwitch.propTypes = {
  deviceId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  subDeviceId: PropTypes.string.isRequired,
};

export default MotorSwitch;
