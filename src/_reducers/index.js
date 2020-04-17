/* istanbul ignore file */
import { combineReducers } from 'redux';
import adminDrawer from './admin-drawer/adminDrawer.reducer';
import deviceParam from './device-param/deviceParam.reducer';
import deviceSetting from './device-setting/deviceSetting.reducer';
import device from './device/device.reducer';
import settingDialog from './dialog/settingDialog.reducer';
import log from './log/log.reducer';
import onlineDevice from './online-device/onlineDevice.reducer';
import sharedDevice from './shared-device/sharedDevice.reducer';
import socket from './socket/socket.reducer';
import subDeviceParam from './sub-device-param/subDeviceParam.reducer';
import subDeviceSetting from './sub-device-setting/subDeviceSetting.reducer';
import subDevice from './sub-device/subDevice.reducer';
import user from './user/user.reducer';

const rootReducer = combineReducers({
  user,
  socket,
  device,
  subDevice,
  sharedDevice,
  subDeviceParam,
  settingDialog,
  deviceSetting,
  subDeviceSetting,
  onlineDevice,
  deviceParam,
  log,
  adminDrawer,
});

export default rootReducer;
