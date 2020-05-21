import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import DeviceSettingContextProvider from '../../../_contexts/device-setting/DeviceSettingContext.provider';
import SettingDialogContextProvider from '../../../_contexts/setting-dialog/SettingDialogContext.provider';
import SubDeviceSettingContextProvider from '../../../_contexts/sub-device-setting/SubDeviceSettingContext.provider';
import { checkProps, findByDataAttr, initialState } from '../../../_utils';
import { dialogOne, dialogTwo } from '../../../_utils/fixtures/dialog.fixture';
import SettingDialog from './settingDialog';

jest.mock('axios');
jest.mock('../../forms/motor-setting-form/MotorSettingForm', () => () => <div>mock</div>);
jest.mock('../../forms/smart-switch-setting-form/SmartSwitchSettingForm', () => () => <div>mock</div>);

let store;
const props = {};
const mockStore = configureStore([thunk]);
const setupWrapper = _initialState => {
  store = mockStore(_initialState);
  return mount(
    <Provider store={store}>
      <DeviceSettingContextProvider>
        <SubDeviceSettingContextProvider>
          <SettingDialogContextProvider>
            <SettingDialog {...props} />
          </SettingDialogContextProvider>
        </SubDeviceSettingContextProvider>
      </DeviceSettingContextProvider>
    </Provider>
  );
};

