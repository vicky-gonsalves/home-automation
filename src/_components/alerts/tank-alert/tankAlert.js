import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { DeviceSettingContext } from '../../../_contexts/device-setting/DeviceSettingContext.provider';
import { SocketIdContext } from '../../../_contexts/socket-id/SocketIdContext.provider';
import { SubDeviceParamsContext } from '../../../_contexts/sub-device-param/SubDeviceParamContext.provider';
import { SubDeviceContext } from '../../../_contexts/sub-device/SubDeviceContext.provider';
import CountDownTimer from '../../count-down-timer/CountDownTimer';

const TankAlert = props => {
  let autoShutDownTime;
  let coolDownTime;
  const socketIdContext = useContext(SocketIdContext);
  const subDevicesContext = useContext(SubDeviceContext);
  const deviceSettingContext = useContext(DeviceSettingContext);
  const subDeviceParamsContext = useContext(SubDeviceParamsContext);
  const subDeviceParams = subDeviceParamsContext.subDeviceParams;
  const onlineDevices = socketIdContext.onlineDevices;
  const subDevices = subDevicesContext.subDevices;
  const deviceSettings = deviceSettingContext.deviceSettings;
  const thisDeviceParams = subDeviceParams.filter(
    param => param.deviceId === props.deviceId && param.paramName === 'status' && param.paramValue === 'on'
  );
  const thisDeviceCooldownParams = subDeviceParams.filter(
    param => param.deviceId === props.deviceId && param.paramName === 'condition' && param.paramValue === 'hot'
  );
  autoShutDownTime = deviceSettings.filter(setting => {
    const { paramValue, idType, paramName, bindedTo, type } = setting;
    return (
      bindedTo === props.deviceId &&
      paramName === 'autoShutDownTime' &&
      paramValue > 0 &&
      type === 'device' &&
      idType === 'deviceId'
    );
  })[0];
  coolDownTime = deviceSettings.filter(setting => {
    const { paramValue, idType, paramName, bindedTo, type } = setting;
    return (
      bindedTo === props.deviceId &&
      paramName === 'coolDownTime' &&
      paramValue > 0 &&
      type === 'device' &&
      idType === 'deviceId'
    );
  })[0];

  const getEndTime = startTime => moment(startTime).add(autoShutDownTime.paramValue, 'minutes');
  const getCoolDownEndTime = startTime => moment(startTime).add(coolDownTime.paramValue, 'minutes');

  const thisOnlineDevice = onlineDevices.filter(
    onlineDevice => onlineDevice && onlineDevice.bindedTo && onlineDevice.bindedTo === props.deviceId
  )[0];

  const getSubDeviceName = param => {
    const subDevice = subDevices.filter(subDevice => subDevice.subDeviceId === param.subDeviceId)[0];
    return subDevice ? subDevice.name : null;
  };

  const renderCountdown = param => {
    const subDeviceName = getSubDeviceName(param);
    if (thisOnlineDevice && subDeviceName) {
      return (
        <Typography component="div" color="primary" variant="body2" data-test="alertComponent">
          {subDeviceName} will be turned off automatically &nbsp;
          <strong>
            <CountDownTimer endTime={getEndTime(param.updatedAt)} />
          </strong>
        </Typography>
      );
    }
  };

  const renderCoolDownTimer = param => {
    const subDeviceName = getSubDeviceName(param);
    if (thisOnlineDevice && subDeviceName) {
      return (
        <Typography component="div" color="primary" variant="body2" data-test="coolDownAlertComponent">
          {subDeviceName} cut-off will be released in &nbsp;
          <strong>
            <CountDownTimer endTime={getCoolDownEndTime(param.updatedAt)} />
          </strong>
        </Typography>
      );
    }
  };

  const renderAlert = () => {
    return (
      autoShutDownTime &&
      autoShutDownTime.paramValue &&
      thisDeviceParams.map(param => <div key={param.id}>{renderCountdown(param)}</div>)
    );
  };

  const renderCoolDownAlert = () => {
    return (
      coolDownTime &&
      coolDownTime.paramValue &&
      thisDeviceCooldownParams.map(param => <div key={param.id}>{renderCoolDownTimer(param)}</div>)
    );
  };

  return (
    <div data-test="alertContainer">
      <div>{renderAlert()}</div>
      <div>{renderCoolDownAlert()}</div>
    </div>
  );
};

TankAlert.propTypes = {
  deviceId: PropTypes.string.isRequired,
};

export default TankAlert;
