import { mount, shallow } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { history } from '../../_helpers/history';
import { checkProps, findByDataAttr, initialState } from '../../_utils';
import { deviceOne, deviceTwo } from '../../_utils/fixtures/device.fixture';
import DefaultHomePage, { HomePage } from './HomePage';

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
  devices: [deviceOne],
  connected: true,
  isAuthorized: true,
  isLoggedIn: true,
  isFetchingDevice: false,
  isSocketFetching: false,
  me: jest.fn(),
  myDevices: jest.fn(),
  setDeviceFetching: jest.fn(),
  removeAllDevices: jest.fn(),
  sharedDevices: [deviceTwo],
  signIn: jest.fn(),
  signOut: jest.fn(),
  socketInit: jest.fn(),
  tokens: {
    access: {
      expires: '',
      token: '',
    },
    refresh: {
      expires: '',
      token: '',
    },
  },
};

const setupWrapper = (_initialState, _props) => {
  store = mockStore(_initialState);
  return mount(
    <Provider store={store}>
      <DefaultHomePage {..._props} />
    </Provider>
  );
};

describe('HomePage Component', () => {
  describe('Checking PropTypes', () => {
    it('should not throw a warning', () => {
      const propsErr = checkProps(HomePage, props);
      expect(propsErr).toBeUndefined();
    });
    it('should not throw a warning even if no props', () => {
      const propsErr = checkProps(DefaultHomePage, {});
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
      let component = findByDataAttr(wrapper, 'navbarComponent').first();
      expect(component.length).toBe(1);
      component = findByDataAttr(wrapper, 'homePageContainer').first();
      expect(component.length).toBe(1);
      component = findByDataAttr(wrapper, 'appSkeletonComponent');
      expect(component.length).toBe(0);
      component = findByDataAttr(wrapper, 'noDeviceAlertComponent').first();
      expect(component.length).toBe(1);
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
      component = findByDataAttr(wrapper, 'footerComponent');
      expect(component.length).toBe(1);
      // eslint-disable-next-line no-console
      console.error.mockClear();
    });

    it('should render or not render various components if having isFetchingDevice true', () => {
      const _props = {
        history,
        location: {},
        match: {},
      };
      const _initialState = { ...initialState };
      _initialState.device.isFetchingDevice = true;
      wrapper = setupWrapper(_initialState, _props);
      let component = findByDataAttr(wrapper, 'navbarComponent').first();
      expect(component.length).toBe(1);
      component = findByDataAttr(wrapper, 'homePageContainer').first();
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
      component = findByDataAttr(wrapper, 'footerComponent');
      expect(component.length).toBe(1);
    });

    it('should render or not render various components if having isFetchingDevice false and devices state', () => {
      const _props = {
        history,
        location: {},
        match: {},
      };
      const _initialState = { ...initialState };
      _initialState.device.isFetchingDevice = false;
      _initialState.device.devices = [];
      _initialState.sharedDevice.sharedDevices = [];
      wrapper = setupWrapper(_initialState, _props);
      let component = findByDataAttr(wrapper, 'navbarComponent').first();
      expect(component.length).toBe(1);
      component = findByDataAttr(wrapper, 'homePageContainer').first();
      expect(component.length).toBe(1);
      component = findByDataAttr(wrapper, 'appSkeletonComponent');
      expect(component.length).toBe(0);
      component = findByDataAttr(wrapper, 'noDeviceAlertComponent').first();
      expect(component.length).toBe(1);
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
      component = findByDataAttr(wrapper, 'footerComponent');
      expect(component.length).toBe(1);
    });

    it('should render or not render various components if having isFetchingDevice true and devices state', () => {
      const _props = {
        history,
        location: {},
        match: {},
      };
      const _initialState = { ...initialState };
      _initialState.device.isFetchingDevice = true;
      _initialState.device.devices = [deviceOne, deviceTwo];
      _initialState.sharedDevice.sharedDevices = [];
      wrapper = setupWrapper(_initialState, _props);
      let component = findByDataAttr(wrapper, 'navbarComponent').first();
      expect(component.length).toBe(1);
      component = findByDataAttr(wrapper, 'homePageContainer').first();
      expect(component.length).toBe(1);
      component = findByDataAttr(wrapper, 'appSkeletonComponent').first();
      expect(component.length).toBe(1);
      component = findByDataAttr(wrapper, 'noDeviceAlertComponent').first();
      expect(component.length).toBe(0);
      component = findByDataAttr(wrapper, 'deviceGridComponent').first();
      expect(component.length).toBe(1);
      component = findByDataAttr(wrapper, 'myTankCardComponent').first();
      expect(component.length).toBe(1);
      component = findByDataAttr(wrapper, 'mySmartSwitchCardComponent').first();
      expect(component.length).toBe(1);
      component = findByDataAttr(wrapper, 'sharedDeviceGridComponent');
      expect(component.length).toBe(0);
      component = findByDataAttr(wrapper, 'sharedTankCardComponent');
      expect(component.length).toBe(0);
      component = findByDataAttr(wrapper, 'sharedSmartSwitchCardComponent');
      expect(component.length).toBe(0);
      component = findByDataAttr(wrapper, 'myDeviceGridComponent').first();
      expect(component.length).toBe(1);
      component = findByDataAttr(wrapper, 'sharedDeviceGridComponent');
      expect(component.length).toBe(0);
      component = findByDataAttr(wrapper, 'settingDialogComponent').first();
      expect(component.length).toBe(1);
      component = findByDataAttr(wrapper, 'footerComponent');
      expect(component.length).toBe(1);
    });

    it('should render or not render various components if having isFetchingDevice false and sharedDevice state', () => {
      const _props = {
        history,
        location: {},
        match: {},
      };
      const _initialState = { ...initialState };
      _initialState.device.isFetchingDevice = false;
      _initialState.device.devices = [];
      _initialState.sharedDevice.sharedDevices = [];
      wrapper = setupWrapper(_initialState, _props);
      let component = findByDataAttr(wrapper, 'navbarComponent').first();
      expect(component.length).toBe(1);
      component = findByDataAttr(wrapper, 'homePageContainer').first();
      expect(component.length).toBe(1);
      component = findByDataAttr(wrapper, 'appSkeletonComponent');
      expect(component.length).toBe(0);
      component = findByDataAttr(wrapper, 'noDeviceAlertComponent').first();
      expect(component.length).toBe(1);
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
      component = findByDataAttr(wrapper, 'footerComponent');
      expect(component.length).toBe(1);
    });

    it('should render or not render various components if having isFetchingDevice true and sharedDevice state', () => {
      const _props = {
        history,
        location: {},
        match: {},
      };
      const _initialState = { ...initialState };
      _initialState.device.isFetchingDevice = true;
      _initialState.device.devices = [];
      _initialState.sharedDevice.sharedDevices = [deviceOne, deviceTwo];
      wrapper = setupWrapper(_initialState, _props);
      let component = findByDataAttr(wrapper, 'navbarComponent').first();
      expect(component.length).toBe(1);
      component = findByDataAttr(wrapper, 'homePageContainer').first();
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
      expect(component.length).toBe(1);
      component = findByDataAttr(wrapper, 'sharedTankCardComponent').first();
      expect(component.length).toBe(1);
      component = findByDataAttr(wrapper, 'sharedSmartSwitchCardComponent').first();
      expect(component.length).toBe(1);
      component = findByDataAttr(wrapper, 'myDeviceGridComponent');
      expect(component.length).toBe(0);
      component = findByDataAttr(wrapper, 'sharedDeviceGridComponent').first();
      expect(component.length).toBe(1);
      component = findByDataAttr(wrapper, 'settingDialogComponent').first();
      expect(component.length).toBe(1);
      component = findByDataAttr(wrapper, 'footerComponent');
      expect(component.length).toBe(1);
    });

    it('should not call socketInit if user is not isAuthorized, not loggedIn, not have tokens, and is connected', () => {
      const _props = {
        history,
        location: {},
        match: {},
      };
      const _initialState = { ...initialState };
      _initialState.user.isAuthorized = false;
      _initialState.user.isLoggedIn = false;
      _initialState.socket.connected = false;
      _initialState.user.tokens = {};
      wrapper = setupWrapper(_initialState, _props);
      expect(store.getActions().length).toBeFalsy();
    });

    it('should call socketInit if user is Authorized, loggedIn, have tokens, and is not connected to socket', () => {
      const _props = {
        history,
        location: {},
        match: {},
      };
      const _initialState = { ...initialState };
      _initialState.user.isAuthorized = true;
      _initialState.user.isLoggedIn = true;
      _initialState.socket.connected = false;
      _initialState.user.tokens = { access: { token: 'sdasd', expires: '' } };
      wrapper = setupWrapper(_initialState, _props);
      expect(store.getActions().length).toBeTruthy();
      expect(store.getActions()).toEqual([{ type: 'SOCKET_INIT' }]);
    });

    it('should get myDevices if connected to socket', () => {
      const myDevices = jest.fn();
      wrapper = shallow(<HomePage {...props} myDevices={myDevices} />);
      wrapper.instance().componentDidUpdate({ connected: false });
      expect(myDevices).toHaveBeenCalled();
      myDevices.mockClear();
    });

    it('should not get myDevices if not connected to socket', () => {
      const myDevices = jest.fn();
      const newProps = { ...props };
      newProps.connected = false;
      wrapper = shallow(<HomePage {...newProps} myDevices={myDevices} />);
      wrapper.instance().componentDidUpdate({ connected: true });
      expect(myDevices).not.toHaveBeenCalled();
      myDevices.mockClear();
    });

    it('should not get myDevices if connected to socket and previous pros and this props are same', () => {
      const myDevices = jest.fn();
      wrapper = shallow(<HomePage {...props} myDevices={myDevices} />);
      wrapper.instance().componentDidUpdate({ connected: true });
      expect(myDevices).not.toHaveBeenCalled();
      myDevices.mockClear();
    });
  });
});
