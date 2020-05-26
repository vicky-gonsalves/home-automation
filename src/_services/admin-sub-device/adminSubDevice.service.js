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

const getSubDevices = async (deviceId, params) => {
  try {
    const response = await axios.get(`${config.apiUrl}/devices/${deviceId}/sub-devices`, { params });
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

const getSubDevice = async (deviceId, subDeviceId) => {
  try {
    const response = await axios.get(`${config.apiUrl}/devices/${deviceId}/sub-devices/${subDeviceId}`);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

const addSubDevice = async (params, deviceId) => {
  try {
    const response = await axios.post(`${config.apiUrl}/devices/${deviceId}/sub-devices`, { ...params });
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

const updateSubDevice = async (params, deviceId, subDeviceId) => {
  try {
    const response = await axios.patch(`${config.apiUrl}/devices/${deviceId}/sub-devices/${subDeviceId}`, { ...params });
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

const deleteSubDevice = async (deviceId, subDeviceId) => {
  try {
    const response = await axios.delete(`${config.apiUrl}/devices/${deviceId}/sub-devices/${subDeviceId}`);
    return handleDeletionResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const adminSubDeviceService = {
  getSubDevices,
  getSubDevice,
  addSubDevice,
  updateSubDevice,
  deleteSubDevice,
};
