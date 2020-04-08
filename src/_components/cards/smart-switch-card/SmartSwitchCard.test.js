import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { findByDataAttr, initialState } from '../../../_utils';
import { deviceTwo } from '../../../_utils/fixtures/device.fixture';
import { socketIdSix } from '../../../_utils/fixtures/socketId.fixture';
import { subDeviceThree } from '../../../_utils/fixtures/subDevice.fixture';
import SmartSwitchCard from './SmartSwitchCard';

let store;
const props = {
  deviceId: deviceTwo.deviceId,
  deviceName: deviceTwo.name,
};
const mockStore = configureStore([thunk]);
const setupWrapper = _initialState => {
  store = mockStore(_initialState);
  return mount(
    <Provider store={store}>
      <SmartSwitchCard {...props} />
    </Provider>
  );
};

describe('SmartSwitchCard', () => {
  describe('Components Testing with state', () => {
    let wrapper;
    beforeEach(() => {});

    afterEach(() => {
      wrapper.unmount();
      store.clearActions();
    });

    it('should render without error', () => {
      wrapper = setupWrapper(initialState);
      const component = findByDataAttr(wrapper, 'smartSwitchCardContainer').first();
      expect(component.length).toBe(1);
    });

    it('should not render cardContentContainer if no states', async () => {
      wrapper = setupWrapper(initialState);
      const component = findByDataAttr(wrapper, 'cardContentContainer').first();
      expect(component.length).toBe(0);
    });

    it('should not render cardActionFooterContainer if no subDevices', () => {
      wrapper = setupWrapper(initialState);
      const component = findByDataAttr(wrapper, 'cardActionFooterContainer').first();
      expect(component.length).toBe(0);
    });

    it('should render offlineAlertCardContainer if no subDevices', () => {
      wrapper = setupWrapper(initialState);
      const component = findByDataAttr(wrapper, 'offlineAlertCardContainer').first();
      expect(component.length).toBe(1);
    });

    it('should not render offlineAlertCardContainer if has subDevices', async () => {
      const _initialState = initialState;
      _initialState.subDevice.subDevices = [subDeviceThree];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'offlineAlertCardContainer').first();
      expect(component.length).toBe(0);
    });

    it('should render cardActionFooterContainer if no subDevices', () => {
      const _initialState = initialState;
      _initialState.subDevice.subDevices = [subDeviceThree];
      wrapper = setupWrapper(initialState);
      const component = findByDataAttr(wrapper, 'cardActionFooterContainer').first();
      expect(component.length).toBe(1);
    });

    it('should not render cardContentContainer if no subDevices', async () => {
      const _initialState = initialState;
      _initialState.subDevice.subDevices = [];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'cardContentContainer').first();
      expect(component.length).toBe(0);
    });

    it('should render cardContentContainer if has subDevices', async () => {
      const _initialState = initialState;
      _initialState.subDevice.subDevices = [subDeviceThree];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'cardContentContainer').first();
      expect(component.length).toBe(1);
    });

    it('should render offlineAlertContainer if has subDevices but no online devices', async () => {
      const _initialState = initialState;
      _initialState.subDevice.subDevices = [subDeviceThree];
      _initialState.onlineDevice.onlineDevices = [];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'offlineAlertContainer').first();
      expect(component.length).toBe(1);
    });

    it('should render offlineAlertContainer if has no subDevices but no online devices', async () => {
      const _initialState = initialState;
      _initialState.subDevice.subDevices = [];
      _initialState.onlineDevice.onlineDevices = [];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'offlineAlertContainer').first();
      expect(component.length).toBe(1);
    });

    it('should not render offlineAlertContainer if has subDevices and online devices', async () => {
      const _initialState = initialState;
      _initialState.subDevice.subDevices = [subDeviceThree];
      _initialState.onlineDevice.onlineDevices = [{ id: socketIdSix.id, bindedTo: socketIdSix.bindedTo }];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'offlineAlertContainer').first();
      expect(component.length).toBe(0);
    });
  });
});
