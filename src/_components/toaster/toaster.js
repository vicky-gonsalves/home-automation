import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deviceSettingActions } from '../../_actions/device-setting/deviceSetting.actions';
import { subDeviceParamActions } from '../../_actions/sub-device-param.actions';
import { subDeviceSettingActions } from '../../_actions/subDeviceSetting.actions';
import { actions } from '../../_actions/user.actions';

export class Toaster extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidUpdate() {
    const { loginError, settingError, subDeviceSettingError, subDeviceParamError } = this.props;
    const { open } = this.state;
    if (!!loginError && !open) {
      this.setState({ open: true });
    } else if (!!settingError && !open) {
      this.setState({ open: true });
    } else if (!!subDeviceSettingError && !open) {
      this.setState({ open: true });
    } else if (!!subDeviceParamError && !open) {
      this.setState({ open: true });
    }
  }

  handleClose() {
    const {
      loginError,
      settingError,
      subDeviceSettingError,
      subDeviceParamError,
      clearLoginError,
      clearDeviceSettingError,
      clearSubDeviceSettingError,
      clearSubDeviceParamError,
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
    }
    this.setState({ open: false });
  }

  render() {
    const { loginError, settingError, subDeviceSettingError, subDeviceParamError } = this.props;
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
        message={loginError || settingError || subDeviceSettingError || subDeviceParamError}
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
  const { loginError } = state.user;
  const { settingError } = state.deviceSetting;
  const { subDeviceSettingError } = state.subDeviceSetting;
  const { subDeviceParamError } = state.subDeviceParam;
  return { loginError, settingError, subDeviceSettingError, subDeviceParamError };
}

const actionCreators = {
  clearLoginError: actions.setLoginError,
  clearDeviceSettingError: deviceSettingActions.setDeviceSettingError,
  clearSubDeviceSettingError: subDeviceSettingActions.setSubDeviceSettingError,
  clearSubDeviceParamError: subDeviceParamActions.setSubDeviceParamError,
};
const connectedToaster = connect(mapState, actionCreators)(Toaster);

Toaster.propTypes = {
  'data-test': PropTypes.string.isRequired,
  loginError: PropTypes.string,
  settingError: PropTypes.string,
  subDeviceSettingError: PropTypes.string,
  subDeviceParamError: PropTypes.string,
  clearLoginError: PropTypes.func.isRequired,
  clearDeviceSettingError: PropTypes.func.isRequired,
  clearSubDeviceSettingError: PropTypes.func.isRequired,
  clearSubDeviceParamError: PropTypes.func.isRequired,
};

export default connectedToaster;
