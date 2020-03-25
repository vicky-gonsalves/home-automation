import { Card, CardContent, CardHeader } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import SettingsIcon from '@material-ui/icons/Settings';
import WifiIcon from '@material-ui/icons/Wifi';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { settingDialogActions } from '../../../_actions/settingDialog.actions';
import MotorSettingDialog from '../../dialogs/motor-setting-dialog/motorSettingDialog';
import MotorMode from '../../radios/motor-mode/motorMode';
import MotorSwitch from '../../switches/motor-switch/motorSwitch';
import Tank from '../../tank/tank';
import TankCardAction from '../tank-card-action/TankCardAction';

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

const TankCard = props => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [updatedAt, setUpdatedAt] = useState();
  const ref = useRef(null);
  let thisSubDevices;
  let waterLevel = 0;

  ref.current = { updatedAt, setUpdatedAt };

  const subDevices = useSelector(state =>
    state && state.subDevice && state.subDevice.subDevices ? state.subDevice.subDevices : []
  );

  const subDeviceParams = useSelector(state =>
    state && state.subDeviceParam && state.subDeviceParam.subDeviceParams ? state.subDeviceParam.subDeviceParams : []
  );

  const handleSettingDialog = () => {
    dispatch(settingDialogActions.open());
  };

  if (subDeviceParams && subDeviceParams.length) {
    const wLevel = subDeviceParams.filter(subDeviceParam => subDeviceParam && subDeviceParam.paramName === 'waterLevel');
    if (wLevel.length) {
      waterLevel = wLevel[0];
      if (waterLevel && waterLevel.updatedAt) {
        ref.current.updatedAt = moment(waterLevel.updatedAt).fromNow();
      }
    }
  }
  if (props.deviceId && subDevices.length) {
    thisSubDevices = subDevices.filter(
      subDevice => subDevice.deviceId === props.deviceId && subDevice.type === 'motorSwitch'
    );
  }

  useEffect(() => {
    const updatedAtInterval = setInterval(() => {
      ref.current.setUpdatedAt(moment(waterLevel.updatedAt).fromNow());
    }, 1000);
    return () => {
      clearInterval(updatedAtInterval);
    };
  }, [waterLevel.updatedAt]);

  return (
    <Card className={classes.default}>
      <CardHeader
        className={classes.cardHeader}
        avatar={<WifiIcon color="primary" />}
        action={
          <IconButton aria-label="settings" onClick={handleSettingDialog}>
            <SettingsIcon />
          </IconButton>
        }
        title={props.deviceName}
        titleTypographyProps={{ align: 'center', variant: 'h6', color: 'primary', gutterBottom: false }}
      />
      <CardContent className={classes.cardContent}>
        <div className={classes.root}>
          <Grid container spacing={1}>
            <Grid item xs={5} sm={4} md={5} lg={3}>
              <Tank waterLevel={waterLevel.paramValue} />
              <Typography component="div" color="textSecondary" variant="caption" className={classes.update}>
                Updated {ref.current.updatedAt}
              </Typography>
            </Grid>
            <Grid item xs={7} sm={8} md={7} lg={9} className={classes.buttonsGrp}>
              {thisSubDevices &&
                thisSubDevices.map(subDevice => (
                  <div key={subDevice.subDeviceId} className={classes.items}>
                    <MotorSwitch name={subDevice.name} deviceId={props.deviceId} subDeviceId={subDevice.subDeviceId} />
                    <MotorMode name={subDevice.name} deviceId={props.deviceId} subDeviceId={subDevice.subDeviceId} />
                  </div>
                ))}
            </Grid>
          </Grid>
        </div>
      </CardContent>
      <TankCardAction />
      <MotorSettingDialog name={props.deviceName} deviceId={props.deviceId} />
    </Card>
  );
};

export default TankCard;
