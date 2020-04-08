import { Card, CardContent, CardHeader } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import SettingsIcon from '@material-ui/icons/Settings';
import Alert from '@material-ui/lab/Alert';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { settingDialogActions } from '../../../_actions/settingDialog.actions';
import DeviceOfflineAlert from '../../device-offline-alert/deviceOfflineAlert';
import OnlineDeviceStatus from '../../online-device-status/onlineDeviceStatus';
import SubDeviceComponent from '../../sub-device/SubDeviceComponent';
import CardActionFooter from '../card-action/CardActionFooter';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(0),
  },
  default: {
    minHeight: 240,
    display: 'flex',
    flexDirection: 'column',
  },
  cardHeader: {
    padding: theme.spacing(1, 2),
  },
  cardContent: {
    padding: theme.spacing(0, 1),
  },
  mode: {
    margin: theme.spacing(1, 0),
  },
  buttonsGrp: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  grow: {
    flexGrow: 1,
  },
  caption: {
    marginTop: theme.spacing(4),
  },
  alert: {
    marginBottom: theme.spacing(4),
  },
}));

const SmartSwitchCard = ({ deviceId, deviceName }) => {
  let thisSubDevices = [];
  const classes = useStyles();
  const dispatch = useDispatch();
  let isDeviceOnline = false;
  const subDevices = useSelector(state =>
    state && state.subDevice && state.subDevice.subDevices ? state.subDevice.subDevices : []
  );
  if (deviceId && subDevices && subDevices.length) {
    thisSubDevices = subDevices.filter(subDevice => subDevice.deviceId === deviceId);
  }

  const socketIds = useSelector(state => state.onlineDevice);

  if (socketIds && socketIds.onlineDevices && socketIds.onlineDevices.length && deviceId) {
    isDeviceOnline =
      socketIds.onlineDevices.filter(onlineDevice => onlineDevice.bindedTo && onlineDevice.bindedTo === deviceId).length > 0;
  }

  const handleSettingDialog = () => dispatch(settingDialogActions.open(deviceName, deviceId, 'smartSwitch'));

  const renderDeviceOfflineAlert = () => {
    if (!isDeviceOnline) {
      return <DeviceOfflineAlert data-test="offlineAlertContainer" />;
    }
  };

  const renderAlert = () => {
    if (!thisSubDevices.length) {
      return (
        <CardContent className={classes.cardContent} data-test="offlineAlertCardContainer">
          {renderDeviceOfflineAlert()}
          <Alert severity="info">It seems devices are not yet added. Please contact administrator!</Alert>
        </CardContent>
      );
    }
  };

  const renderCards = () => {
    if (thisSubDevices.length > 0) {
      return (
        <React.Fragment>
          <CardContent className={classes.cardContent} data-test="cardContentContainer">
            {renderDeviceOfflineAlert()}
            <div className={classes.root}>
              <Grid container spacing={1}>
                <Grid item xs={9} sm={9} md={9} lg={9}>
                  <SubDeviceComponent deviceId={deviceId} />
                </Grid>
                <Grid item xs={3} sm={3} md={3} lg={3} className={classes.buttonsGrp}>
                  <SubDeviceComponent all={deviceId} />
                </Grid>
              </Grid>
            </div>
          </CardContent>
          <div className={classes.grow} />
          <CardActionFooter deviceId={deviceId} deviceVariant="smartSwitch" data-test="cardActionFooterContainer" />
        </React.Fragment>
      );
    }
  };

  return (
    <Card className={classes.default} data-test="smartSwitchCardContainer">
      <CardHeader
        className={classes.cardHeader}
        avatar={<OnlineDeviceStatus isDeviceOnline={isDeviceOnline} />}
        action={
          <IconButton aria-label="settings" onClick={handleSettingDialog}>
            <SettingsIcon />
          </IconButton>
        }
        title={deviceName}
        titleTypographyProps={{ align: 'center', variant: 'h6', color: 'primary', gutterBottom: false }}
      />
      {renderAlert()}
      {renderCards()}
    </Card>
  );
};

SmartSwitchCard.propTypes = {
  deviceId: PropTypes.string.isRequired,
  deviceName: PropTypes.string.isRequired,
};

export default SmartSwitchCard;
