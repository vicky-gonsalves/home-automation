import { combineReducers } from 'redux';
import alert from './alert/alert.reducer';
import device from './device/device.reducer';
import sharedDevice from './shared-device/sharedDevice.reducer';
import socket from './socket/socket.reducer';
import subDevice from './sub-device/subDevice.reducer';
import user from './user/user.reducer';

const rootReducer = combineReducers({
  user,
  alert,
  socket,
  device,
  subDevice,
  sharedDevice,
});

export default rootReducer;
