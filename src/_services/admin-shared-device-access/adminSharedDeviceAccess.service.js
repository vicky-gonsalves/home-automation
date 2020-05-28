import axios from 'axios';
import { userService } from '..';
import config from '../../config';

const handleResponse = response => {
  if (response && response.data) {
    return Promise.resolve(response.data);
  }
  return Promise.reject('No Data');
};

const handleDeletionResponse = response => {
  if (response && response.status === 204) {
    return Promise.resolve();
  }
  return Promise.reject('Server Error');
};

const handleError = error => {
  let err;
  if (error && error.response) {
    if (error.response.status === 401) {
      // auto logout if 401 response returned from api
      userService.signOutService();
    }
    err = (error.response.data && error.response.data.message) || error.response.statusText;
  } else {
    err = 'Network Error';
  }
  return Promise.reject(err);
};

const getSharedDeviceAccesses = async (deviceId, params) => {
  const _params = params;
  _params.deviceId = deviceId;
  try {
    const response = await axios.get(`${config.apiUrl}/shared-device-access`, { params: _params });
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

const getSharedDeviceAccess = async id => {
  try {
    const response = await axios.get(`${config.apiUrl}/shared-device-access/${id}`);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

const addSharedDeviceAccess = async params => {
  try {
    const response = await axios.post(`${config.apiUrl}/shared-device-access`, { ...params });
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

const updateSharedDeviceAccess = async (params, id) => {
  try {
    const response = await axios.patch(`${config.apiUrl}/shared-device-access/${id}`, { ...params });
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

const deleteSharedDeviceAccess = async id => {
  try {
    const response = await axios.delete(`${config.apiUrl}/shared-device-access/${id}`);
    return handleDeletionResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const adminSharedDeviceAccessService = {
  getSharedDeviceAccesses,
  getSharedDeviceAccess,
  addSharedDeviceAccess,
  updateSharedDeviceAccess,
  deleteSharedDeviceAccess,
};
