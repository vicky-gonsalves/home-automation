import axios from 'axios';
import { appActions, socketActions, userActions } from '../../_actions';
import { userService } from '../../_services';
import config from '../../config';

const interceptRequests = () => {
  axios.interceptors.request.use(request => {
    const token = userService.getAccessToken();
    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
  });
};

const disconnect = () => dispatch => {
  dispatch(userActions.signOut());
  dispatch(socketActions.socketDisconnect());
  dispatch(appActions.clearData());
};

const refreshAuthLogic = dispatch => failedRequest => {
  return axios
    .post(`${config.apiUrl}/auth/refresh-tokens`, { refreshToken: userService.getRefreshToken() }, { skipAuthRefresh: true })
    .then(response => {
      userService.setNewTokens(response.data);
      dispatch(userActions.setUserTokens(response.data));
      // eslint-disable-next-line no-param-reassign
      failedRequest.response.config.headers.Authorization = `Bearer ${response.data.access.token}`;
      return Promise.resolve();
    })
    .catch(e => {
      dispatch(disconnect());
      return Promise.reject(e);
    });
};

export const authInterceptor = {
  interceptRequests,
  refreshAuthLogic,
  disconnect,
};
