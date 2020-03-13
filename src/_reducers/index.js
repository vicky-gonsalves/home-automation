import { combineReducers } from 'redux';
import alert from './alert/alert.reducer';
import user from './user/user.reducer';
import socket from './socket/socket.reducer';

const rootReducer = combineReducers({
  user,
  alert,
  socket,
});

export default rootReducer;
