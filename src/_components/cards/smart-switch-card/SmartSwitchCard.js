import { Card, CardContent, CardHeader } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import PropTypes from 'prop-types';
import React, { useContext, useMemo } from 'react';
import { SocketIdContext } from '../../../_contexts/socket-id/SocketIdContext.provider';
import { SubDeviceContext } from '../../../_contexts/sub-device/SubDeviceContext.provider';
import SettingIconButton from '../../buttons/setting-icon-button/settingIconButton';
import DeviceOfflineAlert from '../../device-offline-alert/deviceOfflineAlert';
import OnlineDeviceStatus from '../../online-device-status/onlineDeviceStatus';
import SubDeviceComponent from '../../sub-device/subDeviceComponent';
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
  const classes = useStyles();
  const subDevicesContext = useContext(SubDeviceContext);
  const socketIdContext = useContext(SocketIdContext);
  const subDevices = subDevicesContext.subDevices;

  const thisSubDevices = useMemo(() => {
    if (deviceId && subDevices && subDevices.length) {
      return subDevices.filter(subDevice => subDevice.deviceId === deviceId);
    }
    return [];
  }, [deviceId, subDevices]);

  const isDeviceOnline = useMemo(() => {
    if (socketIdContext && socketIdContext.onlineDevices && socketIdContext.onlineDevices.length && deviceId) {
      return (
        socketIdContext.onlineDevices.filter(onlineDevice => onlineDevice.bindedTo && onlineDevice.bindedTo === deviceId)
          .length > 0
      );
    }
    return false;
  }, [deviceId, socketIdContext]);

  const renderDeviceOfflineAlert = useMemo(() => {
    if (!isDeviceOnline) {
      return <DeviceOfflineAlert data-test="offlineAlertContainer" />;
    }
  }, [isDeviceOnline]);

  const renderAlert = useMemo(() => {
    if (!thisSubDevices.length) {
      return (
        <CardContent className={classes.cardContent} data-test="noSubDeviceAlertCardContainer">
          {renderDeviceOfflineAlert}
          <Alert severity="info">It seems devices are not yet added. Please contact administrator!</Alert>
        </CardContent>
      );
    }
  }, [classes.cardContent, renderDeviceOfflineAlert, thisSubDevices.length]);

  const renderCards = useMemo(() => {
    if (thisSubDevices.length > 0) {
      return (
        <React.Fragment>
          <CardContent className={classes.cardContent} data-test="cardContentContainer">
            {renderDeviceOfflineAlert}
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
  }, [
    classes.buttonsGrp,
    classes.cardContent,
    classes.grow,
    classes.root,
    deviceId,
    renderDeviceOfflineAlert,
    thisSubDevices.length,
  ]);

  return (
    <Card className={classes.default} data-test="smartSwitchCardContainer">
      <CardHeader
        className={classes.cardHeader}
        avatar={<OnlineDeviceStatus isDeviceOnline={isDeviceOnline} />}
        action={<SettingIconButton deviceName={deviceName} deviceId={deviceId} dialogType={'smartSwitch'} />}
        title={deviceName}
        titleTypographyProps={{ align: 'center', variant: 'h6', color: 'primary', gutterBottom: false }}
      />
      {renderAlert}
      {renderCards}
    </Card>
  );
};

SmartSwitchCard.propTypes = {
  deviceId: PropTypes.string.isRequired,
  deviceName: PropTypes.string.isRequired,
};

export default SmartSwitchCard;
