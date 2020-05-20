import { Card, CardContent, CardHeader } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { SocketIdContext } from '../../../_contexts/socket-id/SocketIdContextProvider';
import SettingIconButton from '../../buttons/setting-icon-button/settingIconButton';
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
  const classes = useStyles();
  const [updatedAt, setUpdatedAt] = useState(moment().fromNow());
  const ref = useRef(null);

  // noinspection JSValidateTypes
  ref.current = { updatedAt, setUpdatedAt };

  const socketIdContext = useContext(SocketIdContext);
  const subDevices = useSelector(state => state && state.subDevice && state.subDevice.subDevices, shallowEqual);
  const deviceSettings = useSelector(
    state => state && state.deviceSetting && state.deviceSetting.deviceSettings,
    shallowEqual
  );
  const deviceParams = useSelector(state => state && state.deviceParam && state.deviceParam.deviceParams, shallowEqual);

  const isDeviceOnline = useMemo(() => {
    if (socketIdContext && socketIdContext.onlineDevices && socketIdContext.onlineDevices.length && deviceId) {
      return socketIdContext.onlineDevices.filter(({ bindedTo }) => bindedTo && bindedTo === deviceId).length > 0;
    }
    return false;
  }, [deviceId, socketIdContext]);

  const waterLevel = useMemo(() => {
    if (deviceParams && deviceParams.length) {
      const wLevel = deviceParams.filter(({ paramName }) => paramName === 'waterLevel');
      if (wLevel.length) {
        if (wLevel[0] && wLevel[0].updatedAt) {
          ref.current.updatedAt = moment(wLevel[0].updatedAt).fromNow();
        }
        return wLevel[0];
      }
    }
    return 0;
  }, [deviceParams]);

  const thisSubDevices = useMemo(() => {
    if (deviceId && subDevices.length) {
      return subDevices.filter(subDevice => subDevice.deviceId === deviceId && subDevice.type === 'motorSwitch');
    }
    return [];
  }, [deviceId, subDevices]);

  const preferredDevice = useMemo(() => {
    if (deviceId && subDevices.length && deviceSettings.length) {
      return deviceSettings.filter(
        ({ bindedTo, idType, paramName, type }) =>
          bindedTo === deviceId && type === 'device' && idType === 'deviceId' && paramName === 'preferredSubDevice'
      )[0];
    }
  }, [deviceId, deviceSettings, subDevices.length]);

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

  const renderOfflineAlert = useMemo(() => {
    if (!isDeviceOnline) {
      return <DeviceOfflineAlert data-test="tankOfflineAlertContainer" />;
    }
  }, [isDeviceOnline]);

  const renderSubDeviceAlert = useMemo(() => {
    if (!thisSubDevices.length) {
      return (
        <CardContent className={classes.cardContent} data-test="tankCardNoSubDeviceAlertContainer">
          {renderOfflineAlert}
          <Alert severity="info">It seems devices are not yet added. Please contact administrator!</Alert>
        </CardContent>
      );
    }
  }, [classes.cardContent, renderOfflineAlert, thisSubDevices.length]);

  const renderPreferredSubDevices = useCallback(
    subDevice => {
      if (thisSubDevices.length > 1 && preferredDevice && preferredDevice.paramValue === subDevice.subDeviceId) {
        return <PreferredDevice data-test="preferredDeviceContainer" />;
      }
    },
    [preferredDevice, thisSubDevices.length]
  );

  const renderLastUpdated = useMemo(() => {
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
  }, [classes.update]);

  const renderButtonGroups = useMemo(() => {
    if (thisSubDevices) {
      return thisSubDevices.map(subDevice => (
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
      ));
    }
  }, [classes.items, deviceId, renderPreferredSubDevices, thisSubDevices]);

  const renderTankCardContentContainer = useMemo(() => {
    if (thisSubDevices.length) {
      return (
        <React.Fragment>
          <CardContent className={classes.cardContent} data-test="tankCardContentContainer">
            {renderOfflineAlert}
            <div className={classes.root}>
              <Grid container spacing={1}>
                <Grid item xs={5} sm={4} md={5} lg={3}>
                  <Tank waterLevel={paramValue} data-test="tankContainer" />
                  {renderLastUpdated}
                </Grid>
                <Grid item xs={7} sm={8} md={7} lg={9} className={classes.buttonsGrp}>
                  {renderButtonGroups}
                </Grid>
              </Grid>
            </div>
          </CardContent>
          <CardActionFooter deviceId={deviceId} deviceVariant="tank" data-test="tankCardActionFooterContainer" />
        </React.Fragment>
      );
    }
    return null;
  }, [
    classes.buttonsGrp,
    classes.cardContent,
    classes.root,
    deviceId,
    paramValue,
    renderButtonGroups,
    renderLastUpdated,
    renderOfflineAlert,
    thisSubDevices.length,
  ]);

  return (
    <Card className={classes.default} data-test="tankCardContainer">
      <CardHeader
        className={classes.cardHeader}
        avatar={<OnlineDeviceStatus isDeviceOnline={isDeviceOnline} />}
        action={<SettingIconButton deviceName={deviceName} deviceId={deviceId} dialogType={'tank'} />}
        title={deviceName}
        titleTypographyProps={{ align: 'center', variant: 'h6', color: 'primary', gutterBottom: false }}
      />
      {renderSubDeviceAlert}
      {renderTankCardContentContainer}
    </Card>
  );
};

TankCard.propTypes = {
  deviceId: PropTypes.string.isRequired,
  deviceName: PropTypes.string.isRequired,
};

export default TankCard;
