import { CssBaseline } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import PropTypes from 'prop-types';
import React, { useCallback, useContext, useMemo } from 'react';
import AppSkeleton from '../../_components/app-skeleton/AppSkeleton';
import SmartSwitchCard from '../../_components/cards/smart-switch-card/SmartSwitchCard';
import TankCard from '../../_components/cards/tank-card/TankCard';
import SettingDialog from '../../_components/dialogs/setting-dialog/settingDialog';
import DeviceSettingContextProvider from '../../_contexts/device-setting/DeviceSettingContext.provider';
import { DeviceContext } from '../../_contexts/device/DeviceContext.provider';
import SettingDialogContextProvider from '../../_contexts/setting-dialog/DeviceSettingContext.provider';
import SubDeviceContextProvider from '../../_contexts/sub-device/SubDeviceContext.provider';
import { UserContext } from '../../_contexts/user/UserContext.provider';

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
  const userContext = useContext(UserContext);
  const devicesContext = useContext(DeviceContext);

  const hasFetchedDevices = userContext.user.hasFetchedDevices;
  const isSocketFetching = userContext.isSocketFetching;

  const isFetchingDevice = devicesContext.device.isFetchingDevice;
  const devices = devicesContext.device.devices;
  const sharedDevices = devicesContext.sharedDevice.sharedDevices;

  const renderAppSkeleton = useMemo(() => {
    if (isFetchingDevice || isSocketFetching) {
      return <AppSkeleton data-test="appSkeletonComponent" />;
    }
  }, [isFetchingDevice, isSocketFetching]);

  const renderNoDeviceAlertComponent = useMemo(() => {
    if (!isFetchingDevice && devices.length <= 0 && sharedDevices.length <= 0 && hasFetchedDevices) {
      return (
        <Alert severity="info" data-test="noDeviceAlertComponent">
          <AlertTitle>No Devices</AlertTitle>
          Hi! it seems you don't have any smart home devices yet!
        </Alert>
      );
    }
  }, [devices.length, hasFetchedDevices, isFetchingDevice, sharedDevices.length]);

  const renderMyTankCardComponent = useCallback(device => {
    if (device.variant && device.variant === 'tank') {
      return (
        <SubDeviceContextProvider>
          <DeviceSettingContextProvider>
            <TankCard deviceName={device.name} deviceId={device.deviceId} data-test="myTankCardComponent" />
          </DeviceSettingContextProvider>
        </SubDeviceContextProvider>
      );
    }
  }, []);

  const renderMySmartSwitchCardComponent = useCallback(device => {
    if (device.variant && device.variant === 'smartSwitch') {
      return (
        <SubDeviceContextProvider>
          <SmartSwitchCard deviceName={device.name} deviceId={device.deviceId} data-test="mySmartSwitchCardComponent" />
        </SubDeviceContextProvider>
      );
    }
  }, []);

  const renderMyDeviceGridComponent = useMemo(() => {
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
  }, [devices, hasFetchedDevices, isFetchingDevice, renderMySmartSwitchCardComponent, renderMyTankCardComponent]);

  const renderSharedTankCardComponent = useCallback(device => {
    if (device.variant && device.variant === 'tank') {
      return (
        <SubDeviceContextProvider>
          <DeviceSettingContextProvider>
            <TankCard deviceName={device.name} deviceId={device.deviceId} data-test="sharedTankCardComponent" />
          </DeviceSettingContextProvider>
        </SubDeviceContextProvider>
      );
    }
  }, []);

  const renderSharedSmartSwitchCardComponent = useCallback(device => {
    if (device.variant && device.variant === 'smartSwitch') {
      return (
        <SubDeviceContextProvider>
          <SmartSwitchCard deviceName={device.name} deviceId={device.deviceId} data-test="sharedSmartSwitchCardComponent" />
        </SubDeviceContextProvider>
      );
    }
  }, []);

  const renderSharedDeviceGridComponent = useMemo(() => {
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
  }, [
    hasFetchedDevices,
    isFetchingDevice,
    renderSharedSmartSwitchCardComponent,
    renderSharedTankCardComponent,
    sharedDevices,
  ]);

  const renderSettingDialogComponent = useMemo(() => {
    if ((devices && devices.length > 0) || (sharedDevices && sharedDevices.length > 0)) {
      return (
        <DeviceSettingContextProvider>
          <SettingDialogContextProvider>
            <SettingDialog data-test="settingDialogComponent" />
          </SettingDialogContextProvider>
        </DeviceSettingContextProvider>
      );
    }
  }, [devices, sharedDevices]);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container disableGutters={true} maxWidth="xl" data-test="homePageContainer">
        <div className={classes.root}>
          {renderAppSkeleton}
          {renderNoDeviceAlertComponent}
          <Grid container spacing={3} data-test="deviceGridComponent">
            {renderMyDeviceGridComponent}
            {renderSharedDeviceGridComponent}
          </Grid>
        </div>
      </Container>
      {renderSettingDialogComponent}
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
