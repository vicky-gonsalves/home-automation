import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import { withFormik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import * as yup from 'yup';
import { deviceSettingActions } from '../../../_actions';
import { settingDialogActions } from '../../../_actions/setting-dialog/settingDialog.actions';

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
  extraMargin: {
    marginBottom: theme.spacing(4),
  },
}));

const getDeviceSettings = (deviceSettings, deviceId) => {
  const ALL_SETTINGS = {
    preferredSubDevice: null,
    autoShutDownTime: null,
    waterLevelToStart: null,
    waterLevelToStop: null,
  };
  if (deviceSettings && deviceSettings.length) {
    deviceSettings.forEach(setting => {
      const { idType, paramName, type, bindedTo } = setting;
      if (bindedTo === deviceId && type === 'device' && idType === 'deviceId') {
        if (paramName === 'preferredSubDevice') {
          ALL_SETTINGS.preferredSubDevice = setting;
        } else if (paramName === 'autoShutDownTime') {
          ALL_SETTINGS.autoShutDownTime = setting;
        } else if (paramName === 'waterLevelToStart') {
          ALL_SETTINGS.waterLevelToStart = setting;
        } else if (paramName === 'waterLevelToStop') {
          ALL_SETTINGS.waterLevelToStop = setting;
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

export const SimpleMotorSettingForm = props => {
  let thisSubDevices;
  const classes = useStyles();
  const { values, touched, errors, handleChange, handleBlur, isFetching, handleSubmit, subDevices, close, deviceId } = props;
  if (deviceId && subDevices && subDevices.length) {
    thisSubDevices = subDevices.filter(subDevice => subDevice.deviceId === deviceId && subDevice.type === 'motorSwitch');
  }
  const handleClose = () => {
    close('tank');
  };

  const renderMotorSettingAlert = () => {
    if (
      values.preferredSubDevice === '' &&
      values.autoShutDownTime === '' &&
      values.waterLevelToStart === '' &&
      values.waterLevelToStop === ''
    ) {
      return (
        <Alert className={classes.extraMargin} severity="info" data-test="motorSettingAlert">
          It seems there are no settings available for this device.
        </Alert>
      );
    }
  };

  const renderMenuItems = () => {
    return (
      thisSubDevices &&
      thisSubDevices.length &&
      thisSubDevices.map(subDevice => (
        <MenuItem key={subDevice.subDeviceId} value={subDevice.subDeviceId} data-test="motorPreferredSubDeviceSelectOption">
          {subDevice.name}
        </MenuItem>
      ))
    );
  };

  const renderPreferredSubDevice = () => {
    if (thisSubDevices && thisSubDevices.length > 0) {
      return (
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
            data-test="motorPreferredSubDeviceSelect"
          >
            {renderMenuItems()}
          </Select>
        </FormControl>
      );
    }
  };

  const renderForm = () => {
    // if (values.preferredSubDevice !== '' && values.autoShutDownTime !== '' && values.waterLevelToStart) {
    return (
      <form className={classes.form} onSubmit={handleSubmit} noValidate data-test="motorSettingFormComponent">
        {renderPreferredSubDevice()}
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
          data-test="motorAutoShutDownTimeInput"
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
          data-test="motorWaterLevelToStartInput"
          value={values.waterLevelToStart}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="waterLevelToStop"
          label="Water Level in Percentage for Auto Stop"
          type="number"
          id="waterLevelToStop"
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isFetching}
          error={errors && errors.waterLevelToStop && touched.waterLevelToStop}
          helperText={errors && touched && touched.waterLevelToStop && errors.waterLevelToStop}
          data-test="motorWaterLevelToStopInput"
          value={values.waterLevelToStop}
        />
        <div className={classes.dialogAction}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={isFetching}
            data-test="motorSettingSubmitButton"
          >
            Save Settings
          </Button>
          <Button
            type="button"
            className={classes.submit}
            disabled={isFetching}
            onClick={handleClose}
            data-test="motorSettingCancelButton"
          >
            Cancel
          </Button>
        </div>
      </form>
    );
    // }
  };

  return (
    <React.Fragment>
      {renderMotorSettingAlert()}
      {renderForm()}
    </React.Fragment>
  );
};

export const MotorSettingForm = withFormik({
  mapPropsToValues: ({ deviceId, deviceSettings }) => ({
    preferredSubDevice: getSettingValue(deviceSettings, deviceId, 'preferredSubDevice'),
    autoShutDownTime: getSettingValue(deviceSettings, deviceId, 'autoShutDownTime'),
    waterLevelToStart: getSettingValue(deviceSettings, deviceId, 'waterLevelToStart'),
    waterLevelToStop: getSettingValue(deviceSettings, deviceId, 'waterLevelToStop'),
  }),
  validationSchema: yup.object().shape({
    preferredSubDevice: yup.string().required('Please select preferred device'),
    autoShutDownTime: yup
      .number()
      .min(0, 'Auto shutdown time cannot be negative')
      .typeError('Please enter auto shutdown time in minutes (minutes must be a number)')
      .required(
        'Please enter auto shutdown time. `0` indicates no auto shutdown but it will respect water level to stop value.'
      ),
    waterLevelToStart: yup
      .number()
      .min(0, 'Water level value cannot be negative')
      .typeError('Please enter water level value in number format')
      .required('Please enter water level value in percentage to start the motor automatically'),
    waterLevelToStop: yup
      .number()
      .min(0, 'Water level value cannot be negative')
      .typeError('Please enter water level value in number format')
      .required(
        'Please enter water level value in percentage to stop the motor automatically. `0` indicates no auto shutdown even though tank overflows.'
      ),
  }),
  handleSubmit: (values, { props: { deviceId, deviceSettings, saveSettings } }) => {
    const allSettings = getDeviceSettings(deviceSettings, deviceId);
    allSettings.preferredSubDevice.paramValue = values.preferredSubDevice;
    allSettings.autoShutDownTime.paramValue = values.autoShutDownTime;
    allSettings.waterLevelToStart.paramValue = values.waterLevelToStart;
    allSettings.waterLevelToStop.paramValue = values.waterLevelToStop;
    saveSettings(allSettings);
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

SimpleMotorSettingForm.propTypes = {
  deviceId: PropTypes.string.isRequired,
  subDevices: PropTypes.array.isRequired,
  deviceSettings: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  saveSettings: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, actionCreators)(MotorSettingForm);
