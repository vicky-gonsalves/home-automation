import { Card, CardContent, CardHeader } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import SettingsIcon from '@material-ui/icons/Settings';
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

const SmartSwitchCard = props => {
  const classes = useStyles();
  const dispatch = useDispatch();
  let isDeviceOnline = false;

  const socketIds = useSelector(state => state.onlineDevice);

  if (socketIds && socketIds.onlineDevices && socketIds.onlineDevices.length && props.deviceId) {
    isDeviceOnline =
      socketIds.onlineDevices.filter(onlineDevice => onlineDevice.bindedTo && onlineDevice.bindedTo === props.deviceId)
        .length > 0;
  }

  const handleSettingDialog = () => dispatch(settingDialogActions.open(props.deviceName, props.deviceId, 'smartSwitch'));

  return (
    <Card className={classes.default}>
      <CardHeader
        className={classes.cardHeader}
        avatar={<OnlineDeviceStatus isDeviceOnline={isDeviceOnline} />}
        action={
          <IconButton aria-label="settings" onClick={handleSettingDialog}>
            <SettingsIcon />
          </IconButton>
        }
        title={props.deviceName}
        titleTypographyProps={{ align: 'center', variant: 'h6', color: 'primary', gutterBottom: false }}
      />
      <CardContent className={classes.cardContent}>
        {!isDeviceOnline && <DeviceOfflineAlert />}
        <div className={classes.root}>
          <Grid container spacing={1}>
            <Grid item xs={9} sm={9} md={9} lg={9}>
              <SubDeviceComponent deviceId={props.deviceId} />
            </Grid>
            <Grid item xs={3} sm={3} md={3} lg={3} className={classes.buttonsGrp}>
              <SubDeviceComponent all={props.deviceId} />
            </Grid>
          </Grid>
        </div>
        <Typography component="div" color="textSecondary" variant="caption" className={classes.caption}>
          Last update at: Feb 18, 2020, 11:49:51 AM
        </Typography>
      </CardContent>
      <div className={classes.grow} />
      <CardActionFooter deviceId={props.deviceId} deviceVariant="smartSwitch" />
    </Card>
  );
};

export default SmartSwitchCard;
