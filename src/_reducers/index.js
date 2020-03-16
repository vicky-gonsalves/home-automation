import { combineReducers } from 'redux';
import alert from './alert/alert.reducer';
import user from './user/user.reducer';
import socket from './socket/socket.reducer';
import device from './device/device.reducer';

const rootReducer = combineReducers({
  user,
  alert,
  socket,
  device,
});

export default rootReducer;
