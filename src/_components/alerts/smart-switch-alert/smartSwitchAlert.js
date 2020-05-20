import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { SocketIdContext } from '../../../_contexts/socket-id/SocketIdContext.provider';
import { SubDeviceContext } from '../../../_contexts/sub-device/SubDeviceContext.provider';
import CountDownTimer from '../../count-down-timer/CountDownTimer';

const SmartSwitchAlert = ({ deviceId }) => {
  const socketIdContext = useContext(SocketIdContext);
  const subDevicesContext = useContext(SubDeviceContext);
  const subDeviceParams = useSelector(state => state.subDeviceParam && state.subDeviceParam.subDeviceParams);
  const subDeviceSettings = useSelector(state => state.subDeviceSetting && state.subDeviceSetting.subDeviceSettings);
  const onlineDevices = socketIdContext.onlineDevices;
  const subDevices = subDevicesContext.subDevices;

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

  const getEndTime = (updatedAt, minutes) => {
    return moment(updatedAt).add(minutes, 'minutes');
  };

  const thisOnlineDevice = onlineDevices.filter(
    onlineDevice => onlineDevice && onlineDevice.bindedTo && onlineDevice.bindedTo === deviceId
  )[0];

  const renderCountdown = (updatedAt, minutes) => {
    const remainingTime = getEndTime(updatedAt, minutes);
    return <CountDownTimer endTime={remainingTime} />;
  };

  const renderAlert = ({ updatedAt, subDeviceId }) => {
    const autoShutDownTime = autoShutDownSettings.filter(setting => subDeviceId && setting.bindedTo === subDeviceId)[0];
    const subDevice = subDevices.filter(subDevice => subDeviceId && subDevice.subDeviceId === subDeviceId)[0];
    const { paramValue: minutes } = autoShutDownTime;
    const isValidDate = d => {
      return d instanceof Date && !isNaN(d);
    };
    const isValidUpdatedAt = updatedAt && isValidDate(new Date(updatedAt));
    if (autoShutDownTime && !isNaN(minutes) && minutes > 0 && isValidUpdatedAt) {
      return (
        <Typography component="div" color="primary" variant="body2" data-test="alertComponent">
          {subDevice.name} will be turned off automatically &nbsp;
          <strong>{renderCountdown(updatedAt, minutes)}</strong>
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
