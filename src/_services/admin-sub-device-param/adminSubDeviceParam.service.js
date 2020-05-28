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

const getSubDeviceParams = async (deviceId, subDeviceId, params) => {
  try {
    const response = await axios.get(`${config.apiUrl}/devices/${deviceId}/sub-devices/${subDeviceId}/sub-device-params`, {
      params,
    });
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

const getSubDeviceParam = async (deviceId, subDeviceId, paramName) => {
  try {
    const response = await axios.get(
      `${config.apiUrl}/devices/${deviceId}/sub-devices/${subDeviceId}/sub-device-params/${paramName}`
    );
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

const addSubDeviceParam = async (params, deviceId, subDeviceId) => {
  try {
    const response = await axios.post(`${config.apiUrl}/devices/${deviceId}/sub-devices/${subDeviceId}/sub-device-params`, {
      ...params,
    });
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

const updateSubDeviceParam = async (params, deviceId, subDeviceId, paramName) => {
  try {
    const response = await axios.patch(
      `${config.apiUrl}/devices/${deviceId}/sub-devices/${subDeviceId}/sub-device-params/${paramName}`,
      { ...params }
    );
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

const deleteSubDeviceParam = async (deviceId, subDeviceId, paramName) => {
  try {
    const response = await axios.delete(
      `${config.apiUrl}/devices/${deviceId}/sub-devices/${subDeviceId}/sub-device-params/${paramName}`
    );
    return handleDeletionResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const adminSubDeviceParamService = {
  getSubDeviceParams,
  getSubDeviceParam,
  addSubDeviceParam,
  updateSubDeviceParam,
  deleteSubDeviceParam,
};
