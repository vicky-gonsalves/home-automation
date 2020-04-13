import axios from 'axios';
import config from '../../config';

const getCurrentUser = () => {
  let currentUser;
  if (localStorage.getItem('user') !== null) {
    currentUser = JSON.parse(localStorage.getItem('user'));
  } else if (sessionStorage.getItem('user') !== null) {
    currentUser = JSON.parse(sessionStorage.getItem('user'));
  }
  return currentUser;
};

const getRefreshToken = () => {
  const user = getCurrentUser();
  if (user && user.tokens && user.tokens.refresh && user.tokens.refresh.token && user.tokens.refresh.expires) {
    return user.tokens.refresh.token;
  }
  return null;
};

const getAccessToken = () => {
  const user = getCurrentUser();
  if (user && user.tokens && user.tokens.access && user.tokens.access.token && user.tokens.access.expires) {
    return user.tokens.access.token;
  }
  return null;
};

const setNewTokens = tokens => {
  if (localStorage.getItem('user') !== null) {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    currentUser.tokens = tokens;
    localStorage.setItem('user', JSON.stringify(currentUser));
  } else if (sessionStorage.getItem('user') !== null) {
    const currentUser = JSON.parse(sessionStorage.getItem('user'));
    currentUser.tokens = tokens;
    sessionStorage.setItem('user', JSON.stringify(currentUser));
  }
};

const signOutService = () => {
  // remove user from local/Session storage to log user out
  localStorage.removeItem('user');
  sessionStorage.removeItem('user');
};

const handleResponse = (response, remember) => {
  if (response && response.data && response.data.user) {
    if (!remember) {
      sessionStorage.setItem('user', JSON.stringify(response.data));
    } else {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return Promise.resolve(response.data);
  }
  return Promise.reject('No Data');
};

const handleError = error => {
  let err;
  if (error && error.response) {
    if (error.response.status === 401) {
      // auto logout if 401 response returned from api
      signOutService();
    }
    err = (error.response.data && error.response.data.message) || error.response.statusText;
  } else {
    err = 'Network Error';
  }
  return Promise.reject(err);
};

const signInService = async (email, password, remember = false) => {
  try {
    const response = await axios.post(`${config.apiUrl}/auth/login`, { email, password }, { skipAuthRefresh: true });
    return handleResponse(response, remember);
  } catch (error) {
    return handleError(error);
  }
};

const getMe = async () => {
  try {
    return await axios.get(`${config.apiUrl}/auth/me`);
  } catch (error) {
    return handleError(error);
  }
};

export const userService = {
  signInService,
  signOutService,
  getCurrentUser,
  getMe,
  setNewTokens,
  getAccessToken,
  getRefreshToken,
};
