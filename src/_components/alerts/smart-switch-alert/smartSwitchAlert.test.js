import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { checkProps, findByDataAttr, initialState } from '../../../_utils';
import { deviceTwo } from '../../../_utils/fixtures/device.fixture';
import { socketIdSix } from '../../../_utils/fixtures/socketId.fixture';
import { subDeviceThree } from '../../../_utils/fixtures/subDevice.fixture';
import { subDeviceParamFour } from '../../../_utils/fixtures/subDeviceParam.fixture';
import { subDeviceSettingOne } from '../../../_utils/fixtures/subDeviceSetting.fixture';
import SmartSwitchAlert from './smartSwitchAlert';

let store;
const props = {
  deviceId: deviceTwo.deviceId,
};
const mockStore = configureStore([thunk]);

const setupWrapper = _initialState => {
  store = mockStore(_initialState);
  return mount(
    <Provider store={store}>
      <SmartSwitchAlert {...props} />
    </Provider>
  );
};

describe('SmartSwitchAlert', () => {
  describe('Checking PropTypes', () => {
    it('should not throw a warning', () => {
      const propsErr = checkProps(SmartSwitchAlert, props);
      expect(propsErr).toBeUndefined();
    });

    it('should throw a warning if deviceId is missing', () => {
      const propsErr = checkProps(SmartSwitchAlert, {});
      expect(propsErr).toBeDefined();
    });
  });

  describe('Components Testing', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = setupWrapper(initialState);
      // clear SIGN_OUT
      store.clearActions();
    });

    afterEach(() => {
      wrapper.unmount();
      store.clearActions();
    });

    it('should render alertContainer without error', () => {
      const component = findByDataAttr(wrapper, 'alertContainer').first();
      expect(component.length).toBe(1);
    });

    it('should not render alertComponent if has no state', async () => {
      const component = findByDataAttr(wrapper, 'alertComponent').first();
      expect(component.length).toBe(0);
    });
  });

  describe('Components Testing with State', () => {
    let wrapper;
    beforeEach(() => {});

    afterEach(() => {
      wrapper.unmount();
      store.clearActions();
    });

    it('should not render alertComponent if has subDeviceSettings but has no onlineDevices', async () => {
      const _initialState = { ...initialState };
      _initialState.subDeviceSetting.subDeviceSettings = [subDeviceSettingOne];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'alertComponent').first();
      expect(component.length).toBe(0);
    });

    it('should not render alertComponent if has subDeviceSettings and onlineDevices but has no subDevice', async () => {
      const _initialState = { ...initialState };
      _initialState.subDeviceSetting.subDeviceSettings = [subDeviceSettingOne];
      _initialState.onlineDevice.onlineDevices = [{ id: socketIdSix.id, bindedTo: socketIdSix.bindedTo }];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'alertComponent').first();
      expect(component.length).toBe(0);
    });

    it('should not render alertComponent if has subDeviceSettings and onlineDevices and subDevices but has no subDeviceParams', async () => {
      const _initialState = { ...initialState };
      _initialState.subDevice.subDevices = [subDeviceThree];
      _initialState.subDeviceSetting.subDeviceSettings = [subDeviceSettingOne];
      _initialState.onlineDevice.onlineDevices = [{ id: socketIdSix.id, bindedTo: socketIdSix.bindedTo }];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'alertComponent').first();
      expect(component.length).toBe(0);
    });

    it('should not render alertComponent if has subDeviceSettings and onlineDevices and subDevices and subDeviceParams but subDeviceParamValue is off', async () => {
      const _initialState = { ...initialState };
      _initialState.subDevice.subDevices = [subDeviceThree];
      _initialState.subDeviceSetting.subDeviceSettings = [subDeviceSettingOne];
      _initialState.onlineDevice.onlineDevices = [{ id: socketIdSix.id, bindedTo: socketIdSix.bindedTo }];
      _initialState.subDeviceParam.subDeviceParams = [subDeviceParamFour];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'alertComponent').first();
      expect(component.length).toBe(0);
    });

    it('should not render alertComponent if has subDeviceSettings and onlineDevices and subDevices and subDeviceParams and subDeviceParamValue is on but autoShutDownTime is zero', async () => {
      const _initialState = { ...initialState };
      _initialState.subDevice.subDevices = [subDeviceThree];
      const setting = { ...subDeviceSettingOne };
      setting.paramValue = 0;
      _initialState.subDeviceSetting.subDeviceSettings = [setting];
      _initialState.onlineDevice.onlineDevices = [{ id: socketIdSix.id, bindedTo: socketIdSix.bindedTo }];
      const subDeviceParam = { ...subDeviceParamFour };
      subDeviceParam.paramValue = 'on';
      subDeviceParam.updatedAt = new Date();
      _initialState.subDeviceParam.subDeviceParams = [subDeviceParam];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'alertComponent').first();
      expect(component.length).toBe(0);
    });

    it('should render alertComponent if has subDeviceSettings and onlineDevices and subDevices and subDeviceParams and subDeviceParamValue is on and autoshutDownTime is greater than zero', async () => {
      const _initialState = { ...initialState };
      _initialState.subDevice.subDevices = [subDeviceThree];
      _initialState.subDeviceSetting.subDeviceSettings = [subDeviceSettingOne];
      _initialState.onlineDevice.onlineDevices = [{ id: socketIdSix.id, bindedTo: socketIdSix.bindedTo }];
      const subDeviceParam = { ...subDeviceParamFour };
      subDeviceParam.paramValue = 'on';
      subDeviceParam.updatedAt = new Date();
      _initialState.subDeviceParam.subDeviceParams = [subDeviceParam];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'alertComponent').first();
      expect(component.length).toBe(1);
    });
  });
});
