import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useSelector } from 'react-redux';
import CountDownTimer from '../../count-down-timer/CountDownTimer';
import moment from 'moment';

const TankAlert = props => {
  const subDeviceParams = useSelector(state => state.subDeviceParam && state.subDeviceParam.subDeviceParams);
  const deviceSettings = useSelector(state => state.deviceSetting && state.deviceSetting.deviceSettings);
  const onlineDevices = useSelector(state => state.onlineDevice && state.onlineDevice.onlineDevices);
  const thisDeviceParams = subDeviceParams.filter(
    param => param.deviceId === props.deviceId && param.paramName === 'status' && param.paramValue === 'on'
  );
  const autoShutDownTime = deviceSettings.filter(
    setting =>
      setting.bindedTo === props.deviceId &&
      setting.paramName === 'autoShutDownTime' &&
      setting.type === 'device' &&
      setting.idType === 'deviceId'
  )[0];
  const getEndTime = startTime => {
    if (autoShutDownTime && autoShutDownTime.paramValue) {
      return moment(startTime).add(autoShutDownTime.paramValue, 'minutes');
    }
  };
  const thisOnlineDevice = onlineDevices.filter(
    onlineDevice => onlineDevice && onlineDevice.bindedTo && onlineDevice.bindedTo === props.deviceId
  )[0];
  return (
    <div>
      {autoShutDownTime &&
        autoShutDownTime.paramValue &&
        thisDeviceParams.map(param => (
          <div key={param.id}>
            {thisOnlineDevice && (
              <Typography component="div" color="primary" variant="body2">
                Motor will be turned off automatically &nbsp;
                <strong>
                  <CountDownTimer endTime={getEndTime(param.updatedAt)} />
                </strong>
              </Typography>
            )}
          </div>
        ))}
    </div>
  );
};

export default TankAlert;
