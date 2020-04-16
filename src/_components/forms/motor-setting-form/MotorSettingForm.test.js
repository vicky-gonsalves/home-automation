import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { checkProps, findByDataAttr, initialState, submitFormikForm, updateFormikField } from '../../../_utils';
import { deviceOne } from '../../../_utils/fixtures/device.fixture';
import {
  deviceSettingFour,
  deviceSettingOne,
  deviceSettingSeven,
  deviceSettingThree,
  deviceSettingTwo,
} from '../../../_utils/fixtures/deviceSetting.fixture';
import { subDeviceOne, subDeviceTwo } from '../../../_utils/fixtures/subDevice.fixture';
import { SimpleMotorSettingForm } from './MotorSettingForm';
import MotorSettingForm from './MotorSettingForm';

jest.mock('axios');

let wrapper;
let store;
const props = {
  deviceId: deviceOne.deviceId,
  subDevices: [subDeviceOne, subDeviceTwo],
  deviceSettings: [deviceSettingOne, deviceSettingTwo, deviceSettingThree],
  isFetching: false,
  saveSettings: jest.fn(),
  close: jest.fn(),
};
const mockStore = configureStore([thunk]);
const setupWrapper = _initialState => {
  store = mockStore(_initialState);
  return mount(
    <Provider store={store}>
      <MotorSettingForm {...props} />
    </Provider>
  );
};

