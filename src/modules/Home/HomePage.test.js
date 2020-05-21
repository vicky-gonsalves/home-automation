import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import DeviceContextProvider from '../../_contexts/device/DeviceContext.provider';
import UserContextProvider from '../../_contexts/user/UserContext.provider';
import { history } from '../../_helpers/history/history';
import { checkProps, findByDataAttr, getStateClone, initialState } from '../../_utils';
import { deviceOne, deviceThree, deviceTwo } from '../../_utils/fixtures/device.fixture';
import HomePage from './HomePage';

jest.mock('axios');
jest.mock('../../_components/app-skeleton/AppSkeleton', () => () => <div>mock</div>);
jest.mock('../../_components/cards/smart-switch-card/SmartSwitchCard', () => () => <div>mock</div>);
jest.mock('../../_components/cards/tank-card/TankCard', () => () => <div>mock</div>);
jest.mock('../../_components/dialogs/setting-dialog/settingDialog', () => () => <div>mock</div>);

let wrapper;
let store;
const mockStore = configureStore([thunk]);
const props = {
  classes: {
    root: '',
    footer: '',
  },
  history,
  location: {},
  match: {},
};

const setupWrapper = (_initialState, _props) => {
  store = mockStore(_initialState);
  return mount(
    <Provider store={store}>
      <UserContextProvider>
        <DeviceContextProvider>
          <HomePage {..._props} />
        </DeviceContextProvider>
      </UserContextProvider>
    </Provider>
  );
};

