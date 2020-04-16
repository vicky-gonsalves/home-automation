import axios from 'axios';
import {
  deviceActions,
  deviceParamActions,
  deviceSettingActions,
  logActions,
  onlineDeviceActions,
  socketActions,
  subDeviceActions,
  subDeviceParamActions,
  subDeviceSettingActions,
  userActions,
} from '../../_actions';
import { sharedDeviceActions } from '../../_actions/shared-device/sharedDevice.actions';
import { userService } from '../../_services';
import config from '../../config';

const interceptRequests = () => {
  axios.interceptors.request.use(request => {
    request.headers.Authorization = `Bearer ${userService.getAccessToken()}`;
    return request;
  });
};

const disconnect = () => dispatch => {
  dispatch(userActions.signOut());
  dispatch(socketActions.socketDisconnect());
  dispatch(deviceActions.removeAllDevices());
  dispatch(sharedDeviceActions.removeAllSharedDevices());
  dispatch(subDeviceActions.removeAllSubDevices());
  dispatch(deviceParamActions.removeAllDeviceParams());
  dispatch(subDeviceParamActions.removeAllSubDeviceParams());
  dispatch(deviceSettingActions.removeAllSettings());
  dispatch(subDeviceSettingActions.removeAllSettings());
  dispatch(onlineDeviceActions.removeAllOnlineDevices());
  dispatch(logActions.removeAllLogs());
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
