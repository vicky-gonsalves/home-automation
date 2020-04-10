import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { checkProps, findByDataAttr, initialState, submitFormikForm, updateFormikField } from '../../../_utils';
import { deviceTwo } from '../../../_utils/fixtures/device.fixture';
import { subDeviceFive, subDeviceFour, subDeviceThree } from '../../../_utils/fixtures/subDevice.fixture';
import {
  subDeviceSettingFour,
  subDeviceSettingOne,
  subDeviceSettingTwo,
} from '../../../_utils/fixtures/subDeviceSetting.fixture';
import SmartSwitchSettingForm, { SimpleSmartSwitchSettingForm } from './SmartSwitchSettingForm';

let wrapper;
let store;
const props = {
  deviceId: deviceTwo.deviceId,
  subDevices: [subDeviceSettingOne, subDeviceSettingTwo],
  subDeviceSettings: [subDeviceSettingOne, subDeviceSettingTwo],
  isFetching: false,
  saveSettings: jest.fn(),
  close: jest.fn(),
};
const mockStore = configureStore([thunk]);
const setupWrapper = _initialState => {
  store = mockStore(_initialState);
  return mount(
    <Provider store={store}>
      <SmartSwitchSettingForm {...props} />
    </Provider>
  );
};

describe('SmartSwitchSettingForm', () => {
  describe('Checking PropTypes', () => {
    it('should not throw a warning for SmartSwitchSettingForm', () => {
      const propsErr = checkProps(SmartSwitchSettingForm, {});
      expect(propsErr).toBeUndefined();
    });

    it('should not throw a warning for SimpleSmartSwitchSettingForm', () => {
      const propsErr = checkProps(SimpleSmartSwitchSettingForm, props);
      expect(propsErr).toBeUndefined();
    });
  });

  describe('Components Testing with State', () => {
    beforeEach(() => {});

    afterEach(() => {
      wrapper.unmount();
      store.clearActions();
    });

    it('should not render smartSwitchSettingFormComponent when no state', () => {
      wrapper = setupWrapper(initialState);
      const component = findByDataAttr(wrapper, 'smartSwitchSettingFormComponent');
      expect(component.length).toBe(0);
    });

    it('should not render smartSwitchFieldArrayComponent when no state', () => {
      wrapper = setupWrapper(initialState);
      const component = findByDataAttr(wrapper, 'smartSwitchFieldArrayComponent');
      expect(component.length).toBe(0);
    });

    it('should not render smartSwitchSettingFormSubmitButton when no state', () => {
      wrapper = setupWrapper(initialState);
      const component = findByDataAttr(wrapper, 'smartSwitchSettingFormSubmitButton');
      expect(component.length).toBe(0);
    });

    it('should not render smartSwitchSettingFormCancelButton when no state', () => {
      wrapper = setupWrapper(initialState);
      const component = findByDataAttr(wrapper, 'smartSwitchSettingFormCancelButton');
      expect(component.length).toBe(0);
    });

    it('should not render smartSwitchSettingFormTextField when no state', () => {
      wrapper = setupWrapper(initialState);
      const component = findByDataAttr(wrapper, 'smartSwitchSettingFormTextField');
      expect(component.length).toBe(0);
    });

    it('should render smartSwitchFieldAlertComponent when no state', () => {
      wrapper = setupWrapper(initialState);
      const component = findByDataAttr(wrapper, 'smartSwitchFieldAlertComponent').first();
      expect(component.length).toBe(1);
    });

    it('should render smartSwitchFieldAlertComponent if only settings are available', () => {
      const _initialState = { ...initialState };
      _initialState.subDeviceSetting.subDeviceSettings = [subDeviceSettingOne, subDeviceSettingTwo];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'smartSwitchFieldAlertComponent').first();
      expect(component.length).toBe(1);
    });

    it('should render smartSwitchSettingFormComponent if only settings are available', () => {
      const _initialState = { ...initialState };
      _initialState.subDeviceSetting.subDeviceSettings = [subDeviceSettingOne, subDeviceSettingTwo];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'smartSwitchSettingFormComponent').first();
      expect(component.length).toBe(0);
    });

    it('should not render smartSwitchFieldAlertComponent if settings and subDevices are available', () => {
      const _initialState = { ...initialState };
      _initialState.subDevice.subDevices = [subDeviceThree, subDeviceFour];
      _initialState.subDeviceSetting.subDeviceSettings = [subDeviceSettingOne, subDeviceSettingTwo];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'smartSwitchFieldAlertComponent').first();
      expect(component.length).toBe(0);
    });

    it('should render smartSwitchSettingFormComponent if settings and subDevices are available', () => {
      const _initialState = { ...initialState };
      _initialState.subDevice.subDevices = [subDeviceThree, subDeviceFour];
      _initialState.subDeviceSetting.subDeviceSettings = [subDeviceSettingOne, subDeviceSettingTwo];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'smartSwitchSettingFormComponent').first();
      expect(component.length).toBe(1);
    });

    it('should render smartSwitchFieldAlertComponent if some other settings are available', () => {
      const _initialState = { ...initialState };
      _initialState.subDeviceSetting.subDeviceSettings = [subDeviceSettingFour];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'smartSwitchFieldAlertComponent').first();
      expect(component.length).toBe(1);
    });

    it('should render smartSwitchFieldAlertComponent if some other subDevices are available', () => {
      const _initialState = { ...initialState };
      _initialState.subDevice.subDevices = [subDeviceFive];
      _initialState.subDeviceSetting.subDeviceSettings = [subDeviceSettingOne, subDeviceSettingTwo];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'smartSwitchFieldAlertComponent').first();
      expect(component.length).toBe(1);
    });

    it('should close the dialog', () => {
      const _initialState = { ...initialState };
      _initialState.subDevice.subDevices = [subDeviceThree, subDeviceFour];
      _initialState.subDeviceSetting.subDeviceSettings = [subDeviceSettingOne, subDeviceSettingTwo];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'smartSwitchSettingFormCancelButton').first();
      component.props().onClick();
      expect(store.getActions()).toEqual([{ type: 'CLOSE_SETTINGS' }]);
    });

    it('should submit form if valid', async () => {
      const _initialState = { ...initialState };
      _initialState.subDevice.subDevices = [subDeviceThree, subDeviceFour];
      _initialState.subDeviceSetting.subDeviceSettings = [subDeviceSettingOne, subDeviceSettingTwo];
      wrapper = setupWrapper(_initialState);
      const form = wrapper.find(`form`).first();
      await submitFormikForm(form);
      const formikSettings = findByDataAttr(wrapper, 'smartSwitchSettingFormTextField');
      expect(formikSettings.at(0).props().error).toBeFalsy();
      expect(formikSettings.at(1).props().error).toBeFalsy();
      expect(store.getActions()).toEqual([
        { type: 'SET_PROGRESS', payload: true },
        { type: 'SET_PROGRESS', payload: false },
        { type: 'SET_SUB_DEVICE_SETTING_ERROR', payload: { error: undefined } },
      ]);
    });

    it('should not submit form if invalid', async () => {
      const _initialState = { ...initialState };
      _initialState.subDevice.subDevices = [subDeviceThree, subDeviceFour];
      _initialState.subDeviceSetting.subDeviceSettings = [subDeviceSettingOne, subDeviceSettingTwo];
      wrapper = setupWrapper(_initialState);
      const form = wrapper.find(`form`).first();
      const settingOne = wrapper.find('input[name="settings[0].setting.paramValue"]').first();
      const settingTwo = wrapper.find('input[name="settings[1].setting.paramValue"]').first();

      // update fields
      await updateFormikField(settingOne, 'settings[0].setting.paramValue', 'string');
      await updateFormikField(settingTwo, 'settings[1].setting.paramValue', 'string');
      settingOne.update();
      settingTwo.update();
      await submitFormikForm(form);
      let formikSettings = findByDataAttr(wrapper, 'smartSwitchSettingFormTextField');
      expect(formikSettings.at(0).props().error).toBeTruthy();
      expect(formikSettings.at(1).props().error).toBeTruthy();
      expect(formikSettings.at(0).props().helperText).toBe(
        'Please enter auto shutdown time in minutes (minutes must be a number)'
      );
      expect(formikSettings.at(1).props().helperText).toBe(
        'Please enter auto shutdown time in minutes (minutes must be a number)'
      );

      // update fields
      await updateFormikField(settingOne, 'settings[0].setting.paramValue', -1);
      await updateFormikField(settingTwo, 'settings[1].setting.paramValue', -1);
      settingOne.update();
      settingTwo.update();
      await submitFormikForm(form);
      formikSettings = findByDataAttr(wrapper, 'smartSwitchSettingFormTextField');
      expect(formikSettings.at(0).props().error).toBeTruthy();
      expect(formikSettings.at(1).props().error).toBeTruthy();
      expect(formikSettings.at(0).props().helperText).toBe('Auto shutdown time cannot be negative');
      expect(formikSettings.at(1).props().helperText).toBe('Auto shutdown time cannot be negative');
    });
  });
});
