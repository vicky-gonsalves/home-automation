import axios from 'axios';
import { actions } from '../../_actions';
import config from '../../config';

const handleResponse = response => {
  if (response && response.data && response.data.devices && response.data.devices.myDevices) {
    return Promise.resolve(response.data.devices);
  }
  return Promise.reject(response);
};

const handleError = error => {
  let err;
  if (error && error.response) {
    if (error.response.status === 401) {
      // auto logout if 401 response returned from api
      actions.signOut();
    }
    err = (error.response.data && error.response.data.message) || error.response.statusText;
  } else {
    err = 'Network Error';
  }
  return Promise.reject(err);
};

const getMyDevices = async () => {
  try {
    const response = await axios.get(`${config.apiUrl}/me/devices`);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const deviceService = {
  getMyDevices,
};
