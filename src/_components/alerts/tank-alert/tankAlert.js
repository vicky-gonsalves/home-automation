import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import CountDownTimer from '../../count-down-timer/CountDownTimer';

const TankAlert = props => {
  let autoShutDownTime;
  const subDevices = useSelector(state => state.subDevice && state.subDevice.subDevices);
  const subDeviceParams = useSelector(state => state.subDeviceParam && state.subDeviceParam.subDeviceParams);
  const deviceSettings = useSelector(state => state.deviceSetting && state.deviceSetting.deviceSettings);
  const onlineDevices = useSelector(state => state.onlineDevice && state.onlineDevice.onlineDevices);
  const thisDeviceParams = subDeviceParams.filter(
    param => param.deviceId === props.deviceId && param.paramName === 'status' && param.paramValue === 'on'
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

  const getEndTime = startTime => {
    if (autoShutDownTime && autoShutDownTime.paramValue) {
      return moment(startTime).add(autoShutDownTime.paramValue, 'minutes');
    }
  };
  const thisOnlineDevice = onlineDevices.filter(
    onlineDevice => onlineDevice && onlineDevice.bindedTo && onlineDevice.bindedTo === props.deviceId
  )[0];

  const getSubDeviceName = param => {
    const subDevice = subDevices.filter(subDevice => subDevice.subDeviceId === param.subDeviceId)[0];
    return subDevice ? subDevice.name : null;
  };

  return (
    <div data-test="alertContainer">
      {autoShutDownTime &&
        autoShutDownTime.paramValue &&
        thisDeviceParams.map(param => (
          <div key={param.id}>
            {thisOnlineDevice && (
              <Typography component="div" color="primary" variant="body2" data-test="alertComponent">
                {getSubDeviceName(param)} will be turned off automatically &nbsp;
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

TankAlert.propTypes = {
  deviceId: PropTypes.string.isRequired,
};

export default TankAlert;
