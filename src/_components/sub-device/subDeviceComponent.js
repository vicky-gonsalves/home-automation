import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import SmartSwitch from '../switches/smart-switch/smartSwitch';

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

  const subDevices = useSelector(state => state && state.subDevice && state.subDevice.subDevices);

  if (props.deviceId && subDevices && subDevices.length) {
    thisSubDevices = subDevices.filter(subDevice => subDevice.deviceId === props.deviceId);
  }
  if (props.all && subDevices && subDevices.length) {
    thisSubDevicesLength = subDevices.filter(subDevice => subDevice.deviceId === props.all).length;
  }

  const showAllSwitch = thisSubDevicesLength > 1;

  const renderSwitches = () => {
    if (thisSubDevices && thisSubDevices.length > 0) {
      return thisSubDevices.map(subDevice => (
        <Grid
          key={subDevice.subDeviceId}
          item
          xs={3}
          className={classes.buttonsGrp}
          data-test="subDeviceIndSwitchComponentContainer"
        >
          <SmartSwitch
            name={subDevice.name}
            deviceId={subDevice.deviceId}
            subDeviceId={subDevice.subDeviceId}
            data-test="subDeviceSmartSwitchContainer"
          />
        </Grid>
      ));
    }
  };

  const renderAllSwitch = () => {
    if (showAllSwitch) {
      return (
        <Grid
          key={`all-${props.deviceId}`}
          item
          xs={3}
          className={classes.buttonsGrp}
          container
          direction="row"
          justify="flex-end"
        >
          <SmartSwitch name="All" deviceId={props.all} show={showAllSwitch} data-test="subDeviceSmartSwitchAllContainer" />
        </Grid>
      );
    }
  };

  const renderSubDevices = () => {
    return (
      <Grid container spacing={1}>
        {renderSwitches()}
        {renderAllSwitch()}
      </Grid>
    );
  };

  return <React.Fragment>{renderSubDevices()}</React.Fragment>;
};

SubDeviceComponent.propTypes = {
  deviceId: PropTypes.string,
  all: PropTypes.string,
};

export default SubDeviceComponent;
