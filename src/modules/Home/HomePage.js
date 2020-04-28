import { CssBaseline } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { siteSettingActions, userActions } from '../../_actions';
import { adminDrawerActions } from '../../_actions/admin-drawer/adminDrawer.actions';
import { deviceActions } from '../../_actions/device/device.actions';
import AppSkeleton from '../../_components/app-skeleton/AppSkeleton';
import SmartSwitchCard from '../../_components/cards/smart-switch-card/SmartSwitchCard';
import TankCard from '../../_components/cards/tank-card/TankCard';
import SettingDialog from '../../_components/dialogs/setting-dialog/settingDialog';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
  },
}));

const HomePage = () => {
  const classes = useStyles();
  const currentUser = useSelector(state => state.user);
  const device = useSelector(state => state.device);
  const sharedDevice = useSelector(state => state.sharedDevice);
  const sockets = useSelector(state => state.socket);
  const adminDrawer = useSelector(state => state.adminDrawer);
  const siteSettings = useSelector(state => state.siteSetting);

  const isFetchingDevice = device.isFetchingDevice;
  const isLoggedIn = currentUser.isLoggedIn && currentUser.tokens !== null;
  const isAuthorized = currentUser.isAuthorized;
  const hasFetchedDevices = currentUser.hasFetchedDevices;
  const isSocketFetching = sockets.isSocketFetching;
  const connected = sockets.connected;
  const devices = device.devices;
  const sharedDevices = sharedDevice.sharedDevices;
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchDevices = () => {
      if (!hasFetchedDevices && !isFetchingDevice && connected && (isLoggedIn || isAuthorized)) {
        dispatch(deviceActions.setDeviceFetching(true));
        dispatch(deviceActions.myDevices());
        dispatch(userActions.setDevicesFetched(true));
      }
    };
    const hideAdminDrawer = () => {
      if (adminDrawer.show) {
        dispatch(adminDrawerActions.hide());
      }
    };
    const hideBurger = () => {
      if (siteSettings && siteSettings.burger) {
        dispatch(siteSettingActions.hideBurger());
      }
    };
    hideBurger();
    hideAdminDrawer();
    fetchDevices();
  }, [dispatch, hasFetchedDevices, isFetchingDevice, connected, isLoggedIn, isAuthorized, adminDrawer, siteSettings]);

  const renderAppSkeleton = () => {
    if (isFetchingDevice || isSocketFetching) {
      return <AppSkeleton data-test="appSkeletonComponent" />;
    }
  };

  const renderNoDeviceAlertComponent = () => {
    if (!isFetchingDevice && devices.length <= 0 && sharedDevices.length <= 0 && hasFetchedDevices) {
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
      return <SmartSwitchCard deviceName={device.name} deviceId={device.deviceId} data-test="mySmartSwitchCardComponent" />;
    }
  };

  const renderMyDeviceGridComponent = () => {
    return (
      !isFetchingDevice &&
      hasFetchedDevices &&
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
      !isFetchingDevice &&
      hasFetchedDevices &&
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
    </React.Fragment>
  );
};

HomePage.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
    footer: PropTypes.string.isRequired,
  }),
};

export default HomePage;
