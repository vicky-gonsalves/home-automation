import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { checkProps, findByDataAttr, initialState } from '../../../_utils';
import { deviceOne } from '../../../_utils/fixtures/device.fixture';
import { deviceSettingTwo } from '../../../_utils/fixtures/deviceSetting.fixture';
import { socketIdOne } from '../../../_utils/fixtures/socketId.fixture';
import { subDeviceOne } from '../../../_utils/fixtures/subDevice.fixture';
import { subDeviceParamThree } from '../../../_utils/fixtures/subDeviceParam.fixture';
import TankAlert from './tankAlert';

let store;
const props = {
  deviceId: deviceOne.deviceId,
};
const mockStore = configureStore([thunk]);
const setupWrapper = _initialState => {
  store = mockStore(_initialState);
  return mount(
    <Provider store={store}>
      <TankAlert {...props} />
    </Provider>
  );
};

describe('TankAlert', () => {
  describe('Checking PropTypes', () => {
    it('should not throw a warning', () => {
      const propsErr = checkProps(TankAlert, props);
      expect(propsErr).toBeUndefined();
    });

    it('should throw a warning if deviceId is missing', () => {
      const propsErr = checkProps(TankAlert, {});
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

    it('should not render alertComponent if has deviceSettings but has no onlineDevices', async () => {
      const _initialState = { ...initialState };
      _initialState.deviceSetting.deviceSettings = [deviceSettingTwo];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'alertComponent').first();
      expect(component.length).toBe(0);
    });

    it('should not render alertComponent if has deviceSettings and onlineDevices but has no subDevice', async () => {
      const _initialState = { ...initialState };
      _initialState.deviceSetting.deviceSettings = [deviceSettingTwo];
      _initialState.onlineDevice.onlineDevices = [{ id: socketIdOne.id, bindedTo: socketIdOne.bindedTo }];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'alertComponent').first();
      expect(component.length).toBe(0);
    });

    it('should not render alertComponent if has deviceSettings and onlineDevices and subDevices but has no subDeviceParams', async () => {
      const _initialState = { ...initialState };
      _initialState.subDevice.subDevices = [subDeviceOne];
      _initialState.deviceSetting.deviceSettings = [deviceSettingTwo];
      _initialState.onlineDevice.onlineDevices = [{ id: socketIdOne.id, bindedTo: socketIdOne.bindedTo }];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'alertComponent').first();
      expect(component.length).toBe(0);
    });

    it('should not render alertComponent if has deviceSettings and onlineDevices and subDevices and subDeviceParams but subDeviceParamValue is off', async () => {
      const _initialState = { ...initialState };
      _initialState.subDevice.subDevices = [subDeviceOne];
      _initialState.deviceSetting.deviceSettings = [deviceSettingTwo];
      _initialState.onlineDevice.onlineDevices = [{ id: socketIdOne.id, bindedTo: socketIdOne.bindedTo }];
      _initialState.subDeviceParam.subDeviceParams = [subDeviceParamThree];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'alertComponent').first();
      expect(component.length).toBe(0);
    });

    it('should not render alertComponent if has deviceSettings and onlineDevices and subDevices and subDeviceParams and subDeviceParamValue is on but autoShutDownTime is zero', async () => {
      const _initialState = { ...initialState };
      _initialState.subDevice.subDevices = [subDeviceOne];
      const setting = { ...deviceSettingTwo };
      setting.paramValue = 0;
      _initialState.deviceSetting.deviceSettings = [setting];
      _initialState.onlineDevice.onlineDevices = [{ id: socketIdOne.id, bindedTo: socketIdOne.bindedTo }];
      const subDeviceParam = { ...subDeviceParamThree };
      subDeviceParam.paramValue = 'on';
      subDeviceParam.updatedAt = new Date();
      _initialState.subDeviceParam.subDeviceParams = [subDeviceParam];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'alertComponent').first();
      expect(component.length).toBe(0);
    });

    it('should render alertComponent if has deviceSettings and onlineDevices and subDevices and subDeviceParams and subDeviceParamValue is on and autoshutDownTime is greater than zero', async () => {
      const _initialState = { ...initialState };
      _initialState.subDevice.subDevices = [subDeviceOne];
      _initialState.deviceSetting.deviceSettings = [deviceSettingTwo];
      _initialState.onlineDevice.onlineDevices = [{ id: socketIdOne.id, bindedTo: socketIdOne.bindedTo }];
      const subDeviceParam = { ...subDeviceParamThree };
      subDeviceParam.paramValue = 'on';
      subDeviceParam.updatedAt = new Date();
      _initialState.subDeviceParam.subDeviceParams = [subDeviceParam];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'alertComponent').first();
      expect(component.length).toBe(1);
    });
  });
});
