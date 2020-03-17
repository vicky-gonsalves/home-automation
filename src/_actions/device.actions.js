import { deviceConstants, sharedDeviceConstants } from '../_constants';
import { deviceService } from '../_services';

const setDevices = devices => dispatch => {
  dispatch({
    type: deviceConstants.DEVICE_STORE_ALL,
    payload: devices,
  });
};

const setSharedDevices = sharedDevices => dispatch => {
  dispatch({
    type: sharedDeviceConstants.SHARED_DEVICE_STORE_ALL,
    payload: sharedDevices,
  });
};

const myDevices = () => async dispatch => {
  dispatch({
    type: deviceConstants.DEVICE_UPDATE_FETCHING,
  });
  try {
    const devices = await deviceService.getMyDevices();
    if (devices && devices.myDevices) {
      dispatch(setDevices(devices.myDevices));
    }
    if (devices && devices.sharedDevices) {
      dispatch(setSharedDevices(devices.sharedDevices));
    }
  } catch (e) {
    dispatch({
      type: deviceConstants.DEVICE_GET_ERROR,
    });
  }
};

const removeAllDevices = () => dispatch => {
  dispatch({
    type: deviceConstants.DEVICE_REMOVE_ALL,
  });
};

export const deviceActions = {
  myDevices,
  removeAllDevices,
};
