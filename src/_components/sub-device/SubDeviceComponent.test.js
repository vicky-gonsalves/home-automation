import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { checkProps, findByDataAttr, initialState } from '../../_utils';
import { deviceOne } from '../../_utils/fixtures/device.fixture';
import { subDeviceOne, subDeviceTwo } from '../../_utils/fixtures/subDevice.fixture';
import SubDeviceComponent from './subDeviceComponent';

let wrapper;
let store;
const mockStore = configureStore([thunk]);
const props = {
  deviceId: deviceOne.deviceId,
  all: deviceOne.deviceId,
};

const setupWrapper = _initialState => {
  store = mockStore(_initialState);
  return mount(
    <Provider store={store}>
      <SubDeviceComponent {...props} />
    </Provider>
  );
};

describe('SubDeviceComponent Component', () => {
  describe('Checking PropTypes', () => {
    it('should not throw a warning', () => {
      const propsErr = checkProps(SubDeviceComponent, props);
      expect(propsErr).toBeUndefined();
    });
    it('should not throw a warning even if no props', () => {
      const propsErr = checkProps(SubDeviceComponent, {});
      expect(propsErr).toBeUndefined();
    });
  });

  describe('Components Testing with State', () => {
    beforeEach(() => {});
    afterEach(() => {
      wrapper.unmount();
      store.clearActions();
    });

    it('should not render if no props', () => {
      // eslint-disable-next-line no-console
      console.error = jest.fn();
      const _props = {};
      store = mockStore(initialState);
      wrapper = mount(
        <Provider store={store}>
          <SubDeviceComponent {..._props} />
        </Provider>
      );
      const component = findByDataAttr(wrapper, 'subDeviceComponentContainer').first();
      expect(component.length).toBe(0);
      // eslint-disable-next-line no-console
      console.error.mockClear();
    });

    it('should not render if no states', () => {
      wrapper = setupWrapper(initialState);
      const component = findByDataAttr(wrapper, 'subDeviceComponentContainer').first();
      expect(component.length).toBe(0);
    });

    it('should render if has SubDevices', () => {
      const _initialState = { ...initialState };
      _initialState.subDevice.subDevices = [subDeviceOne, subDeviceTwo];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'subDeviceComponentContainer').first();
      expect(component.length).toBe(1);
    });

    it('should render subDeviceSmartSwitchContainer if has SubDevices', () => {
      const _initialState = { ...initialState };
      _initialState.subDevice.subDevices = [subDeviceOne, subDeviceTwo];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'subDeviceSmartSwitchContainer');
      expect(component.length).toBeTruthy();
    });

    it('should not render subDeviceSmartSwitchAllContainer if has only 1 SubDevices', () => {
      const _initialState = { ...initialState };
      _initialState.subDevice.subDevices = [subDeviceOne];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'subDeviceSmartSwitchAllContainer');
      expect(component.length).toBe(0);
    });

    it('should render subDeviceSmartSwitchAllContainer if has more than 1 SubDevices', () => {
      const _initialState = { ...initialState };
      _initialState.subDevice.subDevices = [subDeviceOne, subDeviceTwo];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'subDeviceSmartSwitchAllContainer');
      expect(component.length).toBeTruthy();
    });
  });
});
