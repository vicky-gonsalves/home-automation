import socketIOClient from 'socket.io-client';
import { socketConstants } from '../_constants';
import config from '../config';

let socket;
const socketInit = accessToken => dispatch => {
  dispatch({
    type: socketConstants.SOCKET_INIT,
  });
  const options = {
    query: { auth_token: accessToken },
  };
  socket = socketIOClient(config.socketUrl, options);

  socket.on('error', function(err) {
    // eslint-disable-next-line no-console
    console.log(err);
  });

  // Device params events---------------------------------------------------------------------------------------------
  socket.on('DEVICE_CREATED', function(data) {
    // eslint-disable-next-line no-console
    console.log('ON DEVICE_CREATED: ');

    // eslint-disable-next-line no-console
    console.log(data);
  });

  socket.on('DEVICE_UPDATED', function(data) {
    // eslint-disable-next-line no-console
    console.log('ON DEVICE_UPDATED: ');
    // eslint-disable-next-line no-console
    console.log(data);
  });

  socket.on('DEVICE_DELETED', function(data) {
    // eslint-disable-next-line no-console
    console.log('ON DEVICE_DELETED: ');
    // eslint-disable-next-line no-console
    console.log(data);
  });

  // Sub Device params events-----------------------------------------------------------------------------------------
  socket.on('SUB_DEVICE_CREATED', function(data) {
    // eslint-disable-next-line no-console
    console.log('ON SUB_DEVICE_CREATED: ');
    // eslint-disable-next-line no-console
    console.log(data);
  });

  socket.on('SUB_DEVICE_UPDATED', function(data) {
    // eslint-disable-next-line no-console
    console.log('ON SUB_DEVICE_UPDATED: ');
    // eslint-disable-next-line no-console
    console.log(data);
  });

  socket.on('SUB_DEVICE_DELETED', function(data) {
    // eslint-disable-next-line no-console
    console.log('ON SUB_DEVICE_DELETED: ');
    // eslint-disable-next-line no-console
    console.log(data);
  });

  // SUB Device params events-----------------------------------------------------------------------------------------

  socket.on('SUB_DEVICE_PARAMS_CREATED', function(data) {
    // eslint-disable-next-line no-console
    console.log('ON SUB_DEVICE_PARAMS_CREATED: ');
    // eslint-disable-next-line no-console
    console.log(data);
  });

  socket.on('SUB_DEVICE_PARAMS_UPDATED', function(data) {
    // eslint-disable-next-line no-console
    console.log('ON SUB_DEVICE_PARAMS_UPDATED: ');
    // eslint-disable-next-line no-console
    console.log(data);
  });

  socket.on('SUB_DEVICE_PARAMS_DELETED', function(data) {
    // eslint-disable-next-line no-console
    console.log('ON SUB_DEVICE_PARAMS_DELETED: ');
    // eslint-disable-next-line no-console
    console.log(data);
  });

  // Connection succeeded
  socket.on('CONNECTED', function(data) {
    // eslint-disable-next-line no-console
    console.log('ON CONNECTED: ');
    // eslint-disable-next-line no-console
    console.log(data);
    dispatch({
      type: socketConstants.CONNECTED,
    });
  });

  // Connection succeeded
  socket.on('disconnect', function(data) {
    // eslint-disable-next-line no-console
    console.log('ON disconnect: ');
    // eslint-disable-next-line no-console
    console.log(data);
  });
};

const socketDisconnect = () => dispatch => {
  if (socket) {
    socket.disconnect();
  }
  dispatch({
    type: socketConstants.DISCONNECTED,
  });
};

export const socketActions = {
  socketInit,
  socketDisconnect,
};
