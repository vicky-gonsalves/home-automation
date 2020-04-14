import { onlineDeviceConstants } from '../../_constants';

const removeAllOnlineDevices = () => dispatch => {
  dispatch({
    type: onlineDeviceConstants.ONLINE_DEVICE_REMOVE_ALL,
  });
};

export const onlineDeviceActions = {
  removeAllOnlineDevices,
};
