import axios from 'axios';
import { userService } from '..';
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
      userService.signOutService();
    }
    err = (error.response.data && error.response.data.message) || error.response.statusText;
  } else {
    err = 'Network Error';
  }
  return Promise.reject(err);
};

const getUsers = async params => {
  try {
    const response = await axios.get(`${config.apiUrl}/users`, { params });
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

const getUser = async id => {
  try {
    const response = await axios.get(`${config.apiUrl}/users/${id}`);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

const addUser = async params => {
  try {
    const response = await axios.post(`${config.apiUrl}/users`, { ...params });
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

const updateUser = async (params, id) => {
  try {
    const response = await axios.patch(`${config.apiUrl}/users/${id}`, { ...params });
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const adminUserService = {
  getUsers,
  getUser,
  addUser,
  updateUser,
};
