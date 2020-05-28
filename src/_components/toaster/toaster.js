import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { errorActions } from '../../_actions';
import { deviceSettingActions } from '../../_actions/device-setting/deviceSetting.actions';
import { subDeviceParamActions } from '../../_actions/sub-device-param/subDeviceParam.actions';
import { subDeviceSettingActions } from '../../_actions/sub-device-setting/subDeviceSetting.actions';
import { userActions } from '../../_actions/user/user.actions';

export class Toaster extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidUpdate() {
    const { message, loginError, settingError, subDeviceSettingError, subDeviceParamError } = this.props;
    const { open } = this.state;
    if (!!loginError && !open) {
      this.setState({ open: true });
    } else if (!!settingError && !open) {
      this.setState({ open: true });
    } else if (!!subDeviceSettingError && !open) {
      this.setState({ open: true });
    } else if (!!subDeviceParamError && !open) {
      this.setState({ open: true });
    } else if (!!message && !open) {
      this.setState({ open: true });
    }
  }

  handleClose() {
    const {
      message,
      loginError,
      settingError,
      subDeviceSettingError,
      subDeviceParamError,
      clearLoginError,
      clearDeviceSettingError,
      clearSubDeviceSettingError,
      clearSubDeviceParamError,
      clearError,
    } = this.props;
    const { open } = this.state;
    if (loginError && open) {
      clearLoginError(null);
    } else if (settingError && open) {
      clearDeviceSettingError(null);
    } else if (subDeviceSettingError && open) {
      clearSubDeviceSettingError(null);
    } else if (subDeviceParamError && open) {
      clearSubDeviceParamError(null);
    } else if (message && open) {
      clearError(null);
    }
    this.setState({ open: false });
  }

  render() {
    const { message, loginError, settingError, subDeviceSettingError, subDeviceParamError } = this.props;
    const { open } = this.state;
    return (
      <Snackbar
        data-test="toaster"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={this.handleClose}
        message={message || loginError || settingError || subDeviceSettingError || subDeviceParamError}
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={this.handleClose} data-test="closeButton">
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    );
  }
}

function mapState(state) {
  const { message } = state.error;
  const { loginError } = state.user;
  const { settingError } = state.deviceSetting;
  const { subDeviceSettingError } = state.subDeviceSetting;
  const { subDeviceParamError } = state.subDeviceParam;
  return { message, loginError, settingError, subDeviceSettingError, subDeviceParamError };
}

const actionCreators = {
  clearError: errorActions.clearError,
  clearLoginError: userActions.setLoginError,
  clearDeviceSettingError: deviceSettingActions.setDeviceSettingError,
  clearSubDeviceSettingError: subDeviceSettingActions.setSubDeviceSettingError,
  clearSubDeviceParamError: subDeviceParamActions.setSubDeviceParamError,
};
const connectedToaster = connect(mapState, actionCreators)(Toaster);

Toaster.propTypes = {
  'data-test': PropTypes.string.isRequired,
  message: PropTypes.string,
  loginError: PropTypes.string,
  settingError: PropTypes.string,
  subDeviceSettingError: PropTypes.string,
  subDeviceParamError: PropTypes.string,
  clearLoginError: PropTypes.func.isRequired,
  clearDeviceSettingError: PropTypes.func.isRequired,
  clearSubDeviceSettingError: PropTypes.func.isRequired,
  clearSubDeviceParamError: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
};

export default connectedToaster;
