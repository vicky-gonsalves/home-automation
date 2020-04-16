import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { checkProps, findByDataAttr, initialState } from '../../_utils';
import Toaster, { Toaster as ToasterClass } from './toaster';

jest.mock('axios');

let wrapper;
let store;
const mockStore = configureStore([thunk]);
const props = {
  loginError: null,
  settingError: null,
  subDeviceSettingError: null,
  subDeviceParamError: null,
};

const setupWrapper = _initialState => {
  store = mockStore(_initialState);
  return mount(
    <Provider store={store}>
      <Toaster {...props} />
    </Provider>
  );
};

describe('Toaster Component', () => {
  describe('Checking PropTypes', () => {
    it('should not throw a warning', () => {
      const propsErr = checkProps(Toaster, props);
      expect(propsErr).toBeUndefined();
    });
    it('should not throw warning if no props', () => {
      const propsErr = checkProps(Toaster, {});
      expect(propsErr).toBeUndefined();
    });
  });

  describe('Components Testing with State', () => {
    beforeEach(() => {});
    afterEach(() => {
      wrapper.unmount();
      store.clearActions();
    });

    it('should render if no props', () => {
      // eslint-disable-next-line no-console
      console.error = jest.fn();
      const _props = {};
      store = mockStore(initialState);
      wrapper = mount(
        <Provider store={store}>
          <Toaster {..._props} />
        </Provider>
      );
      const component = findByDataAttr(wrapper, 'toaster').first();
      expect(component.length).toBe(1);
      expect(component.props().open).toBeFalsy();
      expect(component.props().message).toBeFalsy();
      // eslint-disable-next-line no-console
      console.error.mockClear();
    });

    it('should render if no states', () => {
      wrapper = setupWrapper(initialState);
      const component = findByDataAttr(wrapper, 'toaster').first();
      expect(component.length).toBe(1);
      expect(component.props().open).toBeFalsy();
      expect(component.props().message).toBeNull();
    });

    it('should open toaster if has loginError', () => {
      const _initialState = { ...initialState };
      _initialState.user.loginError = 'Error';
      store = mockStore(_initialState);
      wrapper = mount(
        <Provider store={store}>
          <Toaster />
        </Provider>
      );
      const component = findByDataAttr(wrapper, 'toaster').first();
      expect(component.length).toBe(1);
      expect(component.props().open).toBeFalsy();
      expect(component.props().message).toBe('Error');
    });

    it('should open toaster if has device setting error', () => {
      const _initialState = { ...initialState };
      _initialState.deviceSetting.settingError = 'Error';
      store = mockStore(_initialState);
      wrapper = mount(
        <Provider store={store}>
          <Toaster />
        </Provider>
      );
      const component = findByDataAttr(wrapper, 'toaster').first();
      expect(component.length).toBe(1);
      expect(component.props().open).toBeFalsy();
      expect(component.props().message).toBe('Error');
    });

    it('should open toaster if has subDeviceSetting setting error', () => {
      const _initialState = { ...initialState };
      _initialState.subDeviceSetting.settingError = 'Error';
      store = mockStore(_initialState);
      wrapper = mount(
        <Provider store={store}>
          <Toaster />
        </Provider>
      );
      const component = findByDataAttr(wrapper, 'toaster').first();
      expect(component.length).toBe(1);
      expect(component.props().open).toBeFalsy();
      expect(component.props().message).toBe('Error');
    });

    it('should open toaster if has subDeviceParam error', () => {
      const _initialState = { ...initialState };
      _initialState.subDeviceParam.subDeviceParamError = 'Error';
      store = mockStore(_initialState);
      wrapper = mount(
        <Provider store={store}>
          <Toaster />
        </Provider>
      );
      const component = findByDataAttr(wrapper, 'toaster').first();
      expect(component.length).toBe(1);
      expect(component.props().open).toBeFalsy();
      expect(component.props().message).toBe('Error');
    });

    it('should open toaster if error updated and if has loginError', () => {
      const _initialState = { ...initialState };
      store = mockStore(_initialState);
      const _props = { loginError: 'Error' };
      wrapper = mount(<ToasterClass {..._props} />);
      wrapper.instance().componentDidUpdate();
      const component = findByDataAttr(wrapper, 'toaster').first();
      expect(component.length).toBe(1);
      expect(component.props().open).toBeFalsy();
      expect(component.props().message).toBe('Error');
    });

    it('should open toaster if error updated and if has settingError', () => {
      const _initialState = { ...initialState };
      store = mockStore(_initialState);
      const _props = { settingError: 'Error' };
      wrapper = mount(<ToasterClass {..._props} />);
      wrapper.instance().componentDidUpdate();
      const component = findByDataAttr(wrapper, 'toaster').first();
      expect(component.length).toBe(1);
      expect(component.props().open).toBeFalsy();
      expect(component.props().message).toBe('Error');
    });

    it('should open toaster if error updated and if has subDeviceSettingError', () => {
      const _initialState = { ...initialState };
      store = mockStore(_initialState);
      const _props = { subDeviceSettingError: 'Error' };
      wrapper = mount(<ToasterClass {..._props} />);
      wrapper.instance().componentDidUpdate();
      const component = findByDataAttr(wrapper, 'toaster').first();
      expect(component.length).toBe(1);
      expect(component.props().open).toBeFalsy();
      expect(component.props().message).toBe('Error');
    });

    it('should open toaster if error updated and if has subDeviceParamError', () => {
      const _initialState = { ...initialState };
      store = mockStore(_initialState);
      const _props = { subDeviceParamError: 'Error' };
      wrapper = mount(<ToasterClass {..._props} />);
      wrapper.instance().componentDidUpdate();
      const component = findByDataAttr(wrapper, 'toaster').first();
      expect(component.length).toBe(1);
      expect(component.props().open).toBeFalsy();
      expect(component.props().message).toBe('Error');
    });

    it('should open toaster if error updated and if has loginError', () => {
      const clearLoginError = jest.fn();
      const _initialState = { ...initialState };
      store = mockStore(_initialState);
      const _props = { loginError: 'Error', clearLoginError };
      wrapper = mount(<ToasterClass {..._props} />);
      wrapper.instance().componentDidUpdate();
      wrapper.instance().handleClose();
      wrapper.instance().componentDidUpdate();
      expect(clearLoginError).toHaveBeenCalled();
    });

    it('should open toaster if error updated and if has clearDeviceSettingError', () => {
      const clearDeviceSettingError = jest.fn();
      const _initialState = { ...initialState };
      store = mockStore(_initialState);
      const _props = { settingError: 'Error', clearDeviceSettingError };
      wrapper = mount(<ToasterClass {..._props} />);
      wrapper.instance().componentDidUpdate();
      wrapper.instance().handleClose();
      wrapper.instance().componentDidUpdate();
      expect(clearDeviceSettingError).toHaveBeenCalled();
    });

    it('should open toaster if error updated and if has clearSubDeviceSettingError', () => {
      const clearSubDeviceSettingError = jest.fn();
      const _initialState = { ...initialState };
      store = mockStore(_initialState);
      const _props = { subDeviceSettingError: 'Error', clearSubDeviceSettingError };
      wrapper = mount(<ToasterClass {..._props} />);
      wrapper.instance().componentDidUpdate();
      wrapper.instance().handleClose();
      wrapper.instance().componentDidUpdate();
      expect(clearSubDeviceSettingError).toHaveBeenCalled();
    });

    it('should open toaster if error updated and if has clearSubDeviceParamError', () => {
      const clearSubDeviceParamError = jest.fn();
      const _initialState = { ...initialState };
      store = mockStore(_initialState);
      const _props = { subDeviceParamError: 'Error', clearSubDeviceParamError };
      wrapper = mount(<ToasterClass {..._props} />);
      wrapper.instance().componentDidUpdate();
      wrapper.instance().handleClose();
      wrapper.instance().componentDidUpdate();
      expect(clearSubDeviceParamError).toHaveBeenCalled();
    });

    it('should open toaster if error updated and if has clearSubDeviceParamError and if toaster is not open', () => {
      const clearSubDeviceParamError = jest.fn();
      const _initialState = { ...initialState };
      store = mockStore(_initialState);
      const _props = { subDeviceParamError: 'Error', clearSubDeviceParamError };
      wrapper = mount(<ToasterClass {..._props} />);
      wrapper.instance().componentDidUpdate();
      wrapper.instance().state.open = false;
      wrapper.instance().handleClose();
      wrapper.instance().componentDidUpdate();
      expect(clearSubDeviceParamError).not.toHaveBeenCalled();
    });
  });
});
