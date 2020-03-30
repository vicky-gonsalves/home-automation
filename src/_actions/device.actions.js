import {
  deviceConstants,
  deviceSettingConstants,
  onlineDeviceConstants,
  sharedDeviceConstants,
  subDeviceConstants,
  subDeviceParamConstants,
  subDeviceSettingConstants,
} from '../_constants';
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

const setSubDevices = subDevices => dispatch => {
  dispatch({
    type: subDeviceConstants.SUB_DEVICE_STORE_ALL,
    payload: subDevices,
  });
};

const setSubDeviceParams = subDeviceParams => dispatch => {
  dispatch({
    type: subDeviceParamConstants.SUB_DEVICE_PARAM_STORE_ALL,
    payload: subDeviceParams,
  });
};

const setDeviceSettings = deviceSettings => dispatch => {
  dispatch({
    type: deviceSettingConstants.DEVICE_SETTING_STORE_ALL,
    payload: deviceSettings,
  });
};

const setSubDeviceSettings = subDeviceSettings => dispatch => {
  dispatch({
    type: subDeviceSettingConstants.SUB_DEVICE_SETTING_STORE_ALL,
    payload: subDeviceSettings,
  });
};

const setOnlineDevices = onlineDevices => dispatch => {
  dispatch({
    type: onlineDeviceConstants.ONLINE_DEVICE_STORE_ALL,
    payload: onlineDevices,
  });
};

const myDevices = () => async dispatch => {
  dispatch({
    type: deviceConstants.DEVICE_UPDATE_FETCHING,
  });
  try {
    const data = await deviceService.getMyDevices();
    if (data && data.devices && data.devices.myDevices) {
      dispatch(setDevices(data.devices.myDevices));
    }
    if (data && data.devices && data.devices.sharedDevices) {
      dispatch(setSharedDevices(data.devices.sharedDevices));
    }
    if (data && data.subDevices) {
      dispatch(setSubDevices(data.subDevices));
    }
    if (data && data.subDeviceParams) {
      dispatch(setSubDeviceParams(data.subDeviceParams));
    }
    if (data && data.settings) {
      if (data.settings && data.settings.deviceSettings) {
        dispatch(setDeviceSettings(data.settings.deviceSettings));
      }
      if (data.settings && data.settings.subDeviceSettings) {
        dispatch(setSubDeviceSettings(data.settings.subDeviceSettings));
      }
    }
    if (data && data.onlineDevices) {
      dispatch(setOnlineDevices(data.onlineDevices));
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
