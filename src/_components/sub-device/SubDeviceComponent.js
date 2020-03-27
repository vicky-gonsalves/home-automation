import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useSelector } from 'react-redux';
import SmartSwitch from '../switches/smart-switch/SmartSwitch';

const useStyles = makeStyles(() => ({
  buttonsGrp: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
}));

const SubDeviceComponent = props => {
  let thisSubDevices;
  let thisSubDevicesLength = 0;
  const classes = useStyles();

  const subDevices = useSelector(state =>
    state && state.subDevice && state.subDevice.subDevices ? state.subDevice.subDevices : []
  );

  if (props.deviceId && subDevices && subDevices.length) {
    thisSubDevices = subDevices.filter(subDevice => subDevice.deviceId === props.deviceId);
  }
  if (props.all && subDevices && subDevices.length) {
    thisSubDevicesLength = subDevices.filter(subDevice => subDevice.deviceId === props.all).length;
  }

  const showAllSwitch = thisSubDevicesLength > 1;

  return (
    <React.Fragment>
      <Grid container spacing={1}>
        {thisSubDevices &&
          thisSubDevices.length > 0 &&
          thisSubDevices.map(subDevice => (
            <Grid key={subDevice.subDeviceId} item xs={3} className={classes.buttonsGrp}>
              <SmartSwitch name={subDevice.name} deviceId={subDevice.deviceId} subDeviceId={subDevice.subDeviceId} />
            </Grid>
          ))}
        {showAllSwitch && (
          <Grid
            key={`all-${props.deviceId}`}
            item
            xs={3}
            className={classes.buttonsGrp}
            container
            direction="row"
            justify="flex-end"
          >
            <SmartSwitch name="All" deviceId={props.all} show={showAllSwitch} />
          </Grid>
        )}
      </Grid>
    </React.Fragment>
  );
};

export default SubDeviceComponent;
