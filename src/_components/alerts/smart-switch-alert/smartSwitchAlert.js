import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import CountDownTimer from '../../count-down-timer/CountDownTimer';

const SmartSwitchAlert = props => {
  const subDevices = useSelector(state => state.subDevice && state.subDevice.subDevices);
  const subDeviceParams = useSelector(state => state.subDeviceParam && state.subDeviceParam.subDeviceParams);
  const subDeviceSettings = useSelector(state => state.subDeviceSetting && state.subDeviceSetting.subDeviceSettings);
  const onlineDevices = useSelector(state => state.onlineDevice && state.onlineDevice.onlineDevices);

  const thisSubDevices = subDevices.filter(subDevice => subDevice.deviceId === props.deviceId);
  const thisSubDeviceParams = [];
  subDeviceParams.forEach(subDeviceParam => {
    thisSubDevices.forEach(subDevice => {
      if (
        subDeviceParam.subDeviceId === subDevice.subDeviceId &&
        subDeviceParam.paramName === 'status' &&
        subDeviceParam.paramValue === 'on'
      ) {
        thisSubDeviceParams.push(subDeviceParam);
      }
    });
  });
  const autoShutDownSettings = [];
  subDeviceSettings.forEach(setting => {
    thisSubDevices.forEach(subDevice => {
      if (
        setting.parent === props.deviceId &&
        setting.bindedTo === subDevice.subDeviceId &&
        setting.paramName === 'autoShutDownTime' &&
        setting.type === 'subDevice' &&
        setting.idType === 'subDeviceId'
      ) {
        autoShutDownSettings.push(setting);
      }
    });
  });
  const getEndTime = param => {
    const autoShutDownTime = autoShutDownSettings.filter(setting => param && setting.bindedTo === param.subDeviceId)[0];
    if (autoShutDownTime && autoShutDownTime.paramValue && autoShutDownTime.paramValue > 0) {
      return moment(param.updatedAt).add(autoShutDownTime.paramValue, 'minutes');
    }
    return false;
  };
  const thisOnlineDevice = onlineDevices.filter(
    onlineDevice => onlineDevice && onlineDevice.bindedTo && onlineDevice.bindedTo === props.deviceId
  )[0];

  const renderCountdown = param => {
    const remainingTime = getEndTime(param);
    if (remainingTime) {
      return <CountDownTimer endTime={getEndTime(param)} />;
    }
  };

  const renderAlert = param => {
    const autoShutDownTime = autoShutDownSettings.filter(setting => param && setting.bindedTo === param.subDeviceId)[0];
    const subDevice = subDevices.filter(subDevice => param && subDevice.subDeviceId === param.subDeviceId)[0];
    if (autoShutDownTime && autoShutDownTime.paramValue && autoShutDownTime.paramValue > 0) {
      return (
        <Typography component="div" color="primary" variant="body2">
          {subDevice.name} will be turned off automatically &nbsp;
          <strong>{renderCountdown(param)}</strong>
        </Typography>
      );
    }
  };

  return (
    <div>
      {autoShutDownSettings &&
        autoShutDownSettings.length > 0 &&
        thisSubDeviceParams.map(param => <div key={param.id}>{thisOnlineDevice && renderAlert(param)}</div>)}
    </div>
  );
};

SmartSwitchAlert.propTypes = {
  deviceId: PropTypes.string.isRequired,
};

export default SmartSwitchAlert;
