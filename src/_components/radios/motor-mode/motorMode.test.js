import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { checkProps, findByDataAttr, initialState } from '../../../_utils';
import { deviceOne } from '../../../_utils/fixtures/device.fixture';
import { subDeviceOne } from '../../../_utils/fixtures/subDevice.fixture';
import { subDeviceParamNine, subDeviceParamOne, subDeviceParamTwo } from '../../../_utils/fixtures/subDeviceParam.fixture';
import MotorMode from './motorMode';

jest.mock('axios');

let wrapper;
let store;
const mockStore = configureStore([thunk]);
const props = {
  deviceId: deviceOne.deviceId,
  name: deviceOne.name,
  subDeviceId: subDeviceOne.subDeviceId,
};

const setupWrapper = _initialState => {
  store = mockStore(_initialState);
  return mount(
    <Provider store={store}>
      <MotorMode {...props} />
    </Provider>
  );
};

describe('MotorMode Component', () => {
  describe('Checking PropTypes', () => {
    it('should not throw a warning', () => {
      const propsErr = checkProps(MotorMode, props);
      expect(propsErr).toBeUndefined();
    });
    it('should throw a warning', () => {
      const propsErr = checkProps(MotorMode, {});
      expect(propsErr).toBeDefined();
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
      const _props = {
        deviceId: null,
        name: null,
        subDeviceId: null,
      };
      store = mockStore(initialState);
      wrapper = mount(
        <Provider store={store}>
          <MotorMode {..._props} />
        </Provider>
      );
      const component = findByDataAttr(wrapper, 'motorModeComponent').first();
      expect(component.length).toBe(0);
      // eslint-disable-next-line no-console
      console.error.mockClear();
    });

    it('should not render if no states', () => {
      wrapper = setupWrapper(initialState);
      const component = findByDataAttr(wrapper, 'motorModeComponent').first();
      expect(component.length).toBe(0);
    });

    it('should not render if has subDeviceParams but no paramValue', () => {
      const _initialState = { ...initialState };
      const subDeviceParam = { ...subDeviceParamOne };
      delete subDeviceParam.paramValue;
      _initialState.subDeviceParam.subDeviceParams = [subDeviceParam];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'motorModeComponent').first();
      expect(component.length).toBe(0);
    });

    it('should not render if has subDeviceParams but no paramValue', () => {
      const _initialState = { ...initialState };
      const subDeviceParam = { ...subDeviceParamOne };
      delete subDeviceParam.paramValue;
      _initialState.subDeviceParam.subDeviceParams = [subDeviceParam];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'motorModeComponent').first();
      expect(component.length).toBe(0);
    });

    it('should not render if has some other subDeviceParams', () => {
      const _initialState = { ...initialState };
      _initialState.subDeviceParam.subDeviceParams = [subDeviceParamTwo];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'motorModeComponent').first();
      expect(component.length).toBe(0);
    });

    it('should not render if has subDeviceParams but not having paaramName with mode', () => {
      const _initialState = { ...initialState };
      _initialState.subDeviceParam.subDeviceParams = [subDeviceParamOne];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'motorModeComponent').first();
      expect(component.length).toBe(0);
    });

    it('should render if has correct subDeviceParams', () => {
      const _initialState = { ...initialState };
      _initialState.subDeviceParam.subDeviceParams = [subDeviceParamNine];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'motorModeComponent').first();
      expect(component.length).toBe(1);
    });

    it('should render motorModeRadioGroupComponent if has correct subDeviceParams', () => {
      const _initialState = { ...initialState };
      _initialState.subDeviceParam.subDeviceParams = [subDeviceParamNine];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'motorModeRadioGroupComponent').first();
      expect(component.length).toBe(1);
    });

    it('should render motorModeAutomaticComponent if has correct subDeviceParams', () => {
      const _initialState = { ...initialState };
      _initialState.subDeviceParam.subDeviceParams = [subDeviceParamNine];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'motorModeAutomaticComponent').first();
      expect(component.length).toBe(1);
    });

    it('should render motorModeManualComponent if has correct subDeviceParams', () => {
      const _initialState = { ...initialState };
      _initialState.subDeviceParam.subDeviceParams = [subDeviceParamNine];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'motorModeManualComponent').first();
      expect(component.length).toBe(1);
    });

    it('should handle change event of motorModeAutomaticComponent', () => {
      const _initialState = { ...initialState };
      _initialState.subDeviceParam.subDeviceParams = [subDeviceParamNine];
      wrapper = setupWrapper(_initialState);
      const component = wrapper.find('input[type="radio"][value="automatic"]').first();
      component.simulate('change');
      expect(store.getActions()).toEqual([]);
    });

    it('should handle change event of motorModeManualComponent', () => {
      const _initialState = { ...initialState };
      _initialState.subDeviceParam.subDeviceParams = [subDeviceParamNine];
      wrapper = setupWrapper(_initialState);
      const component = wrapper.find('input[type="radio"][value="manual"]').first();
      component.simulate('change');
      expect(store.getActions().length).toBeTruthy();
      expect(store.getActions()[1].payload).toEqual(true);
    });
  });
});