describe('MotorSettingForm', () => {
  describe('Checking PropTypes', () => {
    it('should not throw a warning for MotorSettingForm', () => {
      const propsErr = checkProps(MotorSettingForm, {});
      expect(propsErr).toBeUndefined();
    });

    it('should not throw a warning for SimpleMotorSettingForm', () => {
      const propsErr = checkProps(SimpleMotorSettingForm, props);
      expect(propsErr).toBeUndefined();
    });
  });

  describe('Components Testing with State', () => {
    beforeEach(() => {});

    afterEach(() => {
      wrapper.unmount();
      store.clearActions();
    });

    it('should not render motorSettingFormComponent field when no state', () => {
      wrapper = setupWrapper(initialState);
      const component = findByDataAttr(wrapper, 'motorSettingFormComponent');
      expect(component.length).toBe(0);
    });

    it('should not render motorPreferredSubDeviceSelect field when no state', () => {
      wrapper = setupWrapper(initialState);
      const component = findByDataAttr(wrapper, 'motorPreferredSubDeviceSelect');
      expect(component.length).toBe(0);
    });

    it('should not render motorAutoShutDownTimeInput field when no state', () => {
      wrapper = setupWrapper(initialState);
      const component = findByDataAttr(wrapper, 'motorAutoShutDownTimeInput');
      expect(component.length).toBe(0);
    });

    it('should not render motorWaterLevelToStartInput field when no state', () => {
      wrapper = setupWrapper(initialState);
      const component = findByDataAttr(wrapper, 'motorWaterLevelToStartInput');
      expect(component.length).toBe(0);
    });

    it('should not render motorSettingSubmitButton field when no state', () => {
      wrapper = setupWrapper(initialState);
      const component = findByDataAttr(wrapper, 'motorSettingSubmitButton');
      expect(component.length).toBe(0);
    });

    it('should not render motorSettingCancelButton field when no state', () => {
      wrapper = setupWrapper(initialState);
      const component = findByDataAttr(wrapper, 'motorSettingCancelButton');
      expect(component.length).toBe(0);
    });

    it('should render motorSettingAlert field when no deviceSetting available', () => {
      wrapper = setupWrapper(initialState);
      const component = findByDataAttr(wrapper, 'motorSettingAlert').first();
      expect(component.length).toBe(1);
    });

    it('should not render motorSettingAlert field when only preferredSubDevice is available', () => {
      const _initialState = { ...initialState };
      _initialState.deviceSetting.deviceSettings = [deviceSettingOne];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'motorSettingAlert').first();
      expect(component.length).toBe(0);
    });

    it('should not render motorSettingAlert field when only autoShutDownTime is available', () => {
      const _initialState = { ...initialState };
      _initialState.deviceSetting.deviceSettings = [deviceSettingTwo];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'motorSettingAlert').first();
      expect(component.length).toBe(0);
    });

    it('should not render motorSettingAlert field when only deviceSettingThree is available', () => {
      const _initialState = { ...initialState };
      _initialState.deviceSetting.deviceSettings = [deviceSettingThree];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'motorSettingAlert').first();
      expect(component.length).toBe(0);
    });

    it('should not render motorSettingFormComponent when only preferredSubDevice is available', () => {
      const _initialState = { ...initialState };
      _initialState.deviceSetting.deviceSettings = [deviceSettingOne];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'motorSettingFormComponent').first();
      expect(component.length).toBe(0);
    });

    it('should not render motorSettingFormComponent when only autoShutDownTime is available', () => {
      const _initialState = { ...initialState };
      _initialState.deviceSetting.deviceSettings = [deviceSettingTwo];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'motorSettingFormComponent').first();
      expect(component.length).toBe(0);
    });

    it('should not render motorSettingFormComponent when only deviceSettingThree is available', () => {
      const _initialState = { ...initialState };
      _initialState.deviceSetting.deviceSettings = [deviceSettingThree];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'motorSettingFormComponent').first();
      expect(component.length).toBe(0);
    });

    it('should render motorSettingFormComponent when all deviceSettings are available', () => {
      const _initialState = { ...initialState };
      _initialState.deviceSetting.deviceSettings = [deviceSettingOne, deviceSettingTwo, deviceSettingThree];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'motorSettingFormComponent').first();
      expect(component.length).toBe(1);
    });

    it('should not render motorSettingFormComponent field when deviceSettings are of some other device', () => {
      const _initialState = { ...initialState };
      _initialState.deviceSetting.deviceSettings = [deviceSettingFour];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'motorSettingFormComponent').first();
      expect(component.length).toBe(0);
    });

    it('should not render motorSettingFormComponent field when deviceSettings are invalid', () => {
      const _initialState = { ...initialState };
      _initialState.deviceSetting.deviceSettings = [deviceSettingSeven];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'motorSettingFormComponent').first();
      expect(component.length).toBe(0);
    });

    it('should not render motorPreferredSubDeviceSelect field when all deviceSettings are available but no subDevices', () => {
      const _initialState = { ...initialState };
      _initialState.deviceSetting.deviceSettings = [deviceSettingOne, deviceSettingTwo, deviceSettingThree];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'motorPreferredSubDeviceSelect').first();
      expect(component.length).toBe(0);
    });

    it('should not render motorPreferredSubDeviceSelectOption field when all deviceSettings are available but no subDevices', () => {
      const _initialState = { ...initialState };
      _initialState.deviceSetting.deviceSettings = [deviceSettingOne, deviceSettingTwo, deviceSettingThree];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'motorPreferredSubDeviceSelectOption').first();
      expect(component.length).toBe(0);
    });

    it('should render motorAutoShutDownTimeInput field when all deviceSettings are available but no subDevices', () => {
      const _initialState = { ...initialState };
      _initialState.deviceSetting.deviceSettings = [deviceSettingOne, deviceSettingTwo, deviceSettingThree];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'motorAutoShutDownTimeInput').first();
      expect(component.length).toBe(1);
    });

    it('should render motorWaterLevelToStartInput field when all deviceSettings are available but no subDevices', () => {
      const _initialState = { ...initialState };
      _initialState.deviceSetting.deviceSettings = [deviceSettingOne, deviceSettingTwo, deviceSettingThree];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'motorWaterLevelToStartInput').first();
      expect(component.length).toBe(1);
    });

    it('should render motorSettingSubmitButton field when all deviceSettings are available but no subDevices', () => {
      const _initialState = { ...initialState };
      _initialState.deviceSetting.deviceSettings = [deviceSettingOne, deviceSettingTwo, deviceSettingThree];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'motorSettingSubmitButton').first();
      expect(component.length).toBe(1);
    });

    it('should render motorSettingCancelButton field when all deviceSettings are available but no subDevices', () => {
      const _initialState = { ...initialState };
      _initialState.deviceSetting.deviceSettings = [deviceSettingOne, deviceSettingTwo, deviceSettingThree];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'motorSettingCancelButton').first();
      expect(component.length).toBe(1);
    });

    it('should render motorPreferredSubDeviceSelect field when all deviceSettings and subDevices are available', () => {
      const _initialState = { ...initialState };
      _initialState.deviceSetting.deviceSettings = [deviceSettingOne, deviceSettingTwo, deviceSettingThree];
      _initialState.subDevice.subDevices = [subDeviceOne, subDeviceTwo];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'motorPreferredSubDeviceSelect').first();
      expect(component.length).toBe(1);
    });

    it('should render motorPreferredSubDeviceSelectOption field when all deviceSettings and subDevices are available', () => {
      const _initialState = { ...initialState };
      _initialState.deviceSetting.deviceSettings = [deviceSettingOne, deviceSettingTwo, deviceSettingThree];
      _initialState.subDevice.subDevices = [subDeviceOne, subDeviceTwo];
      wrapper = setupWrapper(_initialState);
      const selectButton = wrapper.find('[role="button"]').first();
      expect(selectButton.length).toBe(1);
      expect(selectButton.text()).toBe(subDeviceOne.name);
    });

    it('should close the dialog', () => {
      const _initialState = { ...initialState };
      _initialState.deviceSetting.deviceSettings = [deviceSettingOne, deviceSettingTwo, deviceSettingThree];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'motorSettingCancelButton').first();
      component.props().onClick();
      expect(store.getActions()).toEqual([{ type: 'CLOSE_SETTINGS' }]);
    });

    it('should submit form if valid', async () => {
      const _initialState = { ...initialState };
      _initialState.deviceSetting.deviceSettings = [deviceSettingOne, deviceSettingTwo, deviceSettingThree];
      _initialState.subDevice.subDevices = [subDeviceOne, subDeviceTwo];
      wrapper = setupWrapper(_initialState);
      const form = wrapper.find(`form`).first();
      await submitFormikForm(form);
      let formikAutoShutDownTimeInput = findByDataAttr(wrapper, 'motorAutoShutDownTimeInput').first();
      let formikWaterLevelToStartInput = findByDataAttr(wrapper, 'motorWaterLevelToStartInput').first();
      expect(formikAutoShutDownTimeInput.props().error).toBeUndefined();
      expect(formikWaterLevelToStartInput.props().error).toBeUndefined();
      expect(store.getActions()).toEqual([
        { type: 'SET_PROGRESS', payload: true },
        { type: 'SET_PROGRESS', payload: false },
        { type: 'SET_DEVICE_SETTING_ERROR', payload: { error: 'No Data' } },
      ]);
    });

    it('should not submit form if invalid', async () => {
      const _initialState = { ...initialState };
      _initialState.deviceSetting.deviceSettings = [deviceSettingOne, deviceSettingTwo, deviceSettingThree];
      _initialState.subDevice.subDevices = [subDeviceOne, subDeviceTwo];
      wrapper = setupWrapper(_initialState);
      const form = wrapper.find(`form`).first();
      const preferredSubDeviceInput = wrapper.find('input[name="preferredSubDevice"]').first();
      const autoShutDownTimeInput = wrapper.find(`input[name="autoShutDownTime"]`).first();
      const waterLevelToStartInput = wrapper.find(`input[name="waterLevelToStart"]`).first();

      // update fields
      await updateFormikField(preferredSubDeviceInput, 'preferredSubDevice', null);
      await updateFormikField(autoShutDownTimeInput, 'autoShutDownTime', 'string');
      await updateFormikField(waterLevelToStartInput, 'waterLevelToStart', 'string');
      preferredSubDeviceInput.update();
      autoShutDownTimeInput.update();
      waterLevelToStartInput.update();
      await submitFormikForm(form);
      let formikAutoShutDownTimeInput = findByDataAttr(wrapper, 'motorAutoShutDownTimeInput').first();
      let formikWaterLevelToStartInput = findByDataAttr(wrapper, 'motorWaterLevelToStartInput').first();

      expect(formikAutoShutDownTimeInput.props().error).toBe(true);
      expect(formikAutoShutDownTimeInput.props().helperText).toBe(
        'Please enter auto shutdown time in minutes (minutes must be a number)'
      );
      expect(formikWaterLevelToStartInput.props().error).toBe(true);
      expect(formikWaterLevelToStartInput.props().helperText).toBe('Please enter water level value in number format');
      expect(store.getActions().length).toBe(0);

      // update fields
      await updateFormikField(preferredSubDeviceInput, 'preferredSubDevice', null);
      await updateFormikField(autoShutDownTimeInput, 'autoShutDownTime', -1);
      await updateFormikField(waterLevelToStartInput, 'waterLevelToStart', -1);
      preferredSubDeviceInput.update();
      autoShutDownTimeInput.update();
      waterLevelToStartInput.update();
      await submitFormikForm(form);
      formikAutoShutDownTimeInput = findByDataAttr(wrapper, 'motorAutoShutDownTimeInput').first();
      formikWaterLevelToStartInput = findByDataAttr(wrapper, 'motorWaterLevelToStartInput').first();

      expect(formikAutoShutDownTimeInput.props().error).toBe(true);
      expect(formikAutoShutDownTimeInput.props().helperText).toBe('Auto shutdown time cannot be negative');
      expect(formikWaterLevelToStartInput.props().error).toBe(true);
      expect(formikWaterLevelToStartInput.props().helperText).toBe('Water level value cannot be negative');
      expect(store.getActions().length).toBe(0);
    });
  });
});
