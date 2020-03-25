import axios from 'axios';
import { actions } from '../../_actions';
import config from '../../config';

const handleResponse = response => {
  if (response && response.data) {
    return Promise.resolve(response.data);
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

const updateSubDeviceSettings = async settings => {
  try {
    const response = await axios.patch(`${config.apiUrl}/settings/multi`, settings);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const subDeviceSettingService = {
  updateSubDeviceSettings,
};
