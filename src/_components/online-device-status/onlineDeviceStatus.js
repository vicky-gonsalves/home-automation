import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import Tooltip from '@material-ui/core/Tooltip';
import WifiIcon from '@material-ui/icons/Wifi';
import PropTypes from 'prop-types';
import React from 'react';

const OnlineDeviceStatus = props => {
  let style = { color: red[500] };
  if (props.isDeviceOnline) {
    style = { color: green[500] };
  }
  const getStatus = () => {
    if (props.isDeviceOnline) {
      return 'Device is online';
    }
    return 'Device is offline';
  };
  return (
    <Tooltip title={getStatus()} data-test="onlineDeviceStatusTooltipComponent">
      <WifiIcon style={style} data-test="onlineDeviceStatusWifiIconComponent" />
    </Tooltip>
  );
};

OnlineDeviceStatus.propTypes = {
  isDeviceOnline: PropTypes.bool.isRequired,
};

export default OnlineDeviceStatus;
