import { Card, CardContent, CardHeader } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import SettingsIcon from '@material-ui/icons/Settings';
import Alert from '@material-ui/lab/Alert';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { settingDialogActions } from '../../../_actions/settingDialog.actions';
import DeviceOfflineAlert from '../../device-offline-alert/deviceOfflineAlert';
import OnlineDeviceStatus from '../../online-device-status/onlineDeviceStatus';
import PreferredDevice from '../../preferred-device/preferredDevice';
import MotorMode from '../../radios/motor-mode/motorMode';
import MotorSwitch from '../../switches/motor-switch/motorSwitch';
import Tank from '../../tank/tank';
import CardActionFooter from '../card-action/CardActionFooter';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(0),
  },
  default: {
    minHeight: 240,
  },
  cardHeader: {
    padding: theme.spacing(1, 2),
  },
  cardContent: {
    padding: theme.spacing(0, 1),
  },
  mode: {
    padding: theme.spacing(0, 1),
  },
  buttonsGrp: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  items: {
    marginBottom: theme.spacing(2),
    '&:last-child': {
      marginBottom: theme.spacing(0),
    },
  },
  update: {
    marginTop: theme.spacing(2),
    textAlign: 'center',
  },
}));

const TankCard = ({ deviceId, deviceName }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [updatedAt, setUpdatedAt] = useState();
  const ref = useRef(null);
  let thisSubDevices = [];
  let waterLevel = 0;
  let isDeviceOnline = false;
  let preferredDevice;

  // noinspection JSValidateTypes
  ref.current = { updatedAt, setUpdatedAt };

  const socketIds = useSelector(state => state.onlineDevice);
  if (socketIds && socketIds.onlineDevices && socketIds.onlineDevices.length && deviceId) {
    isDeviceOnline = socketIds.onlineDevices.filter(({ bindedTo }) => bindedTo && bindedTo === deviceId).length > 0;
  }

  const subDevices = useSelector(state =>
    state && state.subDevice && state.subDevice.subDevices ? state.subDevice.subDevices : []
  );

  const deviceParams = useSelector(state =>
    state && state.deviceParam && state.deviceParam.deviceParams ? state.deviceParam.deviceParams : []
  );

  const handleSettingDialog = () => dispatch(settingDialogActions.open(deviceName, deviceId, 'tank'));

  if (deviceParams && deviceParams.length) {
    const wLevel = deviceParams.filter(({ paramName }) => paramName === 'waterLevel');
    if (wLevel.length) {
      waterLevel = wLevel[0];
      if (waterLevel && waterLevel.updatedAt) {
        ref.current.updatedAt = moment(waterLevel.updatedAt).fromNow();
      }
    }
  }
  if (deviceId && subDevices.length) {
    thisSubDevices = subDevices.filter(subDevice => subDevice.deviceId === deviceId && subDevice.type === 'motorSwitch');
  }

  const deviceSettings = useSelector(state =>
    state && state.deviceSetting && state.deviceSetting.deviceSettings ? state.deviceSetting.deviceSettings : []
  );

  if (deviceId && subDevices.length && deviceSettings.length) {
    preferredDevice = deviceSettings.filter(
      ({ bindedTo, idType, paramName, type }) =>
        bindedTo === deviceId && type === 'device' && idType === 'deviceId' && paramName === 'preferredSubDevice'
    )[0];
  }

  const { paramValue } = waterLevel;

  // noinspection JSUnresolvedVariable
  useEffect(() => {
    const updatedAtInterval = setInterval(() => {
      // noinspection JSUnresolvedVariable,JSUnresolvedFunction
      ref.current.setUpdatedAt(moment(waterLevel.updatedAt).fromNow());
    }, 1000);
    return () => {
      clearInterval(updatedAtInterval);
    };
  }, [waterLevel.updatedAt]);

  const renderOfflineAlert = () => {
    if (!isDeviceOnline) {
      return <DeviceOfflineAlert data-test="tankOfflineAlertContainer" />;
    }
  };

  const renderSubDeviceAlert = () => {
    if (!thisSubDevices.length) {
      return (
        <CardContent className={classes.cardContent} data-test="tankCardNoSubDeviceAlertContainer">
          {renderOfflineAlert()}
          <Alert severity="info">It seems devices are not yet added. Please contact administrator!</Alert>
        </CardContent>
      );
    }
  };

  const renderPreferredSubDevices = subDevice => {
    if (thisSubDevices.length > 1 && preferredDevice && preferredDevice.paramValue === subDevice.subDeviceId) {
      return <PreferredDevice data-test="preferredDeviceContainer" />;
    }
  };

  const renderLastUpdated = () => {
    const { updatedAt: lastUpdated } = ref.current;
    return (
      <Typography
        component="div"
        color="textSecondary"
        variant="caption"
        className={classes.update}
        data-test="tankUpdateContainer"
      >
        {`Updated ${lastUpdated}`}
      </Typography>
    );
  };

  const renderButtonGroups = subDevice => {
    return (
      <div key={subDevice.subDeviceId} className={classes.items}>
        {renderPreferredSubDevices(subDevice)}
        <MotorSwitch
          name={subDevice.name}
          deviceId={deviceId}
          subDeviceId={subDevice.subDeviceId}
          data-test="MotorSwitchContainer"
        />
        <MotorMode
          name={subDevice.name}
          deviceId={deviceId}
          subDeviceId={subDevice.subDeviceId}
          data-test="MotorModeContainer"
        />
      </div>
    );
  };

  return (
    <Card className={classes.default} data-test="tankCardContainer">
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
      {renderSubDeviceAlert()}
      {thisSubDevices.length > 0 && (
        <React.Fragment>
          <CardContent className={classes.cardContent} data-test="tankCardContentContainer">
            {renderOfflineAlert()}
            <div className={classes.root}>
              <Grid container spacing={1}>
                <Grid item xs={5} sm={4} md={5} lg={3}>
                  <Tank waterLevel={paramValue} data-test="tankContainer" />
                  {renderLastUpdated()}
                </Grid>
                <Grid item xs={7} sm={8} md={7} lg={9} className={classes.buttonsGrp}>
                  {thisSubDevices && thisSubDevices.map(subDevice => renderButtonGroups(subDevice))}
                </Grid>
              </Grid>
            </div>
          </CardContent>
          <CardActionFooter deviceId={deviceId} deviceVariant="tank" data-test="tankCardActionFooterContainer" />
        </React.Fragment>
      )}
    </Card>
  );
};

TankCard.propTypes = {
  deviceId: PropTypes.string.isRequired,
  deviceName: PropTypes.string.isRequired,
};

export default TankCard;
