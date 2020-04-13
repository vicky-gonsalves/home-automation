import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { checkProps, findByDataAttr, initialState } from '../../../_utils';
import { deviceOne } from '../../../_utils/fixtures/device.fixture';
import SettingIconButton from './settingIconButton';

let store;
let wrapper;
const props = {
  deviceId: deviceOne.deviceId,
  deviceName: deviceOne.name,
  dialogType: 'smartSwitch',
};
const mockStore = configureStore([thunk]);
const setupWrapper = _initialState => {
  store = mockStore(_initialState);
  return mount(
    <Provider store={store}>
      <SettingIconButton {...props} />
    </Provider>
  );
};

describe('SettingIconButton', () => {
  describe('Checking PropTypes', () => {
    it('should not throw a warning for SettingIconButton', () => {
      const propsErr = checkProps(SettingIconButton, props);
      expect(propsErr).toBeUndefined();
    });
  });

  describe('Components Testing with state', () => {
    beforeEach(() => {});
    afterEach(() => {
      wrapper.unmount();
    });

    it('should render without error', () => {
      const _initialState = { ...initialState };
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'settingIconButtonComponent').first();
      expect(component.length).toBe(1);
    });

    it('should open setting dialog', () => {
      const _initialState = { ...initialState };
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'settingIconButtonComponent').first();
      component.props().onClick();
      expect(store.getActions()).toEqual([
        {
          payload: { deviceId: props.deviceId, dialogType: props.dialogType, title: props.deviceName },
          type: 'OPEN_SETTINGS',
        },
      ]);
    });
  });
});
