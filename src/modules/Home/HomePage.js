import { CssBaseline, withStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions, socketActions } from '../../_actions';
import { deviceActions } from '../../_actions/device.actions';
import AppSkeleton from '../../_components/app-skeleton/AppSkeleton';
import SmartSwitchCard from '../../_components/cards/smart-switch-card/SmartSwitchCard';
import TankCard from '../../_components/cards/tank-card/TankCard';
import SettingDialog from '../../_components/dialogs/setting-dialog/settingDialog';
import Footer from '../../_components/footer';
import Navbar from '../../_components/navbar/navbar';
import config from '../../config';

const useStyles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
  },
});

export class HomePage extends Component {
  componentDidMount() {
    if (!this.props.isFetchingDevice && !this.props.connected) {
      this.props.setDeviceFetching(true);
    }
    if (
      this.props.isAuthorized &&
      this.props.isLoggedIn &&
      this.props.tokens &&
      this.props.tokens.access &&
      this.props.tokens.access.token &&
      !this.props.connected
    ) {
      this.props.socketInit(this.props.tokens.access.token);
    }
  }

  // noinspection JSCheckFunctionSignatures
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.connected !== this.props.connected) {
      if (this.props.connected) {
        this.props.myDevices();
      }
    }
  }

  render() {
    const { classes, isFetchingDevice, devices, sharedDevices } = this.props;

    const renderAppSkeleton = () => {
      if (isFetchingDevice) {
        return <AppSkeleton data-test="appSkeletonComponent" />;
      }
    };

    const renderNoDeviceAlertComponent = () => {
      if (!isFetchingDevice && devices.length <= 0 && sharedDevices.length <= 0) {
        return (
          <Alert severity="info" data-test="noDeviceAlertComponent">
            <AlertTitle>No Devices</AlertTitle>
            Hi! it seems you don't have any smart home devices yet!
          </Alert>
        );
      }
    };

    const renderMyTankCardComponent = device => {
      if (device.variant && device.variant === 'tank') {
        return <TankCard deviceName={device.name} deviceId={device.deviceId} data-test="myTankCardComponent" />;
      }
    };

    const renderMySmartSwitchCardComponent = device => {
      if (device.variant && device.variant === 'smartSwitch') {
        return (
          <SmartSwitchCard deviceName={device.name} deviceId={device.deviceId} data-test="mySmartSwitchCardComponent" />
        );
      }
    };

    const renderMyDeviceGridComponent = () => {
      return (
        devices &&
        devices.length > 0 &&
        devices.map(device => (
          <Grid key={device.deviceId} item xs={12} sm={12} md={6} xl={4} data-test="myDeviceGridComponent">
            {renderMyTankCardComponent(device)}
            {renderMySmartSwitchCardComponent(device)}
          </Grid>
        ))
      );
    };

    const renderSharedTankCardComponent = device => {
      if (device.variant && device.variant === 'tank') {
        return <TankCard deviceName={device.name} deviceId={device.deviceId} data-test="sharedTankCardComponent" />;
      }
    };

    const renderSharedSmartSwitchCardComponent = device => {
      if (device.variant && device.variant === 'smartSwitch') {
        return (
          <SmartSwitchCard deviceName={device.name} deviceId={device.deviceId} data-test="sharedSmartSwitchCardComponent" />
        );
      }
    };

    const renderSharedDeviceGridComponent = () => {
      return (
        sharedDevices &&
        sharedDevices.length > 0 &&
        sharedDevices.map(device => (
          <Grid key={device.deviceId} item xs={12} sm={12} md={6} xl={4} data-test="sharedDeviceGridComponent">
            {renderSharedTankCardComponent(device)}
            {renderSharedSmartSwitchCardComponent(device)}
          </Grid>
        ))
      );
    };

    const renderSettingDialogComponent = () => {
      if ((devices && devices.length > 0) || (sharedDevices && sharedDevices.length > 0)) {
        return <SettingDialog data-test="settingDialogComponent" />;
      }
    };

    return (
      <React.Fragment>
        <CssBaseline />
        <Navbar appName={config.appName} data-test="navbarComponent" />
        <Container disableGutters={true} maxWidth="xl" data-test="homePageContainer">
          <div className={classes.root}>
            {renderAppSkeleton()}
            {renderNoDeviceAlertComponent()}
            <Grid container spacing={3} data-test="deviceGridComponent">
              {renderMyDeviceGridComponent()}
              {renderSharedDeviceGridComponent()}
            </Grid>
          </div>
        </Container>
        {renderSettingDialogComponent()}
        {/* Footer */}
        <footer className={classes.footer}>
          <Footer appName={config.appName} data-test="footerComponent" />
        </footer>
        {/* End footer */}
      </React.Fragment>
    );
  }
}

function mapState(state) {
  const { isLoggedIn, tokens, isAuthorized } = state.user;
  const { isSocketFetching, connected } = state.socket;
  const { devices, isFetchingDevice } = state.device;
  const { sharedDevices } = state.sharedDevice;
  return { isLoggedIn, tokens, isSocketFetching, isAuthorized, connected, devices, sharedDevices, isFetchingDevice };
}

const actionCreators = {
  signOut: actions.signOut,
  signIn: actions.signIn,
  me: actions.me,
  socketInit: socketActions.socketInit,
  myDevices: deviceActions.myDevices,
  setDeviceFetching: deviceActions.setDeviceFetching,
  removeAllDevices: deviceActions.removeAllDevices,
};

HomePage.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
    footer: PropTypes.string.isRequired,
  }),
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  devices: PropTypes.array.isRequired,
  connected: PropTypes.bool.isRequired,
  isAuthorized: PropTypes.bool,
  isLoggedIn: PropTypes.bool.isRequired,
  isFetchingDevice: PropTypes.bool.isRequired,
  isSocketFetching: PropTypes.bool.isRequired,
  me: PropTypes.func.isRequired,
  myDevices: PropTypes.func.isRequired,
  setDeviceFetching: PropTypes.func.isRequired,
  removeAllDevices: PropTypes.func.isRequired,
  sharedDevices: PropTypes.array.isRequired,
  signIn: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
  socketInit: PropTypes.func.isRequired,
  tokens: PropTypes.shape({
    access: PropTypes.shape({
      expires: PropTypes.string.isRequired,
      token: PropTypes.string.isRequired,
    }),
    refresh: PropTypes.shape({
      expires: PropTypes.string.isRequired,
      token: PropTypes.string.isRequired,
    }),
  }),
};

const connectedHomePage = connect(mapState, actionCreators)(HomePage);

export default withStyles(useStyles)(connectedHomePage);
