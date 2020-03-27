import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { withFormik } from 'formik';
import React from 'react';
import { connect } from 'react-redux';
import * as yup from 'yup';
import { deviceSettingActions } from '../../../_actions';
import { settingDialogActions } from '../../../_actions/settingDialog.actions';

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    marginBottom: theme.spacing(1),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  dialogAction: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

const getDeviceSettings = (deviceSettings, deviceId) => {
  const ALL_SETTINGS = {
    preferredSubDevice: null,
    autoShutDownTime: null,
    waterLevelToStart: null,
  };
  if (deviceSettings && deviceSettings.length) {
    deviceSettings.forEach(setting => {
      if (setting.bindedTo === deviceId && setting.type === 'device' && setting.idType === 'deviceId') {
        if (setting.paramName === 'preferredSubDevice') {
          ALL_SETTINGS.preferredSubDevice = setting;
        } else if (setting.paramName === 'autoShutDownTime') {
          ALL_SETTINGS.autoShutDownTime = setting;
        } else if (setting.paramName === 'waterLevelToStart') {
          ALL_SETTINGS.waterLevelToStart = setting;
        }
      }
    });
  }
  return ALL_SETTINGS;
};

const getSetting = (deviceSettings, deviceId, paramName) => {
  const allSettings = getDeviceSettings(deviceSettings, deviceId);
  if (allSettings.hasOwnProperty(paramName) && allSettings[paramName]) {
    return allSettings[paramName];
  }
  return null;
};

const getSettingValue = (deviceSettings, deviceId, paramName) => {
  const subDevice = getSetting(deviceSettings, deviceId, paramName);
  if (subDevice) {
    return subDevice.paramValue;
  }
  return '';
};

const SimpleMotorSettingForm = props => {
  let thisSubDevices;
  const classes = useStyles();
  const { values, touched, errors, handleChange, handleBlur, isFetching, handleSubmit, onSubmit, subDevices, close } = props;
  if (props.deviceId && subDevices && subDevices.length) {
    thisSubDevices = subDevices.filter(
      subDevice => subDevice.deviceId === props.deviceId && subDevice.type === 'motorSwitch'
    );
  }
  const handleClose = () => {
    close('tank');
  };
  return (
    <form className={classes.form} onSubmit={typeof onSubmit === 'function' ? onSubmit : handleSubmit} noValidate>
      {thisSubDevices && thisSubDevices.length && (
        <FormControl fullWidth className={classes.formControl}>
          <InputLabel shrink id="preferredSubDeviceLabel">
            Preferred device for automatic mode
          </InputLabel>
          <Select
            variant="outlined"
            id="preferredSubDevice"
            name="preferredSubDevice"
            value={values.preferredSubDevice}
            onChange={handleChange}
            className={classes.selectEmpty}
            disabled={isFetching}
          >
            {thisSubDevices &&
              thisSubDevices.length &&
              thisSubDevices.map(subDevice => (
                <MenuItem key={subDevice.subDeviceId} value={subDevice.subDeviceId}>
                  {subDevice.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      )}
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="autoShutDownTime"
        label="Auto Shut Down Time"
        type="number"
        name="autoShutDownTime"
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={isFetching}
        error={errors && errors.autoShutDownTime && touched.autoShutDownTime}
        helperText={errors && errors.autoShutDownTime && touched && touched.autoShutDownTime && errors.autoShutDownTime}
        data-test="autoShutDownTimeInput"
        value={values.autoShutDownTime}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="waterLevelToStart"
        label="Water Level in Percentage for Auto Start"
        type="number"
        id="waterLevelToStart"
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={isFetching}
        error={errors && errors.waterLevelToStart && touched.waterLevelToStart}
        helperText={errors && touched && touched.waterLevelToStart && errors.waterLevelToStart}
        data-test="waterLevelToStartInput"
        value={values.waterLevelToStart}
      />
      <div className={classes.dialogAction}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submit}
          disabled={isFetching}
          data-test="submitButton"
        >
          Save Settings
        </Button>
        <Button
          type="button"
          className={classes.submit}
          disabled={isFetching}
          data-test="cancelButton"
          onClick={handleClose}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export const MotorSettingForm = withFormik({
  mapPropsToValues: props => ({
    preferredSubDevice: getSettingValue(props.deviceSettings, props.deviceId, 'preferredSubDevice'),
    autoShutDownTime: getSettingValue(props.deviceSettings, props.deviceId, 'autoShutDownTime'),
    waterLevelToStart: getSettingValue(props.deviceSettings, props.deviceId, 'waterLevelToStart'),
  }),
  validationSchema: yup.object().shape({
    preferredSubDevice: yup.string().required('Please select preferred device'),
    autoShutDownTime: yup.number().required('Please enter auto shutdown time in minutes'),
    waterLevelToStart: yup
      .number()
      .required('Please enter water level value in percentage to start the motor automatically'),
  }),
  handleSubmit: (values, { props }) => {
    const allSettings = getDeviceSettings(props.deviceSettings, props.deviceId);
    allSettings.preferredSubDevice.paramValue = values.preferredSubDevice;
    allSettings.autoShutDownTime.paramValue = values.autoShutDownTime;
    allSettings.waterLevelToStart.paramValue = values.waterLevelToStart;
    props.saveSettings(allSettings);
  },
  displayName: 'motorSettingForm',
})(SimpleMotorSettingForm);

function mapStateToProps(state) {
  const { subDevices } = state.subDevice;
  const { deviceSettings, isFetching } = state.deviceSetting;
  return { subDevices, deviceSettings, isFetching };
}

const actionCreators = {
  saveSettings: deviceSettingActions.saveDeviceSettings,
  close: settingDialogActions.close,
};

export default connect(mapStateToProps, actionCreators)(MotorSettingForm);
