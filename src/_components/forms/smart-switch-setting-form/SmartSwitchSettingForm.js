import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import { FieldArray, getIn, withFormik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import * as yup from 'yup';
import { subDeviceSettingActions } from '../../../_actions';
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
  extraMargin: {
    marginBottom: theme.spacing(4),
  },
}));

export const SimpleSmartSwitchSettingForm = props => {
  const classes = useStyles();
  const { values, touched, errors, handleChange, handleBlur, isFetching, handleSubmit, close } = props;

  const handleClose = () => {
    close();
  };

  const renderTextFields = () => () => (
    <React.Fragment>
      {values.settings.map((item, index) => {
        const fieldName = `settings[${index}].setting.paramValue`;
        const touchedField = getIn(touched, fieldName);
        const errorField = getIn(errors, fieldName);
        return (
          <React.Fragment key={index}>
            <div>
              <TextField
                name={fieldName}
                id={fieldName}
                type="number"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label={item.subDevice.name}
                disabled={isFetching}
                value={values.settings[index].setting.paramValue}
                helperText={touchedField && errorField ? errorField : ''}
                error={Boolean(touchedField && errorField)}
                onChange={handleChange}
                onBlur={handleBlur}
                data-test="smartSwitchSettingFormTextField"
              />
            </div>
          </React.Fragment>
        );
      })}
    </React.Fragment>
  );

  const renderNoSettingAlert = () => {
    if (values.settings.length <= 0) {
      return (
        <Alert className={classes.extraMargin} severity="info" data-test="smartSwitchFieldAlertComponent">
          It seems there are no settings available for this device.
        </Alert>
      );
    }
  };

  const renderSettingForm = () => {
    if (values.settings && values.settings.length > 0) {
      return (
        <form className={classes.form} onSubmit={handleSubmit} noValidate data-test="smartSwitchSettingFormComponent">
          <InputLabel shrink id="autoShutDownTimeLabel">
            Automatic shutdown time (0 means no auto shutdown)
          </InputLabel>
          <FieldArray name="settings" render={renderTextFields()} data-test="smartSwitchFieldArrayComponent" />
          <div className={classes.dialogAction}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={isFetching}
              data-test="smartSwitchSettingFormSubmitButton"
            >
              Save Settings
            </Button>
            <Button
              type="button"
              className={classes.submit}
              disabled={isFetching}
              data-test="smartSwitchSettingFormCancelButton"
              onClick={handleClose}
            >
              Cancel
            </Button>
          </div>
        </form>
      );
    }
  };

  return (
    <React.Fragment>
      {renderNoSettingAlert()}
      {renderSettingForm()}
    </React.Fragment>
  );
};

const getAutoShutDownTimeSettings = (deviceId, subDevices, subDeviceSettings) => {
  let thisSettings = [];
  if (deviceId && subDevices && subDevices.length && subDeviceSettings && subDeviceSettings.length) {
    subDeviceSettings.forEach(setting => {
      subDevices.forEach(subDevice => {
        const { paramName, idType, type, bindedTo } = setting;
        if (
          subDevice.subDeviceId === bindedTo &&
          type === 'subDevice' &&
          paramName === 'autoShutDownTime' &&
          idType === 'subDeviceId' &&
          subDevice.deviceId === deviceId &&
          subDevice.type === 'switch'
        ) {
          thisSettings.push({ setting, subDevice });
        }
      });
    });
  }
  return thisSettings;
};

export const SmartSwitchSettingForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: ({ deviceId, subDeviceSettings, subDevices }) => ({
    settings: getAutoShutDownTimeSettings(deviceId, subDevices, subDeviceSettings),
  }),
  validationSchema: () =>
    yup.object().shape({
      settings: yup.array().of(
        yup.object().shape({
          setting: yup.object().shape({
            paramValue: yup
              .number()
              .min(0, 'Auto shutdown time cannot be negative')
              .typeError('Please enter auto shutdown time in minutes (minutes must be a number)')
              .required('Please enter auto shutdown time. `0` indicates no auto shutdown.'),
          }),
        })
      ),
    }),
  handleSubmit: (values, { props: { saveSettings } }) => {
    const allSettings = values.settings.map(({ setting }) => setting);
    saveSettings(allSettings);
  },
  displayName: 'smartSwitchSettingForm',
})(SimpleSmartSwitchSettingForm);

function mapStateToProps(state) {
  const { subDevices } = state.subDevice;
  const { subDeviceSettings, isFetching } = state.subDeviceSetting;
  return { subDevices, subDeviceSettings, isFetching };
}

const actionCreators = {
  saveSettings: subDeviceSettingActions.saveSubDeviceSettings,
  close: settingDialogActions.close,
};

SimpleSmartSwitchSettingForm.propTypes = {
  deviceId: PropTypes.string.isRequired,
  subDevices: PropTypes.array.isRequired,
  subDeviceSettings: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  saveSettings: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, actionCreators)(SmartSwitchSettingForm);
