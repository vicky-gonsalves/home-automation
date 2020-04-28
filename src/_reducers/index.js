/* istanbul ignore file */
import { combineReducers } from 'redux';
import { appConstants } from '../_constants';
import adminDrawer from './admin-drawer/adminDrawer.reducer';
import adminUser from './admin-user/adminUser.reducer';
import deviceParam from './device-param/deviceParam.reducer';
import deviceSetting from './device-setting/deviceSetting.reducer';
import device from './device/device.reducer';
import settingDialog from './dialog/settingDialog.reducer';
import log from './log/log.reducer';
import onlineDevice from './online-device/onlineDevice.reducer';
import sharedDevice from './shared-device/sharedDevice.reducer';
import siteSetting from './site-setting/siteSetting.reducer';
import socket from './socket/socket.reducer';
import subDeviceParam from './sub-device-param/subDeviceParam.reducer';
import subDeviceSetting from './sub-device-setting/subDeviceSetting.reducer';
import subDevice from './sub-device/subDevice.reducer';
import user from './user/user.reducer';

const appReducer = combineReducers({
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
  adminUser,
  siteSetting,
});

const rootReducer = (state, action) => {
  if (action.type === appConstants.CLEAR_DATA) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
