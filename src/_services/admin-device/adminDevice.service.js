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

const getDevices = async params => {
  try {
    const response = await axios.get(`${config.apiUrl}/devices`, { params });
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

const getDevice = async id => {
  try {
    const response = await axios.get(`${config.apiUrl}/devices/${id}`);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

const addDevice = async params => {
  try {
    const response = await axios.post(`${config.apiUrl}/devices`, { ...params });
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

const updateDevice = async (params, id) => {
  try {
    const response = await axios.patch(`${config.apiUrl}/devices/${id}`, { ...params });
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

const deleteDevice = async id => {
  try {
    const response = await axios.delete(`${config.apiUrl}/devices/${id}`);
    return handleDeletionResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const adminDeviceService = {
  getDevices,
  getDevice,
  addDevice,
  updateDevice,
  deleteDevice,
};
