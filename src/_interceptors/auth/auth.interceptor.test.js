import axios from 'axios';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { userService } from '../../_services';
import { getStateClone } from '../../_utils';
import config from '../../config';
import { authInterceptor } from './auth.interceptor';

jest.restoreAllMocks();

describe('interceptor', () => {
  const defaultTimeout = axios.defaults.timeout;
  beforeAll(() => {
    axios.defaults.timeout = 1;
  });
  afterAll(() => {
    axios.defaults.timeout = defaultTimeout;
  });
  it('should intercept GET http request', async () => {
    // eslint-disable-next-line no-console
    console.error = jest.fn();
    userService.getAccessToken = jest.fn().mockReturnValueOnce('someaccesstoken');
    authInterceptor.interceptRequests();
    try {
      await axios.get(`${config.apiUrl}/me/devices`);
    } catch (e) {
      expect(userService.getAccessToken).toHaveBeenCalled();
      userService.getAccessToken.mockClear();
      // eslint-disable-next-line no-console
      console.error.mockClear();
    }
  });

  it('should intercept POST http request', async () => {
    // eslint-disable-next-line no-console
    console.error = jest.fn();
    userService.getAccessToken = jest.fn().mockReturnValueOnce();
    authInterceptor.interceptRequests();
    try {
      await axios.post(`${config.apiUrl}/me/devices`);
    } catch (e) {
      expect(userService.getAccessToken).toHaveBeenCalled();
      userService.getAccessToken.mockClear();
      // eslint-disable-next-line no-console
      console.error.mockClear();
    }
  });

  it('should intercept PUT http request', async () => {
    // eslint-disable-next-line no-console
    console.error = jest.fn();
    userService.getAccessToken = jest.fn().mockReturnValueOnce();
    authInterceptor.interceptRequests();
    try {
      await axios.put(`${config.apiUrl}/me/devices`);
    } catch (e) {
      expect(userService.getAccessToken).toHaveBeenCalled();
      userService.getAccessToken.mockClear();
      // eslint-disable-next-line no-console
      console.error.mockClear();
    }
  });

  it('should intercept DELETE http request', async () => {
    // eslint-disable-next-line no-console
    console.error = jest.fn();
    userService.getAccessToken = jest.fn().mockReturnValueOnce();
    authInterceptor.interceptRequests();
    try {
      await axios.delete(`${config.apiUrl}/me/devices`);
    } catch (e) {
      expect(userService.getAccessToken).toHaveBeenCalled();
      userService.getAccessToken.mockClear();
      // eslint-disable-next-line no-console
      console.error.mockClear();
    }
  });

  it('should disconnect and dispatch actions', async () => {
    const mockStore = configureStore([thunk]);
    const store = mockStore(getStateClone());
    store.dispatch(authInterceptor.disconnect());
    expect(store.getActions()).toEqual([
      { type: 'SIGN_OUT' },
      { type: 'DISCONNECTED' },
      { type: 'DEVICE_REMOVE_ALL' },
      { type: 'SHARED_DEVICE_REMOVE_ALL' },
      { type: 'SUB_DEVICE_REMOVE_ALL' },
      { type: 'DEVICE_PARAM_REMOVE_ALL' },
      { type: 'SUB_DEVICE_PARAM_REMOVE_ALL' },
      { type: 'DEVICE_SETTING_REMOVE_ALL' },
      { type: 'SUB_DEVICE_SETTING_REMOVE_ALL' },
      { type: 'ONLINE_DEVICE_REMOVE_ALL' },
      { type: 'LOG_REMOVE_ALL' },
    ]);
  });

  it('should fail to get new access token if has no failedRequest and should disconnect', async () => {
    const mockStore = configureStore([thunk]);
    const store = mockStore(getStateClone());
    authInterceptor
      .refreshAuthLogic(store.dispatch)()
      .catch(() => {
        expect(store.getActions()).toEqual([
          { type: 'SIGN_OUT' },
          { type: 'DISCONNECTED' },
          { type: 'DEVICE_REMOVE_ALL' },
          { type: 'SHARED_DEVICE_REMOVE_ALL' },
          { type: 'SUB_DEVICE_REMOVE_ALL' },
          { type: 'DEVICE_PARAM_REMOVE_ALL' },
          { type: 'SUB_DEVICE_PARAM_REMOVE_ALL' },
          { type: 'DEVICE_SETTING_REMOVE_ALL' },
          { type: 'SUB_DEVICE_SETTING_REMOVE_ALL' },
          { type: 'ONLINE_DEVICE_REMOVE_ALL' },
          { type: 'LOG_REMOVE_ALL' },
        ]);
      });
  });

  /* Keep this test at the last always */
  it('should get new access token', async () => {
    // eslint-disable-next-line no-console
    console.error = jest.fn();
    userService.getRefreshToken = jest.fn().mockReturnValueOnce('refreshtoken');
    userService.setNewTokens = jest.fn();
    const mockStore = configureStore([thunk]);
    const store = mockStore(getStateClone());
    const spy = jest.spyOn(axios, 'post');
    spy.mockResolvedValueOnce({ data: { access: { token: 'accesstoken' } } });
    authInterceptor
      .refreshAuthLogic(store.dispatch)({ response: { config: { headers: {} } } })
      .then(() => {
        expect(store.getActions()).toEqual([
          { payload: { tokens: { access: { token: 'accesstoken' } } }, type: 'SET_USER_TOKENS' },
        ]);
        userService.getRefreshToken.mockClear();
        userService.setNewTokens.mockClear();
        spy.mockClear();
        // eslint-disable-next-line no-console
        console.error.mockClear();
      });
  });
});
