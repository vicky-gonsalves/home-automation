import axios from 'axios';
import { userActions } from '../../_actions';
import config from '../../config';

const handleResponse = response => {
  if (response && response.data) {
    return Promise.resolve(response.data);
  }
  return Promise.reject('No Data');
};

const handleError = error => {
  let err;
  if (error && error.response) {
    if (error.response.status === 401) {
      // auto logout if 401 response returned from api
      userActions.signOut();
    }
    err = (error.response.data && error.response.data.message) || error.response.statusText;
  } else {
    err = 'Network Error';
  }
  return Promise.reject(err);
};

const updateSettings = async settings => {
  try {
    const response = await axios.patch(`${config.apiUrl}/settings/multi`, settings);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const settingService = {
  updateSettings,
};
