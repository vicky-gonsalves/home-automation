import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
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
}));

const SimpleSmartSwitchSettingForm = props => {
  let thisSettings = [];
  const classes = useStyles();
  const {
    deviceId,
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    isFetching,
    handleSubmit,
    onSubmit,
    subDevices,
    close,
    subDeviceSettings,
  } = props;

  if (deviceId && subDevices && subDevices.length && subDeviceSettings && subDeviceSettings.length) {
    subDeviceSettings.forEach(setting => {
      subDevices.forEach(subDevice => {
        if (
          subDevice.subDeviceId === setting.bindedTo &&
          setting.type === 'subDevice' &&
          setting.idType === 'subDeviceId' &&
          subDevice.deviceId === deviceId &&
          subDevice.type === 'switch'
        ) {
          thisSettings.push({ setting, subDevice });
        }
      });
    });
  }

  const handleClose = () => {
    close();
  };

  const renderTextFields = arrayHelpers => () => (
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
              />
            </div>
          </React.Fragment>
        );
      })}
    </React.Fragment>
  );

  return (
    <React.Fragment>
      {thisSettings && thisSettings.length && (
        <form className={classes.form} onSubmit={typeof onSubmit === 'function' ? onSubmit : handleSubmit} noValidate>
          <InputLabel shrink id="autoShutDownTimeLabel">
            Automatic shutdown time (0 means no auto shutdown)
          </InputLabel>
          <FieldArray name="settings" render={renderTextFields()} />
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
      )}
    </React.Fragment>
  );
};

const getAutoShutDownTimeSettings = (deviceId, subDevices, subDeviceSettings) => {
  let thisSettings = [];
  if (deviceId && subDevices && subDevices.length && subDeviceSettings && subDeviceSettings.length) {
    subDeviceSettings.forEach(setting => {
      subDevices.forEach(subDevice => {
        if (
          subDevice.subDeviceId === setting.bindedTo &&
          setting.type === 'subDevice' &&
          setting.paramName === 'autoShutDownTime' &&
          setting.idType === 'subDeviceId' &&
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
  mapPropsToValues: props => ({
    settings: getAutoShutDownTimeSettings(props.deviceId, props.subDevices, props.subDeviceSettings),
  }),
  validationSchema: props =>
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
  handleSubmit: (values, { props }) => {
    const allSettings = values.settings.map(subdeviceSettings => subdeviceSettings.setting);
    props.saveSettings(allSettings);
  },
  displayName: 'motorSettingForm',
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
