import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../../_reducers';
import { initialState } from '../../_utils';
import { deviceOne, deviceThree, deviceTwo } from '../../_utils/fixtures/device.fixture';
import { deviceParamOne } from '../../_utils/fixtures/deviceParam.fixture';
import { deviceSettingOne } from '../../_utils/fixtures/deviceSetting.fixture';
import { logOne } from '../../_utils/fixtures/log.fixture';
import { subDeviceOne, subDeviceTwo } from '../../_utils/fixtures/subDevice.fixture';
import { subDeviceParamOne } from '../../_utils/fixtures/subDeviceParam.fixture';
import { subDeviceSettingOne } from '../../_utils/fixtures/subDeviceSetting.fixture';
import { userOne } from '../../_utils/fixtures/user.fixture';
import { appActions } from './app.actions';

const testStore = initialState => {
  const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
  return createStoreWithMiddleware(rootReducer, initialState);
};

describe('appActions', () => {
  afterEach(() => {});

  it('should dispatch CLEAR_DATA action and reset the state', () => {
    const _initialState = {
      user: {
        name: userOne.name,
        email: userOne.email,
        remember: true,
        isLoggedIn: true,
        isFetching: true,
        tokens: { access: { token: '' } },
        loginError: 'Error',
        isAuthorized: true,
      },
      socket: {
        isSocketFetching: true,
        connected: true,
      },
      device: {
        isFetchingDevice: true,
        hasError: true,
        devices: [deviceOne, deviceTwo],
      },
      subDevice: {
        subDevices: [subDeviceOne, subDeviceTwo],
      },
      sharedDevice: {
        sharedDevices: [deviceThree],
      },
      subDeviceParam: {
        isFetching: true,
        subDeviceParamError: 'Error',
        subDeviceParams: [subDeviceParamOne],
      },
      settingDialog: {
        dialogType: 'tank',
        open: true,
        deviceId: 'someid',
        title: 'title',
      },
      deviceSetting: {
        isFetching: true,
        settingError: 'Error',
        deviceSettings: [deviceSettingOne],
      },
      subDeviceSetting: {
        isFetching: true,
        subDeviceSettingError: 'Error',
        subDeviceSettings: [subDeviceSettingOne],
      },
      onlineDevice: {
        onlineDevices: [deviceOne],
      },
      deviceParam: {
        deviceParams: [deviceParamOne],
      },
      log: {
        logs: [logOne],
      },
      adminDrawer: {
        open: true,
      },
      adminUser: {
        count: 1,
        isFetchingUsersList: false,
        users: [userOne],
      },
    };

    const store = testStore(_initialState);
    expect(store.getState()).toEqual(_initialState);
    store.dispatch(appActions.clearData());
    expect(store.getState()).toEqual(initialState);
  });
});
