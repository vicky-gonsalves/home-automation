import { combineReducers } from 'redux';
import alert from './alert/alert.reducer';
import deviceSetting from './device-setting/deviceSetting.reducer';
import device from './device/device.reducer';
import settingDialog from './dialog/settingDialog.reducer';
import sharedDevice from './shared-device/sharedDevice.reducer';
import socket from './socket/socket.reducer';
import subDeviceParam from './sub-device-param/subDeviceParam.reducer';
import subDeviceSetting from './sub-device-setting/subDeviceSetting.reducer';
import subDevice from './sub-device/subDevice.reducer';
import user from './user/user.reducer';
import onlineDevice from './online-device/onlineDevice.reducer';

const rootReducer = combineReducers({
  user,
  alert,
  socket,
  device,
  subDevice,
  sharedDevice,
  subDeviceParam,
  settingDialog,
  deviceSetting,
  subDeviceSetting,
  onlineDevice,
});

export default rootReducer;
