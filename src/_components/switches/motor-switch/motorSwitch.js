import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { subDeviceParamActions } from '../../../_actions';
import { SubDeviceParamsContext } from '../../../_contexts/sub-device-param/SubDeviceParamContext.provider';

const useStyles = makeStyles(theme => ({
  label: {
    marginBottom: theme.spacing(0),
  },
}));

const MotorSwitch = props => {
  let thisSubDeviceParams;
  const classes = useStyles();
  const dispatch = useDispatch();
  const subDeviceParamsContext = useContext(SubDeviceParamsContext);
  const subDeviceParams = subDeviceParamsContext.subDeviceParams;

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
        <Alert severity="error" data-test="motorSwitchAlertComponent">
          It seems there is some issue with device. Please contact administrator!
        </Alert>
      )}
      {thisSubDeviceParams && thisSubDeviceParams.length > 0 && (
        <Grid container alignItems="center" data-test="motorSwitchContainer">
          <Grid item xs={12} className={classes.label}>
            <FormLabel>{props.name}</FormLabel>
          </Grid>
          <Grid item data-test="motorSwitchOffLabelItemComponent">
            OFF
          </Grid>
          <Grid item>
            <Switch
              color="primary"
              checked={thisSubDeviceParams[0].paramValue === 'on'}
              onChange={handleChange(thisSubDeviceParams[0])}
              inputProps={{ 'aria-label': props.name }}
              data-test="motorSwitchItemComponent"
            />
          </Grid>
          <Grid item data-test="motorSwitchOnLabelItemComponent">
            ON
          </Grid>
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