describe('SettingDialog', () => {
  describe('Checking PropTypes', () => {
    it('should not throw a warning', () => {
      const propsErr = checkProps(SettingDialog, props);
      expect(propsErr).toBeUndefined();
    });
  });

  describe('Components Testing with State', () => {
    let wrapper;
    beforeEach(() => {});

    afterEach(() => {
      wrapper.unmount();
      store.clearActions();
    });

    it('should render settingDialogContainer without error', () => {
      wrapper = setupWrapper(initialState);
      const component = findByDataAttr(wrapper, 'settingDialogContainer').first();
      expect(component.length).toBe(1);
    });

    it('should not render dialogTitleComponent if no state', () => {
      wrapper = setupWrapper({});
      const component = findByDataAttr(wrapper, 'dialogTitleComponent').first();
      expect(component.length).toBe(0);
    });

    it('should not render motorSettingFormComponent if no state', async () => {
      wrapper = setupWrapper(initialState);
      const component = findByDataAttr(wrapper, 'motorSettingFormComponent').first();
      expect(component.length).toBe(0);
    });

    it('should not render smartSwitchSettingFormComponent if no state', async () => {
      wrapper = setupWrapper(initialState);
      const component = findByDataAttr(wrapper, 'smartSwitchSettingFormComponent').first();
      expect(component.length).toBe(0);
    });

    it('should not render linearProgressComponent if no progress', async () => {
      wrapper = setupWrapper(initialState);
      const component = findByDataAttr(wrapper, 'linearProgressComponent').first();
      expect(component.length).toBe(0);
    });

    it('should not render settingDialogComponent if no state', async () => {
      wrapper = setupWrapper(initialState);
      const component = findByDataAttr(wrapper, 'settingDialogComponent').first();
      expect(component.length).toBe(0);
    });

    it('should not render settingDialogComponent if has settingDialog but open is false', async () => {
      const _initialState = { ...initialState };
      _initialState.settingDialog = { ...dialogOne };
      _initialState.settingDialog.open = false;
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'settingDialogComponent').first();
      expect(component.length).toBe(0);
    });

    it('should not render settingDialogComponent if has settingDialog but title is null', async () => {
      const _initialState = { ...initialState };
      _initialState.settingDialog = { ...dialogOne };
      _initialState.settingDialog.title = null;
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'settingDialogComponent').first();
      expect(component.length).toBe(0);
    });

    it('should render settingDialogComponent if has settingDialog', async () => {
      const _initialState = { ...initialState };
      _initialState.settingDialog = { ...dialogOne };
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'settingDialogComponent').first();
      expect(component.length).toBe(1);
    });

    it('should render dialogTitleComponent without error', () => {
      const _initialState = { ...initialState };
      _initialState.settingDialog = { ...dialogOne };
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'dialogTitleComponent').first();
      expect(component.length).toBe(1);
      expect(component.text()).toBe(`${dialogOne.title} Settings`);
    });

    it('should not render dialogTitleComponent is settingDialog has no deviceId', () => {
      const _initialState = { ...initialState };
      _initialState.settingDialog = { ...dialogOne };
      _initialState.settingDialog.deviceId = null;
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'dialogTitleComponent').first();
      expect(component.length).toBe(0);
    });

    it('should not render dialogTitleComponent is settingDialog has no title', () => {
      const _initialState = { ...initialState };
      _initialState.settingDialog = { ...dialogOne };
      _initialState.settingDialog.title = null;
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'dialogTitleComponent').first();
      expect(component.length).toBe(0);
    });

    it('should render motorSettingFormComponent if has settingDialog state and dialogType is tank', async () => {
      const _initialState = { ...initialState };
      _initialState.settingDialog = { ...dialogOne };
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'motorSettingFormComponent').first();
      expect(component.length).toBe(1);
    });

    it('should not render motorSettingFormComponent if has settingDialog state and dialogType is smartSwitch', async () => {
      const _initialState = { ...initialState };
      _initialState.settingDialog = { ...dialogTwo };
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'motorSettingFormComponent').first();
      expect(component.length).toBe(0);
    });

    it('should not render motorSettingFormComponent if no deviceId', async () => {
      const _initialState = { ...initialState };
      _initialState.settingDialog = { ...dialogOne };
      _initialState.settingDialog.deviceId = null;
      wrapper = setupWrapper(initialState);
      const component = findByDataAttr(wrapper, 'motorSettingFormComponent').first();
      expect(component.length).toBe(0);
    });

    it('should not render smartSwitchSettingFormComponent if no deviceId', async () => {
      const _initialState = { ...initialState };
      _initialState.settingDialog = { ...dialogTwo };
      _initialState.settingDialog.deviceId = null;
      wrapper = setupWrapper(initialState);
      const component = findByDataAttr(wrapper, 'smartSwitchSettingFormComponent').first();
      expect(component.length).toBe(0);
    });

    it('should render smartSwitchSettingFormComponent if has settingDialog state and dialogType is smartSwitch', async () => {
      const _initialState = { ...initialState };
      _initialState.settingDialog = { ...dialogTwo };
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'smartSwitchSettingFormComponent').first();
      expect(component.length).toBe(1);
    });

    it('should not render smartSwitchSettingFormComponent if has settingDialog state and dialogType is tank', async () => {
      const _initialState = { ...initialState };
      _initialState.settingDialog = { ...dialogOne };
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'smartSwitchSettingFormComponent').first();
      expect(component.length).toBe(0);
    });

    it('should not render linearProgressComponent if has deviceSetting state and isFetching is true but no settingDialog', async () => {
      const _initialState = { ...initialState };
      _initialState.deviceSetting.isFetching = true;
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'linearProgressComponent').first();
      expect(component.length).toBe(0);
    });

    it('should not render linearProgressComponent if has subDeviceSetting state and isFetching is true but no settingDialog', async () => {
      const _initialState = { ...initialState };
      _initialState.subDeviceSetting.isFetching = true;
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'linearProgressComponent').first();
      expect(component.length).toBe(0);
    });

    it('should render linearProgressComponent if has deviceSetting state and isFetching is true', async () => {
      const _initialState = { ...initialState };
      _initialState.deviceSetting.isFetching = true;
      _initialState.settingDialog = { ...dialogOne };
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'linearProgressComponent').first();
      expect(component.length).toBe(1);
    });

    it('should render linearProgressComponent if has subDeviceSetting state and isFetching is true', async () => {
      const _initialState = { ...initialState };
      _initialState.subDeviceSetting.isFetching = true;
      _initialState.settingDialog = { ...dialogOne };
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'linearProgressComponent').first();
      expect(component.length).toBe(1);
    });

    it('should close dialog without error', async () => {
      const _initialState = { ...initialState };
      _initialState.settingDialog = { ...dialogOne };
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'settingDialogComponent').first();
      expect(component.length).toBe(1);
      component.props().onClose();
      expect(store.getActions()).toEqual([{ type: 'CLOSE_SETTINGS' }]);
    });

    it('should reset dialog after exit', async () => {
      const _initialState = { ...initialState };
      _initialState.settingDialog = { ...dialogOne };
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'settingDialogComponent').first();
      expect(component.length).toBe(1);
      component.props().onExited();
      expect(store.getActions()).toEqual([{ type: 'RESET_SETTINGS' }]);
    });
  });
});
