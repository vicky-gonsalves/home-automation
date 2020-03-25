import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import React, { Component } from 'react';
import { connect } from 'react-redux';

export class Toaster extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidUpdate() {
    const { loginError, settingError, subDeviceSettingError } = this.props;
    const { open } = this.state;
    if (!!loginError && !open) {
      this.setState({ open: true });
    } else if (!!settingError && !open) {
      this.setState({ open: true });
    } else if (!!subDeviceSettingError && !open) {
      this.setState({ open: true });
    }
  }

  handleClose() {
    this.setState({ open: false });
  }

  render() {
    const { loginError } = this.props;
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
        message={loginError}
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
  return { loginError, settingError, subDeviceSettingError };
}

const actionCreators = {};
const connectedToaster = connect(mapState, actionCreators)(Toaster);

export default connectedToaster;
