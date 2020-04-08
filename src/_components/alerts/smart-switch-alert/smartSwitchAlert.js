import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import CountDownTimer from '../../count-down-timer/CountDownTimer';

const SmartSwitchAlert = ({ deviceId }) => {
  const subDevices = useSelector(state => state.subDevice && state.subDevice.subDevices);
  const subDeviceParams = useSelector(state => state.subDeviceParam && state.subDeviceParam.subDeviceParams);
  const subDeviceSettings = useSelector(state => state.subDeviceSetting && state.subDeviceSetting.subDeviceSettings);
  const onlineDevices = useSelector(state => state.onlineDevice && state.onlineDevice.onlineDevices);

  const thisSubDevices = subDevices.filter(subDevice => subDevice.deviceId === deviceId);
  const thisSubDeviceParams = [];
  subDeviceParams.forEach(subDeviceParam => {
    thisSubDevices.forEach(subDevice => {
      const { paramValue, subDeviceId, paramName } = subDeviceParam;
      if (subDeviceId === subDevice.subDeviceId && paramName === 'status' && paramValue === 'on') {
        thisSubDeviceParams.push(subDeviceParam);
      }
    });
  });
  const autoShutDownSettings = [];
  subDeviceSettings.forEach(setting => {
    thisSubDevices.forEach(subDevice => {
      const { paramName, idType, parent, bindedTo, type } = setting;
      if (
        parent === deviceId &&
        bindedTo === subDevice.subDeviceId &&
        paramName === 'autoShutDownTime' &&
        type === 'subDevice' &&
        idType === 'subDeviceId'
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
  };
  const thisOnlineDevice = onlineDevices.filter(
    onlineDevice => onlineDevice && onlineDevice.bindedTo && onlineDevice.bindedTo === deviceId
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
    const { paramValue } = autoShutDownTime;
    if (autoShutDownTime && paramValue && paramValue > 0) {
      return (
        <Typography component="div" color="primary" variant="body2" data-test="alertComponent">
          {subDevice.name} will be turned off automatically &nbsp;
          <strong>{renderCountdown(param)}</strong>
        </Typography>
      );
    }
  };

  return (
    <div data-test="alertContainer">
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
