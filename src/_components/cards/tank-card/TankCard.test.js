import { act } from '@testing-library/react';
import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { findByDataAttr, initialState } from '../../../_utils';
import { deviceOne } from '../../../_utils/fixtures/device.fixture';
import { deviceParamOne, deviceParamTwo } from '../../../_utils/fixtures/deviceParam.fixture';
import { deviceSettingOne } from '../../../_utils/fixtures/deviceSetting.fixture';
import { socketIdOne } from '../../../_utils/fixtures/socketId.fixture';
import { subDeviceOne, subDeviceThree, subDeviceTwo } from '../../../_utils/fixtures/subDevice.fixture';
import TankCard from './TankCard';

let store;
const props = {
  deviceId: deviceOne.deviceId,
  deviceName: deviceOne.name,
};
const mockStore = configureStore([thunk]);
const setupWrapper = _initialState => {
  store = mockStore(_initialState);
  return mount(
    <Provider store={store}>
      <TankCard {...props} />
    </Provider>
  );
};

describe('TankCard', () => {
  describe('Components Testing with state', () => {
    let wrapper;
    beforeEach(() => {});

    afterEach(() => {
      wrapper.unmount();
      store.clearActions();
    });

    it('should render without error', () => {
      const _initialState = { ...initialState };
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'tankCardContainer').first();
      expect(component.length).toBe(1);
    });

    it('should render tankCardContentContainer if no subDevices', () => {
      const _initialState = { ...initialState };
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'tankCardContentContainer').first();
      expect(component.length).toBe(0);
    });

    it('should render tankCardActionFooterContainer if no subDevices', () => {
      const _initialState = { ...initialState };
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'tankCardActionFooterContainer').first();
      expect(component.length).toBe(0);
    });

    it('should render tankCardNoSubDeviceAlertContainer if no subDevices', () => {
      const _initialState = { ...initialState };
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'tankCardNoSubDeviceAlertContainer').first();
      expect(component.length).toBe(1);
    });

    it('should not render tankCardContentContainer if no subDevices', async () => {
      const _initialState = { ...initialState };
      _initialState.subDevice.subDevices = [];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'tankCardContentContainer').first();
      expect(component.length).toBe(0);
    });

    it('should not render tankContainer if no subDevices', async () => {
      const _initialState = { ...initialState };
      _initialState.subDevice.subDevices = [];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'tankContainer').first();
      expect(component.length).toBe(0);
    });

    it('should not render tankUpdateContainer if no subDevices', async () => {
      const _initialState = { ...initialState };
      _initialState.subDevice.subDevices = [];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'tankUpdateContainer').first();
      expect(component.length).toBe(0);
    });

    it('should not render MotorSwitchContainer if no subDevices', async () => {
      const _initialState = { ...initialState };
      _initialState.subDevice.subDevices = [];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'MotorSwitchContainer').first();
      expect(component.length).toBe(0);
    });

    it('should not render MotorModeContainer if no subDevices', async () => {
      const _initialState = { ...initialState };
      _initialState.subDevice.subDevices = [];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'MotorModeContainer').first();
      expect(component.length).toBe(0);
    });

    it('should not render preferredDeviceContainer if no subDevices', async () => {
      const _initialState = { ...initialState };
      _initialState.subDevice.subDevices = [];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'preferredDeviceContainer').first();
      expect(component.length).toBe(0);
    });

    it('should not render tankContainer if has no subDevices and no online devices', async () => {
      const _initialState = { ...initialState };
      _initialState.subDevice.subDevices = [];
      _initialState.onlineDevice.onlineDevices = [];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'tankContainer').first();
      expect(component.length).toBe(0);
    });

    it('should not render tankUpdateContainer if has no subDevices and no online devices', async () => {
      const _initialState = { ...initialState };
      _initialState.subDevice.subDevices = [];
      _initialState.onlineDevice.onlineDevices = [];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'tankUpdateContainer').first();
      expect(component.length).toBe(0);
    });

    it('should not render MotorSwitchContainer if has no subDevices and no online devices', async () => {
      const _initialState = { ...initialState };
      _initialState.subDevice.subDevices = [];
      _initialState.onlineDevice.onlineDevices = [];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'MotorSwitchContainer').first();
      expect(component.length).toBe(0);
    });

    it('should not render MotorModeContainer if has no subDevices and no online devices', async () => {
      const _initialState = { ...initialState };
      _initialState.subDevice.subDevices = [];
      _initialState.onlineDevice.onlineDevices = [];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'MotorModeContainer').first();
      expect(component.length).toBe(0);
    });

    it('should not render preferredDeviceContainer if has no subDevices and no online devices', async () => {
      const _initialState = { ...initialState };
      _initialState.subDevice.subDevices = [];
      _initialState.onlineDevice.onlineDevices = [];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'preferredDeviceContainer').first();
      expect(component.length).toBe(0);
    });

    it('should render tankOfflineAlertContainer if has no subDevices but no online devices', async () => {
      const _initialState = { ...initialState };
      _initialState.subDevice.subDevices = [];
      _initialState.onlineDevice.onlineDevices = [];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'tankOfflineAlertContainer').first();
      expect(component.length).toBe(1);
    });

    it('should not render tankOfflineAlertContainer if has subDevices and online devices', async () => {
      const _initialState = { ...initialState };
      _initialState.subDevice.subDevices = [subDeviceThree];
      _initialState.onlineDevice.onlineDevices = [{ id: socketIdOne.id, bindedTo: socketIdOne.bindedTo }];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'tankOfflineAlertContainer').first();
      expect(component.length).toBe(0);
    });

    it('should not render tankCardNoSubDeviceAlertContainer if has subDevices', async () => {
      const _initialState = { ...initialState };
      _initialState.subDevice.subDevices = [subDeviceOne];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'tankCardNoSubDeviceAlertContainer').first();
      expect(component.length).toBe(0);
    });

    it('should render tankCardActionFooterContainer if has subDevices', () => {
      const _initialState = { ...initialState };
      _initialState.subDevice.subDevices = [subDeviceOne];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'tankCardActionFooterContainer').first();
      expect(component.length).toBe(1);
    });

    it('should render tankCardContentContainer if has subDevices', async () => {
      const _initialState = { ...initialState };
      _initialState.subDevice.subDevices = [subDeviceOne];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'tankCardContentContainer').first();
      expect(component.length).toBe(1);
    });

    it('should render tankOfflineAlertContainer if has subDevices but no online devices', async () => {
      const _initialState = { ...initialState };
      _initialState.subDevice.subDevices = [subDeviceOne];
      _initialState.onlineDevice.onlineDevices = [];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'tankOfflineAlertContainer').first();
      expect(component.length).toBe(1);
    });

    it('should render preferredDeviceContainer if has only one subDevice and preferred subDevice setting', async () => {
      const _initialState = { ...initialState };
      _initialState.subDevice.subDevices = [subDeviceOne];
      _initialState.deviceSetting.deviceSettings = [deviceSettingOne];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'preferredDeviceContainer').first();
      expect(component.length).toBe(0);
    });

    it('should render preferredDeviceContainer if has multi subDevices and preferred subDevice setting', async () => {
      const _initialState = { ...initialState };
      _initialState.subDevice.subDevices = [subDeviceOne, subDeviceTwo];
      _initialState.deviceSetting.deviceSettings = [deviceSettingOne];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'preferredDeviceContainer').first();
      expect(component.length).toBe(1);
    });

    it('should render tankContainer if has subDevices and water level deviceParams', async () => {
      const _initialState = { ...initialState };
      _initialState.subDevice.subDevices = [subDeviceOne, subDeviceTwo];
      _initialState.deviceParam.deviceParams = [deviceParamOne];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'tankContainer').first();
      expect(component.length).toBe(1);
    });

    it('should render tankContainer if has subDevices and water level deviceParams is missing', async () => {
      const _initialState = { ...initialState };
      _initialState.subDevice.subDevices = [subDeviceOne, subDeviceTwo];
      _initialState.deviceParam.deviceParams = [deviceParamTwo];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'tankContainer').first();
      expect(component.length).toBe(1);
    });

    it('should render tankUpdateContainer with text', async () => {
      const _initialState = { ...initialState };
      _initialState.subDevice.subDevices = [subDeviceOne, subDeviceTwo];
      const deviceParam = { ...deviceParamOne };
      deviceParam.updatedAt = new Date();
      _initialState.deviceParam.deviceParams = [deviceParam];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'tankUpdateContainer').first();
      expect(component.length).toBe(1);
      expect(component.text()).toBe('Updated a few seconds ago');
    });

    it('should render tankUpdateContainer with updated time', async () => {
      jest.useFakeTimers();
      const _initialState = { ...initialState };
      _initialState.subDevice.subDevices = [subDeviceOne, subDeviceTwo];
      const deviceParam = { ...deviceParamOne };
      deviceParam.updatedAt = new Date();
      _initialState.deviceParam.deviceParams = [deviceParam];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'tankUpdateContainer').first();
      expect(component.length).toBe(1);
      expect(component.text()).toBe('Updated a few seconds ago');
      act(() => {
        jest.runOnlyPendingTimers();
      });
      expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 1000);
      expect(component.text()).toBe('Updated a few seconds ago');
      jest.useRealTimers();
    });
  });
});