describe('HomePage Component', () => {
  describe('Checking PropTypes', () => {
    it('should not throw a warning', () => {
      const propsErr = checkProps(HomePage, props);
      expect(propsErr).toBeUndefined();
    });
  });

  describe('Components Testing with State', () => {
    beforeEach(() => {});
    afterEach(() => {
      wrapper.unmount();
      if (store) {
        store.clearActions();
      }
    });

    it('should render or not render various components if no props and states', () => {
      // eslint-disable-next-line no-console
      console.error = jest.fn();
      const _props = {};
      wrapper = setupWrapper(initialState, _props);
      let component = findByDataAttr(wrapper, 'homePageContainer').first();
      expect(component.length).toBe(1);
      component = findByDataAttr(wrapper, 'appSkeletonComponent');
      expect(component.length).toBe(0);
      component = findByDataAttr(wrapper, 'noDeviceAlertComponent').first();
      expect(component.length).toBe(0);
      component = findByDataAttr(wrapper, 'deviceGridComponent').first();
      expect(component.length).toBe(1);
      component = findByDataAttr(wrapper, 'myTankCardComponent');
      expect(component.length).toBe(0);
      component = findByDataAttr(wrapper, 'mySmartSwitchCardComponent');
      expect(component.length).toBe(0);
      component = findByDataAttr(wrapper, 'sharedDeviceGridComponent');
      expect(component.length).toBe(0);
      component = findByDataAttr(wrapper, 'sharedTankCardComponent');
      expect(component.length).toBe(0);
      component = findByDataAttr(wrapper, 'myDeviceGridComponent');
      expect(component.length).toBe(0);
      component = findByDataAttr(wrapper, 'sharedDeviceGridComponent');
      expect(component.length).toBe(0);
      component = findByDataAttr(wrapper, 'settingDialogComponent');
      expect(component.length).toBe(0);
      // eslint-disable-next-line no-console
      console.error.mockClear();
    });

    it('should render or not render various components if having isFetchingDevice true', () => {
      const _initialState = getStateClone();
      _initialState.device.isFetchingDevice = true;
      wrapper = setupWrapper(_initialState, props);
      let component = findByDataAttr(wrapper, 'homePageContainer').first();
      expect(component.length).toBe(1);
      component = findByDataAttr(wrapper, 'appSkeletonComponent').first();
      expect(component.length).toBe(1);
      component = findByDataAttr(wrapper, 'noDeviceAlertComponent').first();
      expect(component.length).toBe(0);
      component = findByDataAttr(wrapper, 'deviceGridComponent').first();
      expect(component.length).toBe(1);
      component = findByDataAttr(wrapper, 'myDeviceGridComponent');
      expect(component.length).toBe(0);
      component = findByDataAttr(wrapper, 'myTankCardComponent');
      expect(component.length).toBe(0);
      component = findByDataAttr(wrapper, 'mySmartSwitchCardComponent');
      expect(component.length).toBe(0);
      component = findByDataAttr(wrapper, 'sharedDeviceGridComponent');
      expect(component.length).toBe(0);
      component = findByDataAttr(wrapper, 'sharedTankCardComponent');
      expect(component.length).toBe(0);
      component = findByDataAttr(wrapper, 'sharedDeviceGridComponent');
      expect(component.length).toBe(0);
      component = findByDataAttr(wrapper, 'settingDialogComponent');
      expect(component.length).toBe(0);
    });

    it('should render or not render various components if having isFetchingDevice false and devices state', () => {
      const _initialState = getStateClone();
      _initialState.device.isFetchingDevice = false;
      _initialState.device.devices = [];
      _initialState.sharedDevice.sharedDevices = [];
      wrapper = setupWrapper(_initialState, props);
      let component = findByDataAttr(wrapper, 'homePageContainer').first();
      expect(component.length).toBe(1);
      component = findByDataAttr(wrapper, 'appSkeletonComponent');
      expect(component.length).toBe(0);
      component = findByDataAttr(wrapper, 'noDeviceAlertComponent').first();
      expect(component.length).toBe(0);
      component = findByDataAttr(wrapper, 'deviceGridComponent').first();
      expect(component.length).toBe(1);
      component = findByDataAttr(wrapper, 'myTankCardComponent');
      expect(component.length).toBe(0);
      component = findByDataAttr(wrapper, 'mySmartSwitchCardComponent');
      expect(component.length).toBe(0);
      component = findByDataAttr(wrapper, 'sharedDeviceGridComponent');
      expect(component.length).toBe(0);
      component = findByDataAttr(wrapper, 'sharedTankCardComponent');
      expect(component.length).toBe(0);
      component = findByDataAttr(wrapper, 'sharedSmartSwitchCardComponent');
      expect(component.length).toBe(0);
      component = findByDataAttr(wrapper, 'myDeviceGridComponent');
      expect(component.length).toBe(0);
      component = findByDataAttr(wrapper, 'sharedDeviceGridComponent');
      expect(component.length).toBe(0);
      component = findByDataAttr(wrapper, 'settingDialogComponent');
      expect(component.length).toBe(0);
    });

    it('should render or not render various components if having isFetchingDevice true and devices state', () => {
      const _initialState = getStateClone();
      _initialState.device.isFetchingDevice = true;
      _initialState.device.devices = [deviceOne, deviceTwo];
      _initialState.sharedDevice.sharedDevices = [];
      wrapper = setupWrapper(_initialState, props);
      let component = findByDataAttr(wrapper, 'homePageContainer').first();
      expect(component.length).toBe(1);
      component = findByDataAttr(wrapper, 'appSkeletonComponent').first();
      expect(component.length).toBe(1);
      component = findByDataAttr(wrapper, 'noDeviceAlertComponent').first();
      expect(component.length).toBe(0);
      component = findByDataAttr(wrapper, 'deviceGridComponent').first();
      expect(component.length).toBe(1);
      component = findByDataAttr(wrapper, 'myTankCardComponent').first();
      expect(component.length).toBe(0);
      component = findByDataAttr(wrapper, 'mySmartSwitchCardComponent').first();
      expect(component.length).toBe(0);
      component = findByDataAttr(wrapper, 'sharedDeviceGridComponent');
      expect(component.length).toBe(0);
      component = findByDataAttr(wrapper, 'sharedTankCardComponent');
      expect(component.length).toBe(0);
      component = findByDataAttr(wrapper, 'sharedSmartSwitchCardComponent');
      expect(component.length).toBe(0);
      component = findByDataAttr(wrapper, 'myDeviceGridComponent').first();
      expect(component.length).toBe(0);
      component = findByDataAttr(wrapper, 'sharedDeviceGridComponent');
      expect(component.length).toBe(0);
      component = findByDataAttr(wrapper, 'settingDialogComponent').first();
      expect(component.length).toBe(1);
    });

    it('should render or not render various components if having isFetchingDevice false and sharedDevice state', () => {
      const _initialState = getStateClone();
      _initialState.device.isFetchingDevice = false;
      _initialState.device.devices = [];
      _initialState.sharedDevice.sharedDevices = [];
      wrapper = setupWrapper(_initialState, props);
      let component = findByDataAttr(wrapper, 'homePageContainer').first();
      expect(component.length).toBe(1);
      component = findByDataAttr(wrapper, 'appSkeletonComponent');
      expect(component.length).toBe(0);
      component = findByDataAttr(wrapper, 'noDeviceAlertComponent').first();
      expect(component.length).toBe(0);
      component = findByDataAttr(wrapper, 'deviceGridComponent').first();
      expect(component.length).toBe(1);
      component = findByDataAttr(wrapper, 'myTankCardComponent');
      expect(component.length).toBe(0);
      component = findByDataAttr(wrapper, 'mySmartSwitchCardComponent');
      expect(component.length).toBe(0);
      component = findByDataAttr(wrapper, 'sharedDeviceGridComponent');
      expect(component.length).toBe(0);
      component = findByDataAttr(wrapper, 'sharedTankCardComponent');
      expect(component.length).toBe(0);
      component = findByDataAttr(wrapper, 'sharedSmartSwitchCardComponent');
      expect(component.length).toBe(0);
      component = findByDataAttr(wrapper, 'myDeviceGridComponent');
      expect(component.length).toBe(0);
      component = findByDataAttr(wrapper, 'sharedDeviceGridComponent');
      expect(component.length).toBe(0);
      component = findByDataAttr(wrapper, 'settingDialogComponent');
      expect(component.length).toBe(0);
    });

    it('should render or not render various components if having isFetchingDevice true and sharedDevice state', () => {
      const _initialState = getStateClone();
      _initialState.device.isFetchingDevice = true;
      _initialState.device.devices = [];
      _initialState.sharedDevice.sharedDevices = [deviceOne, deviceTwo];
      wrapper = setupWrapper(_initialState, props);
      let component = findByDataAttr(wrapper, 'homePageContainer').first();
      expect(component.length).toBe(1);
      component = findByDataAttr(wrapper, 'appSkeletonComponent').first();
      expect(component.length).toBe(1);
      component = findByDataAttr(wrapper, 'noDeviceAlertComponent').first();
      expect(component.length).toBe(0);
      component = findByDataAttr(wrapper, 'deviceGridComponent').first();
      expect(component.length).toBe(1);
      component = findByDataAttr(wrapper, 'myTankCardComponent');
      expect(component.length).toBe(0);
      component = findByDataAttr(wrapper, 'mySmartSwitchCardComponent');
      expect(component.length).toBe(0);
      component = findByDataAttr(wrapper, 'sharedDeviceGridComponent').first();
      expect(component.length).toBe(0);
      component = findByDataAttr(wrapper, 'sharedTankCardComponent').first();
      expect(component.length).toBe(0);
      component = findByDataAttr(wrapper, 'sharedSmartSwitchCardComponent').first();
      expect(component.length).toBe(0);
      component = findByDataAttr(wrapper, 'myDeviceGridComponent');
      expect(component.length).toBe(0);
      component = findByDataAttr(wrapper, 'sharedDeviceGridComponent').first();
      expect(component.length).toBe(0);
      component = findByDataAttr(wrapper, 'settingDialogComponent').first();
      expect(component.length).toBe(1);
    });

    // it('should get myDevices if not hasFetchedDevices and not isFetchingDevice and is connected to Socket and  isLoggedIn or isAuthorized', () => {
    //   const _initialState = getStateClone();
    //   _initialState.device.hasFetchedDevices = false;
    //   _initialState.device.isFetchingDevice = false;
    //   _initialState.socket.connected = true;
    //   _initialState.user.isLoggedIn = true;
    //   _initialState.user.isAuthorized = true;
    //   wrapper = setupWrapper(_initialState, props);
    //   expect(store.getActions()).toEqual([
    //     { payload: true, type: 'DEVICE_UPDATE_FETCHING' },
    //     { payload: true, type: 'SET_FETCHED_DEVICES' },
    //   ]);
    // });
    //
    // it('should get myDevices if not hasFetchedDevices and not isFetchingDevice and is connected to Socket and either isLoggedIn or isAuthorized', () => {
    //   const _initialState = getStateClone();
    //   _initialState.device.hasFetchedDevices = false;
    //   _initialState.device.isFetchingDevice = false;
    //   _initialState.socket.connected = true;
    //   _initialState.user.isLoggedIn = true;
    //   _initialState.user.isAuthorized = false;
    //   wrapper = setupWrapper(_initialState, props);
    //   expect(store.getActions()).toEqual([
    //     { payload: true, type: 'DEVICE_UPDATE_FETCHING' },
    //     { payload: true, type: 'SET_FETCHED_DEVICES' },
    //   ]);
    // });
    //
    // it('should get myDevices if not hasFetchedDevices and not isFetchingDevice and is connected to Socket and either isAuthorized or isLoggedIn', () => {
    //   const _initialState = getStateClone();
    //   _initialState.device.hasFetchedDevices = false;
    //   _initialState.device.isFetchingDevice = false;
    //   _initialState.socket.connected = true;
    //   _initialState.user.isLoggedIn = false;
    //   _initialState.user.isAuthorized = true;
    //   wrapper = setupWrapper(_initialState, props);
    //   expect(store.getActions()).toEqual([
    //     { payload: true, type: 'DEVICE_UPDATE_FETCHING' },
    //     { payload: true, type: 'SET_FETCHED_DEVICES' },
    //   ]);
    // });

    it('should not get myDevices if not connected to socket', () => {
      const _initialState = getStateClone();
      _initialState.device.hasFetchedDevices = false;
      _initialState.device.isFetchingDevice = false;
      _initialState.socket.connected = false;
      _initialState.user.isLoggedIn = true;
      _initialState.user.isAuthorized = true;
      wrapper = setupWrapper(_initialState, props);
      expect(store.getActions()).toHaveLength(0);
    });

    it('should not get myDevices if not authorized and not isLoggedIn', () => {
      const _initialState = getStateClone();
      _initialState.device.hasFetchedDevices = true;
      _initialState.device.isFetchingDevice = true;
      _initialState.socket.connected = true;
      _initialState.user.isLoggedIn = false;
      _initialState.user.isAuthorized = false;
      wrapper = setupWrapper(_initialState, props);
      expect(store.getActions()).toHaveLength(0);
    });

    it('should render noDeviceAlertComponent if not isFetchingDevice and no devices and no sharedDevices and hasFetchedDevices', () => {
      const _initialState = getStateClone();
      _initialState.user.hasFetchedDevices = true;
      _initialState.device.isFetchingDevice = false;
      _initialState.device.devices = [];
      _initialState.sharedDevice.sharedDevices = [];
      _initialState.socket.connected = true;
      _initialState.user.isLoggedIn = true;
      _initialState.user.isAuthorized = true;
      wrapper = setupWrapper(_initialState, props);
      const component = findByDataAttr(wrapper, 'noDeviceAlertComponent').first();
      expect(component).toHaveLength(1);
    });

    it('should not render noDeviceAlertComponent if isFetchingDevice and no devices and no sharedDevices and hasFetchedDevices', () => {
      const _initialState = getStateClone();
      _initialState.user.hasFetchedDevices = true;
      _initialState.device.isFetchingDevice = true;
      _initialState.device.devices = [];
      _initialState.sharedDevice.sharedDevices = [];
      _initialState.socket.connected = true;
      _initialState.user.isLoggedIn = true;
      _initialState.user.isAuthorized = true;
      wrapper = setupWrapper(_initialState, props);
      const component = findByDataAttr(wrapper, 'noDeviceAlertComponent');
      expect(component).toHaveLength(0);
    });

    it('should not render noDeviceAlertComponent if isFetchingDevice and has devices and no sharedDevices and hasFetchedDevices', () => {
      const _initialState = getStateClone();
      _initialState.user.hasFetchedDevices = true;
      _initialState.device.isFetchingDevice = true;
      _initialState.device.devices = [deviceOne, deviceTwo];
      _initialState.sharedDevice.sharedDevices = [];
      _initialState.socket.connected = true;
      _initialState.user.isLoggedIn = true;
      _initialState.user.isAuthorized = true;
      wrapper = setupWrapper(_initialState, props);
      const component = findByDataAttr(wrapper, 'noDeviceAlertComponent');
      expect(component).toHaveLength(0);
    });

    it('should not render noDeviceAlertComponent if isFetchingDevice and has devices and sharedDevices and hasFetchedDevices', () => {
      const _initialState = getStateClone();
      _initialState.user.hasFetchedDevices = true;
      _initialState.device.isFetchingDevice = true;
      _initialState.device.devices = [deviceOne, deviceTwo];
      _initialState.sharedDevice.sharedDevices = [deviceThree];
      _initialState.socket.connected = true;
      _initialState.user.isLoggedIn = true;
      _initialState.user.isAuthorized = true;
      wrapper = setupWrapper(_initialState, props);
      const component = findByDataAttr(wrapper, 'noDeviceAlertComponent');
      expect(component).toHaveLength(0);
    });

    it('should not render noDeviceAlertComponent if isFetchingDevice and has devices and sharedDevices and not hasFetchedDevices', () => {
      const _initialState = getStateClone();
      _initialState.user.hasFetchedDevices = false;
      _initialState.device.isFetchingDevice = true;
      _initialState.device.devices = [deviceOne, deviceTwo];
      _initialState.sharedDevice.sharedDevices = [deviceThree];
      _initialState.socket.connected = true;
      _initialState.user.isLoggedIn = true;
      _initialState.user.isAuthorized = true;
      wrapper = setupWrapper(_initialState, props);
      const component = findByDataAttr(wrapper, 'noDeviceAlertComponent');
      expect(component).toHaveLength(0);
    });

    it('should not render noDeviceAlertComponent if not isFetchingDevice and has devices and sharedDevices and hasFetchedDevices and not isAuthorized and not isLoggedIn', () => {
      const _initialState = getStateClone();
      _initialState.user.hasFetchedDevices = true;
      _initialState.device.isFetchingDevice = false;
      _initialState.device.devices = [deviceOne, deviceTwo];
      _initialState.sharedDevice.sharedDevices = [deviceThree];
      _initialState.socket.connected = false;
      _initialState.user.isLoggedIn = false;
      _initialState.user.isAuthorized = false;
      wrapper = setupWrapper(_initialState, props);
      const component = findByDataAttr(wrapper, 'noDeviceAlertComponent');
      expect(component).toHaveLength(0);
    });

    it('should render myDeviceGridComponent if not isFetchingDevice and hasFetchedDevices and has devices', () => {
      const _initialState = getStateClone();
      _initialState.user.hasFetchedDevices = true;
      _initialState.device.isFetchingDevice = false;
      _initialState.device.devices = [deviceOne, deviceTwo];
      _initialState.socket.connected = true;
      _initialState.user.isLoggedIn = true;
      _initialState.user.isAuthorized = true;
      wrapper = setupWrapper(_initialState, props);
      const component = findByDataAttr(wrapper, 'myDeviceGridComponent');
      expect(component.length).toBeTruthy();
    });

    it('should not render myDeviceGridComponent if isFetchingDevice and hasFetchedDevices and has devices', () => {
      const _initialState = getStateClone();
      _initialState.user.hasFetchedDevices = true;
      _initialState.device.isFetchingDevice = true;
      _initialState.device.devices = [deviceOne, deviceTwo];
      _initialState.socket.connected = true;
      _initialState.user.isLoggedIn = true;
      _initialState.user.isAuthorized = true;
      wrapper = setupWrapper(_initialState, props);
      const component = findByDataAttr(wrapper, 'myDeviceGridComponent');
      expect(component).toHaveLength(0);
    });

    it('should not render myDeviceGridComponent if isFetchingDevice and not hasFetchedDevices and has devices', () => {
      const _initialState = getStateClone();
      _initialState.user.hasFetchedDevices = false;
      _initialState.device.isFetchingDevice = true;
      _initialState.device.devices = [deviceOne, deviceTwo];
      _initialState.socket.connected = true;
      _initialState.user.isLoggedIn = true;
      _initialState.user.isAuthorized = true;
      wrapper = setupWrapper(_initialState, props);
      const component = findByDataAttr(wrapper, 'myDeviceGridComponent');
      expect(component).toHaveLength(0);
    });

    it('should not render myDeviceGridComponent if isFetchingDevice and hasFetchedDevices and has no devices', () => {
      const _initialState = getStateClone();
      _initialState.user.hasFetchedDevices = false;
      _initialState.device.isFetchingDevice = true;
      _initialState.device.devices = [];
      _initialState.socket.connected = true;
      _initialState.user.isLoggedIn = true;
      _initialState.user.isAuthorized = true;
      wrapper = setupWrapper(_initialState, props);
      const component = findByDataAttr(wrapper, 'myDeviceGridComponent');
      expect(component).toHaveLength(0);
    });

    it('should render sharedDeviceGridComponent if not isFetchingDevice and hasFetchedDevices and has sharedDevices', () => {
      const _initialState = getStateClone();
      _initialState.user.hasFetchedDevices = true;
      _initialState.device.isFetchingDevice = false;
      _initialState.sharedDevice.sharedDevices = [deviceOne, deviceTwo];
      _initialState.socket.connected = true;
      _initialState.user.isLoggedIn = true;
      _initialState.user.isAuthorized = true;
      wrapper = setupWrapper(_initialState, props);
      const component = findByDataAttr(wrapper, 'sharedDeviceGridComponent');
      expect(component.length).toBeTruthy();
    });

    it('should not render sharedDeviceGridComponent if isFetchingDevice and hasFetchedDevices and has sharedDevices', () => {
      const _initialState = getStateClone();
      _initialState.user.hasFetchedDevices = true;
      _initialState.device.isFetchingDevice = true;
      _initialState.sharedDevice.sharedDevices = [deviceOne, deviceTwo];
      _initialState.socket.connected = true;
      _initialState.user.isLoggedIn = true;
      _initialState.user.isAuthorized = true;
      wrapper = setupWrapper(_initialState, props);
      const component = findByDataAttr(wrapper, 'sharedDeviceGridComponent');
      expect(component).toHaveLength(0);
    });

    it('should not render sharedDeviceGridComponent if isFetchingDevice and not hasFetchedDevices and has sharedDevices', () => {
      const _initialState = getStateClone();
      _initialState.user.hasFetchedDevices = false;
      _initialState.device.isFetchingDevice = true;
      _initialState.sharedDevice.sharedDevices = [deviceOne, deviceTwo];
      _initialState.socket.connected = true;
      _initialState.user.isLoggedIn = true;
      _initialState.user.isAuthorized = true;
      wrapper = setupWrapper(_initialState, props);
      const component = findByDataAttr(wrapper, 'sharedDeviceGridComponent');
      expect(component).toHaveLength(0);
    });

    it('should not render sharedDeviceGridComponent if isFetchingDevice and hasFetchedDevices and has no sharedDevices', () => {
      const _initialState = getStateClone();
      _initialState.user.hasFetchedDevices = true;
      _initialState.device.isFetchingDevice = true;
      _initialState.sharedDevice.sharedDevices = [];
      _initialState.socket.connected = true;
      _initialState.user.isLoggedIn = true;
      _initialState.user.isAuthorized = true;
      wrapper = setupWrapper(_initialState, props);
      const component = findByDataAttr(wrapper, 'sharedDeviceGridComponent');
      expect(component).toHaveLength(0);
    });

    it('should render myTankCardComponent if not isFetchingDevice and hasFetchedDevices and has devices and device variant is tank', () => {
      const _initialState = getStateClone();
      _initialState.user.hasFetchedDevices = true;
      _initialState.device.isFetchingDevice = false;
      _initialState.device.devices = [deviceOne];
      _initialState.socket.connected = true;
      _initialState.user.isLoggedIn = true;
      _initialState.user.isAuthorized = true;
      wrapper = setupWrapper(_initialState, props);
      const component = findByDataAttr(wrapper, 'myTankCardComponent');
      expect(component.length).toBeTruthy();
    });

    it('should not render myTankCardComponent if not isFetchingDevice and hasFetchedDevices and has devices and device variant is not tank', () => {
      const _initialState = getStateClone();
      _initialState.user.hasFetchedDevices = true;
      _initialState.device.isFetchingDevice = false;
      _initialState.device.devices = [deviceTwo];
      _initialState.socket.connected = true;
      _initialState.user.isLoggedIn = true;
      _initialState.user.isAuthorized = true;
      wrapper = setupWrapper(_initialState, props);
      const component = findByDataAttr(wrapper, 'myTankCardComponent');
      expect(component).toHaveLength(0);
    });

    it('should not render myTankCardComponent if isFetchingDevice and hasFetchedDevices and has devices and device variant is tank', () => {
      const _initialState = getStateClone();
      _initialState.user.hasFetchedDevices = true;
      _initialState.device.isFetchingDevice = true;
      _initialState.device.devices = [deviceOne];
      _initialState.socket.connected = true;
      _initialState.user.isLoggedIn = true;
      _initialState.user.isAuthorized = true;
      wrapper = setupWrapper(_initialState, props);
      const component = findByDataAttr(wrapper, 'myTankCardComponent');
      expect(component).toHaveLength(0);
    });

    it('should not render myTankCardComponent if isFetchingDevice and not hasFetchedDevices and has devices and device variant is tank', () => {
      const _initialState = getStateClone();
      _initialState.user.hasFetchedDevices = false;
      _initialState.device.isFetchingDevice = true;
      _initialState.device.devices = [deviceOne];
      _initialState.socket.connected = true;
      _initialState.user.isLoggedIn = true;
      _initialState.user.isAuthorized = true;
      wrapper = setupWrapper(_initialState, props);
      const component = findByDataAttr(wrapper, 'myTankCardComponent');
      expect(component).toHaveLength(0);
    });

    it('should not render myTankCardComponent if isFetchingDevice and not hasFetchedDevices and has no devices', () => {
      const _initialState = getStateClone();
      _initialState.user.hasFetchedDevices = false;
      _initialState.device.isFetchingDevice = true;
      _initialState.device.devices = [];
      _initialState.socket.connected = true;
      _initialState.user.isLoggedIn = true;
      _initialState.user.isAuthorized = true;
      wrapper = setupWrapper(_initialState, props);
      const component = findByDataAttr(wrapper, 'myTankCardComponent');
      expect(component).toHaveLength(0);
    });

    it('should render mySmartSwitchCardComponent if not isFetchingDevice and hasFetchedDevices and has devices and device variant is smartSwitch', () => {
      const _initialState = getStateClone();
      _initialState.user.hasFetchedDevices = true;
      _initialState.device.isFetchingDevice = false;
      _initialState.device.devices = [deviceTwo];
      _initialState.socket.connected = true;
      _initialState.user.isLoggedIn = true;
      _initialState.user.isAuthorized = true;
      wrapper = setupWrapper(_initialState, props);
      const component = findByDataAttr(wrapper, 'mySmartSwitchCardComponent');
      expect(component.length).toBeTruthy();
    });

    it('should not render mySmartSwitchCardComponent if not isFetchingDevice and hasFetchedDevices and has devices and device variant is not smartSwitch', () => {
      const _initialState = getStateClone();
      _initialState.user.hasFetchedDevices = true;
      _initialState.device.isFetchingDevice = false;
      _initialState.device.devices = [deviceOne];
      _initialState.socket.connected = true;
      _initialState.user.isLoggedIn = true;
      _initialState.user.isAuthorized = true;
      wrapper = setupWrapper(_initialState, props);
      const component = findByDataAttr(wrapper, 'mySmartSwitchCardComponent');
      expect(component).toHaveLength(0);
    });

    it('should not render mySmartSwitchCardComponent if isFetchingDevice and hasFetchedDevices and has devices and device variant is smartSwitch', () => {
      const _initialState = getStateClone();
      _initialState.user.hasFetchedDevices = true;
      _initialState.device.isFetchingDevice = true;
      _initialState.device.devices = [deviceTwo];
      _initialState.socket.connected = true;
      _initialState.user.isLoggedIn = true;
      _initialState.user.isAuthorized = true;
      wrapper = setupWrapper(_initialState, props);
      const component = findByDataAttr(wrapper, 'mySmartSwitchCardComponent');
      expect(component).toHaveLength(0);
    });

    it('should not render mySmartSwitchCardComponent if isFetchingDevice and not hasFetchedDevices and has devices and device variant is smartSwitch', () => {
      const _initialState = getStateClone();
      _initialState.user.hasFetchedDevices = false;
      _initialState.device.isFetchingDevice = true;
      _initialState.device.devices = [deviceTwo];
      _initialState.socket.connected = true;
      _initialState.user.isLoggedIn = true;
      _initialState.user.isAuthorized = true;
      wrapper = setupWrapper(_initialState, props);
      const component = findByDataAttr(wrapper, 'mySmartSwitchCardComponent');
      expect(component).toHaveLength(0);
    });

    it('should not render mySmartSwitchCardComponent if isFetchingDevice and not hasFetchedDevices and has no device', () => {
      const _initialState = getStateClone();
      _initialState.user.hasFetchedDevices = false;
      _initialState.device.isFetchingDevice = true;
      _initialState.device.devices = [];
      _initialState.socket.connected = true;
      _initialState.user.isLoggedIn = true;
      _initialState.user.isAuthorized = true;
      wrapper = setupWrapper(_initialState, props);
      const component = findByDataAttr(wrapper, 'mySmartSwitchCardComponent');
      expect(component).toHaveLength(0);
    });

    it('should render sharedTankCardComponent if not isFetchingDevice and hasFetchedDevices and has sharedDevices and device variant is tank', () => {
      const _initialState = getStateClone();
      _initialState.user.hasFetchedDevices = true;
      _initialState.device.isFetchingDevice = false;
      _initialState.sharedDevice.sharedDevices = [deviceOne];
      _initialState.socket.connected = true;
      _initialState.user.isLoggedIn = true;
      _initialState.user.isAuthorized = true;
      wrapper = setupWrapper(_initialState, props);
      const component = findByDataAttr(wrapper, 'sharedTankCardComponent');
      expect(component.length).toBeTruthy();
    });

    it('should not render sharedTankCardComponent if not isFetchingDevice and hasFetchedDevices and has sharedDevices and device variant is not tank', () => {
      const _initialState = getStateClone();
      _initialState.user.hasFetchedDevices = true;
      _initialState.device.isFetchingDevice = false;
      _initialState.sharedDevice.sharedDevices = [deviceTwo];
      _initialState.socket.connected = true;
      _initialState.user.isLoggedIn = true;
      _initialState.user.isAuthorized = true;
      wrapper = setupWrapper(_initialState, props);
      const component = findByDataAttr(wrapper, 'sharedTankCardComponent');
      expect(component).toHaveLength(0);
    });

    it('should not render sharedTankCardComponent if isFetchingDevice and hasFetchedDevices and has sharedDevices and device variant is tank', () => {
      const _initialState = getStateClone();
      _initialState.user.hasFetchedDevices = true;
      _initialState.device.isFetchingDevice = true;
      _initialState.sharedDevice.sharedDevices = [deviceOne];
      _initialState.socket.connected = true;
      _initialState.user.isLoggedIn = true;
      _initialState.user.isAuthorized = true;
      wrapper = setupWrapper(_initialState, props);
      const component = findByDataAttr(wrapper, 'sharedTankCardComponent');
      expect(component).toHaveLength(0);
    });

    it('should not render sharedTankCardComponent if isFetchingDevice and not hasFetchedDevices and has sharedDevices and device variant is tank', () => {
      const _initialState = getStateClone();
      _initialState.user.hasFetchedDevices = false;
      _initialState.device.isFetchingDevice = true;
      _initialState.sharedDevice.sharedDevices = [deviceOne];
      _initialState.socket.connected = true;
      _initialState.user.isLoggedIn = true;
      _initialState.user.isAuthorized = true;
      wrapper = setupWrapper(_initialState, props);
      const component = findByDataAttr(wrapper, 'sharedTankCardComponent');
      expect(component).toHaveLength(0);
    });

    it('should not render sharedTankCardComponent if isFetchingDevice and not hasFetchedDevices and has no sharedDevices', () => {
      const _initialState = getStateClone();
      _initialState.user.hasFetchedDevices = false;
      _initialState.device.isFetchingDevice = true;
      _initialState.sharedDevice.sharedDevices = [];
      _initialState.socket.connected = true;
      _initialState.user.isLoggedIn = true;
      _initialState.user.isAuthorized = true;
      wrapper = setupWrapper(_initialState, props);
      const component = findByDataAttr(wrapper, 'sharedTankCardComponent');
      expect(component).toHaveLength(0);
    });

    it('should render sharedSmartSwitchCardComponent if not isFetchingDevice and hasFetchedDevices and has sharedDevices and device variant is smartSwitch', () => {
      const _initialState = getStateClone();
      _initialState.user.hasFetchedDevices = true;
      _initialState.device.isFetchingDevice = false;
      _initialState.sharedDevice.sharedDevices = [deviceTwo];
      _initialState.socket.connected = true;
      _initialState.user.isLoggedIn = true;
      _initialState.user.isAuthorized = true;
      wrapper = setupWrapper(_initialState, props);
      const component = findByDataAttr(wrapper, 'sharedSmartSwitchCardComponent');
      expect(component.length).toBeTruthy();
    });

    it('should not render sharedSmartSwitchCardComponent if not isFetchingDevice and hasFetchedDevices and has sharedDevices and device variant is not smartSwitch', () => {
      const _initialState = getStateClone();
      _initialState.user.hasFetchedDevices = true;
      _initialState.device.isFetchingDevice = false;
      _initialState.sharedDevice.sharedDevices = [deviceOne];
      _initialState.socket.connected = true;
      _initialState.user.isLoggedIn = true;
      _initialState.user.isAuthorized = true;
      wrapper = setupWrapper(_initialState, props);
      const component = findByDataAttr(wrapper, 'sharedSmartSwitchCardComponent');
      expect(component).toHaveLength(0);
    });

    it('should not render sharedSmartSwitchCardComponent if isFetchingDevice and hasFetchedDevices and has sharedDevices and device variant is smartSwitch', () => {
      const _initialState = getStateClone();
      _initialState.user.hasFetchedDevices = true;
      _initialState.device.isFetchingDevice = true;
      _initialState.sharedDevice.sharedDevices = [deviceTwo];
      _initialState.socket.connected = true;
      _initialState.user.isLoggedIn = true;
      _initialState.user.isAuthorized = true;
      wrapper = setupWrapper(_initialState, props);
      const component = findByDataAttr(wrapper, 'sharedSmartSwitchCardComponent');
      expect(component).toHaveLength(0);
    });

    it('should not render sharedSmartSwitchCardComponent if isFetchingDevice and not hasFetchedDevices and has sharedDevices and device variant is smartSwitch', () => {
      const _initialState = getStateClone();
      _initialState.user.hasFetchedDevices = false;
      _initialState.device.isFetchingDevice = true;
      _initialState.sharedDevice.sharedDevices = [deviceTwo];
      _initialState.socket.connected = true;
      _initialState.user.isLoggedIn = true;
      _initialState.user.isAuthorized = true;
      wrapper = setupWrapper(_initialState, props);
      const component = findByDataAttr(wrapper, 'sharedSmartSwitchCardComponent');
      expect(component).toHaveLength(0);
    });

    it('should not render sharedSmartSwitchCardComponent if isFetchingDevice and not hasFetchedDevices and has no sharedDevices', () => {
      const _initialState = getStateClone();
      _initialState.user.hasFetchedDevices = false;
      _initialState.device.isFetchingDevice = true;
      _initialState.sharedDevice.sharedDevices = [];
      _initialState.socket.connected = true;
      _initialState.user.isLoggedIn = true;
      _initialState.user.isAuthorized = true;
      wrapper = setupWrapper(_initialState, props);
      const component = findByDataAttr(wrapper, 'sharedSmartSwitchCardComponent');
      expect(component).toHaveLength(0);
    });
  });
});
