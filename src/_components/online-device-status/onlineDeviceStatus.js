import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import Tooltip from '@material-ui/core/Tooltip';
import WifiIcon from '@material-ui/icons/Wifi';
import React from 'react';

const OnlineDeviceStatus = props => {
  let style = { color: red[500] };
  if (props.isDeviceOnline) {
    style = { color: green[500] };
  }
  return (
    <Tooltip title={props.isDeviceOnline ? 'Device is online' : 'Device is offline'}>
      <WifiIcon style={style} />
    </Tooltip>
  );
};

export default OnlineDeviceStatus;
