import socketIOClient from 'socket.io-client';
import {
  deviceConstants,
  deviceParamConstants,
  deviceSettingConstants,
  logConstants,
  onlineDeviceConstants,
  sharedDeviceConstants,
  socketConstants,
  subDeviceConstants,
  subDeviceParamConstants,
  subDeviceSettingConstants,
} from '../../_constants';
import config from '../../config';

let socket;

const url = config.env === 'test' ? '' : /* istanbul ignore next */ config.socketUrl;

const socketInit = accessToken => dispatch => {
  dispatch({
    type: socketConstants.SOCKET_INIT,
  });
  const options = {
    query: { auth_token: accessToken },
  };
  socket = socketIOClient(url, options);

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
    dispatch({
      type: deviceConstants.DEVICE_CREATED,
      payload: data,
    });
  });

  socket.on('DEVICE_UPDATED', function(data) {
    // eslint-disable-next-line no-console
    console.log('ON DEVICE_UPDATED: ');
    // eslint-disable-next-line no-console
    console.log(data);
    dispatch({
      type: deviceConstants.DEVICE_UPDATED,
      payload: data,
    });
  });

  socket.on('DEVICE_DELETED', function(data) {
    // eslint-disable-next-line no-console
    console.log('ON DEVICE_DELETED: ');
    // eslint-disable-next-line no-console
    console.log(data);
    dispatch({
      type: deviceConstants.DEVICE_DELETED,
      payload: data,
    });
    dispatch({
      type: sharedDeviceConstants.SHARED_DEVICE_DELETED,
      payload: data,
    });
    dispatch({
      type: subDeviceConstants.PARENT_DEVICE_DELETED_FOR_SUB_DEVICE,
      payload: data,
    });
    dispatch({
      type: subDeviceParamConstants.PARENT_DEVICE_DELETED_FOR_SUB_DEVICE_PARAM,
      payload: data,
    });
    dispatch({
      type: deviceSettingConstants.PARENT_DEVICE_DELETED_FOR_DEVICE_SETTING,
      payload: data,
    });
    dispatch({
      type: subDeviceSettingConstants.PARENT_DEVICE_DELETED_FOR_SUB_DEVICE_SETTING,
      payload: data,
    });
    dispatch({
      type: onlineDeviceConstants.PARENT_DEVICE_DELETED_FOR_ONLINE_DEVICE,
      payload: data,
    });
    dispatch({
      type: deviceParamConstants.PARENT_DEVICE_DELETED_FOR_DEVICE_PARAM,
      payload: data,
    });
    dispatch({
      type: logConstants.PARENT_DEVICE_DELETED_FOR_LOG,
      payload: data,
    });
  });

  // Sub Device params events-----------------------------------------------------------------------------------------
  socket.on('SUB_DEVICE_CREATED', function(data) {
    // eslint-disable-next-line no-console
    console.log('ON SUB_DEVICE_CREATED: ');
    // eslint-disable-next-line no-console
    console.log(data);
    dispatch({
      type: subDeviceConstants.SUB_DEVICE_CREATED,
      payload: data,
    });
  });

  socket.on('SUB_DEVICE_UPDATED', function(data) {
    // eslint-disable-next-line no-console
    console.log('ON SUB_DEVICE_UPDATED: ');
    // eslint-disable-next-line no-console
    console.log(data);
    dispatch({
      type: subDeviceConstants.SUB_DEVICE_UPDATED,
      payload: data,
    });
  });

  socket.on('SUB_DEVICE_DELETED', function(data) {
    // eslint-disable-next-line no-console
    console.log('ON SUB_DEVICE_DELETED: ');
    // eslint-disable-next-line no-console
    console.log(data);
    dispatch({
      type: subDeviceConstants.SUB_DEVICE_DELETED,
      payload: data,
    });
    dispatch({
      type: subDeviceParamConstants.PARENT_SUB_DEVICE_DELETED_FOR_SUB_DEVICE_PARAM,
      payload: data,
    });
    dispatch({
      type: logConstants.PARENT_SUB_DEVICE_DELETED_FOR_LOG,
      payload: data,
    });
  });

  // SUB Device params events-----------------------------------------------------------------------------------------

  socket.on('SUB_DEVICE_PARAM_CREATED', function(data) {
    // eslint-disable-next-line no-console
    console.log('ON SUB_DEVICE_PARAM_CREATED: ');
    // eslint-disable-next-line no-console
    console.log(data);
    dispatch({
      type: subDeviceParamConstants.SUB_DEVICE_PARAM_CREATED,
      payload: data,
    });
  });

  socket.on('SUB_DEVICE_PARAM_UPDATED', function(data) {
    // eslint-disable-next-line no-console
    console.log('ON SUB_DEVICE_PARAM_UPDATED: ');
    // eslint-disable-next-line no-console
    console.log(data);
    dispatch({
      type: subDeviceParamConstants.SUB_DEVICE_PARAM_UPDATED,
      payload: data,
    });
  });

  socket.on('SUB_DEVICE_MULTI_PARAM_UPDATED', function(data) {
    // eslint-disable-next-line no-console
    console.log('ON SUB_DEVICE_MULTI_PARAM_UPDATED: ');
    // eslint-disable-next-line no-console
    console.log(data);
    dispatch({
      type: subDeviceParamConstants.SUB_DEVICE_MULTI_STATUS_UPDATED,
      payload: data,
    });
  });

  socket.on('SUB_DEVICE_PARAM_DELETED', function(data) {
    // eslint-disable-next-line no-console
    console.log('ON SUB_DEVICE_PARAM_DELETED: ');
    // eslint-disable-next-line no-console
    console.log(data);
    dispatch({
      type: subDeviceParamConstants.SUB_DEVICE_PARAM_DELETED,
      payload: data,
    });
  });

  // Device params events-----------------------------------------------------------------------------------------

  socket.on('DEVICE_PARAM_CREATED', function(data) {
    // eslint-disable-next-line no-console
    console.log('ON DEVICE_PARAM_CREATED: ');
    // eslint-disable-next-line no-console
    console.log(data);
    dispatch({
      type: deviceParamConstants.DEVICE_PARAM_CREATED,
      payload: data,
    });
  });

  socket.on('DEVICE_PARAM_UPDATED', function(data) {
    // eslint-disable-next-line no-console
    console.log('ON DEVICE_PARAM_UPDATED: ');
    // eslint-disable-next-line no-console
    console.log(data);
    dispatch({
      type: deviceParamConstants.DEVICE_PARAM_UPDATED,
      payload: data,
    });
  });

  socket.on('DEVICE_PARAM_DELETED', function(data) {
    // eslint-disable-next-line no-console
    console.log('ON DEVICE_PARAM_DELETED: ');
    // eslint-disable-next-line no-console
    console.log(data);
    dispatch({
      type: deviceParamConstants.DEVICE_PARAM_DELETED,
      payload: data,
    });
  });

  // Shared Device access events--------------------------------------------------------------------------------------

  socket.on('SHARED_DEVICE_ACCESS_CREATED', function(data) {
    // eslint-disable-next-line no-console
    console.log('ON SHARED_DEVICE_ACCESS_CREATED: ');
    // eslint-disable-next-line no-console
    console.log(data);
    dispatch({
      type: sharedDeviceConstants.SHARED_DEVICE_CREATED,
      payload: data,
    });
  });

  socket.on('SHARED_DEVICE_ACCESS_DELETED', function(data) {
    // eslint-disable-next-line no-console
    console.log('ON SHARED_DEVICE_ACCESS_DELETED: ');
    // eslint-disable-next-line no-console
    console.log(data);
    dispatch({
      type: sharedDeviceConstants.SHARED_DEVICE_DELETED,
      payload: data,
    });
    dispatch({
      type: subDeviceConstants.PARENT_DEVICE_DELETED_FOR_SUB_DEVICE,
      payload: data,
    });
    dispatch({
      type: subDeviceParamConstants.PARENT_DEVICE_DELETED_FOR_SUB_DEVICE_PARAM,
      payload: data,
    });
    dispatch({
      type: deviceSettingConstants.PARENT_DEVICE_DELETED_FOR_DEVICE_SETTING,
      payload: data,
    });
    dispatch({
      type: subDeviceSettingConstants.PARENT_DEVICE_DELETED_FOR_SUB_DEVICE_SETTING,
      payload: data,
    });
    dispatch({
      type: deviceParamConstants.PARENT_DEVICE_DELETED_FOR_DEVICE_PARAM,
      payload: data,
    });
    dispatch({
      type: logConstants.PARENT_DEVICE_DELETED_FOR_LOG,
      payload: data,
    });
  });

  // Device Settings--------------------------------------------------------------------------------------

  socket.on('DEVICE_SETTING_CREATED', function(data) {
    // eslint-disable-next-line no-console
    console.log('ON DEVICE_SETTING_CREATED: ');
    // eslint-disable-next-line no-console
    console.log(data);
    dispatch({
      type: deviceSettingConstants.DEVICE_SETTING_CREATED,
      payload: data,
    });
  });

  socket.on('DEVICE_SETTING_UPDATED', function(data) {
    // eslint-disable-next-line no-console
    console.log('ON DEVICE_SETTING_UPDATED: ');
    // eslint-disable-next-line no-console
    console.log(data);
    dispatch({
      type: deviceSettingConstants.DEVICE_SETTING_UPDATED,
      payload: data,
    });
  });

  socket.on('DEVICE_SETTING_DELETED', function(data) {
    // eslint-disable-next-line no-console
    console.log('ON DEVICE_SETTING_DELETED: ');
    // eslint-disable-next-line no-console
    console.log(data);
    dispatch({
      type: deviceSettingConstants.DEVICE_SETTING_DELETED,
      payload: data,
    });
  });

  socket.on('DEVICE_MULTI_SETTING_DELETED', function(data) {
    // eslint-disable-next-line no-console
    console.log('ON DEVICE_MULTI_SETTING_DELETED: ');
    // eslint-disable-next-line no-console
    console.log(data);
    dispatch({
      type: deviceSettingConstants.DEVICE_MULTI_SETTING_DELETED,
      payload: data,
    });
  });

  // Sub-Device Settings--------------------------------------------------------------------------------------

  socket.on('SUB_DEVICE_SETTING_CREATED', function(data) {
    // eslint-disable-next-line no-console
    console.log('ON SUB_DEVICE_SETTING_CREATED: ');
    // eslint-disable-next-line no-console
    console.log(data);
    dispatch({
      type: subDeviceSettingConstants.SUB_DEVICE_SETTING_CREATED,
      payload: data,
    });
  });

  socket.on('SUB_DEVICE_SETTING_UPDATED', function(data) {
    // eslint-disable-next-line no-console
    console.log('ON SUB_DEVICE_SETTING_UPDATED: ');
    // eslint-disable-next-line no-console
    console.log(data);
    dispatch({
      type: subDeviceSettingConstants.SUB_DEVICE_SETTING_UPDATED,
      payload: data,
    });
  });

  socket.on('SUB_DEVICE_MULTI_SETTING_DELETED', function(data) {
    // eslint-disable-next-line no-console
    console.log('ON SUB_DEVICE_MULTI_SETTING_DELETED: ');
    // eslint-disable-next-line no-console
    console.log(data);
    dispatch({
      type: subDeviceSettingConstants.SUB_DEVICE_MULTI_SETTING_DELETED,
      payload: data,
    });
  });

  socket.on('SUB_DEVICE_MULTI_SETTING_UPDATED', function(data) {
    // eslint-disable-next-line no-console
    console.log('ON SUB_DEVICE_MULTI_SETTING_UPDATED: ');
    // eslint-disable-next-line no-console
    console.log(data);
    dispatch({
      type: subDeviceSettingConstants.SUB_DEVICE_MULTI_SETTING_UPDATED,
      payload: data,
    });
  });

  // Online device status--------------------------------------------------------------------------------------

  socket.on('SOCKET_ID_CREATED', function(data) {
    // eslint-disable-next-line no-console
    console.log('ON SOCKET_ID_CREATED: ');
    // eslint-disable-next-line no-console
    console.log(data);
    dispatch({
      type: onlineDeviceConstants.ONLINE_DEVICE_CREATED,
      payload: data,
    });
  });

  socket.on('SOCKET_ID_DELETED', function(data) {
    // eslint-disable-next-line no-console
    console.log('ON SOCKET_ID_DELETED: ');
    // eslint-disable-next-line no-console
    console.log(data);
    dispatch({
      type: onlineDeviceConstants.ONLINE_DEVICE_DELETED,
      payload: data,
    });
  });

  // logs-------------------------------------------------------------------------------------------------------

  socket.on('LOG_CREATED', function(data) {
    // eslint-disable-next-line no-console
    console.log('ON LOG_CREATED: ');
    // eslint-disable-next-line no-console
    console.log(data);
    if (!data.isDevLog) {
      dispatch({
        type: logConstants.LOG_CREATED,
        payload: data,
      });
    }
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
