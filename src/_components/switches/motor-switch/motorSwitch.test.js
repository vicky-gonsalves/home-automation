import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { checkProps, findByDataAttr, initialState } from '../../../_utils';
import { deviceOne } from '../../../_utils/fixtures/device.fixture';
import { subDeviceOne } from '../../../_utils/fixtures/subDevice.fixture';
import { subDeviceParamOne, subDeviceParamThree, subDeviceParamTwo } from '../../../_utils/fixtures/subDeviceParam.fixture';
import MotorSwitch from './motorSwitch';

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
      <MotorSwitch {...props} />
    </Provider>
  );
};

describe('MotorSwitch Component', () => {
  describe('Checking PropTypes', () => {
    it('should not throw a warning', () => {
      const propsErr = checkProps(MotorSwitch, props);
      expect(propsErr).toBeUndefined();
    });
    it('should throw a warning', () => {
      const propsErr = checkProps(MotorSwitch, {});
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
      const _props = {};
      store = mockStore(initialState);
      wrapper = mount(
        <Provider store={store}>
          <MotorSwitch {..._props} />
        </Provider>
      );
      const component = findByDataAttr(wrapper, 'motorSwitchContainer').first();
      expect(component.length).toBe(0);
      // eslint-disable-next-line no-console
      console.error.mockClear();
    });

    it('should not render if no states', () => {
      wrapper = setupWrapper(initialState);
      const component = findByDataAttr(wrapper, 'motorSwitchContainer').first();
      expect(component.length).toBe(0);
    });

    it('should render motorSwitchAlertComponent if only subDeviceParam without paramName status is available', () => {
      const _initialState = { ...initialState };
      _initialState.subDeviceParam.subDeviceParams = [subDeviceParamOne, subDeviceParamTwo];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'motorSwitchAlertComponent').first();
      expect(component.length).toBe(1);
    });

    it('should not render motorSwitchAlertComponent if subDeviceParam with paramName status is available', () => {
      const _initialState = { ...initialState };
      _initialState.subDeviceParam.subDeviceParams = [subDeviceParamThree];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'motorSwitchAlertComponent').first();
      expect(component.length).toBe(0);
    });

    it('should not render motorSwitchAlertComponent if no states', () => {
      wrapper = setupWrapper(initialState);
      const component = findByDataAttr(wrapper, 'motorSwitchAlertComponent').first();
      expect(component.length).toBe(0);
    });

    it('should render motorSwitchContainer if subDeviceParam with paramName status is available', () => {
      const _initialState = { ...initialState };
      _initialState.subDeviceParam.subDeviceParams = [subDeviceParamThree];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'motorSwitchContainer').first();
      expect(component.length).toBe(1);
    });

    it('should render motorSwitchOffLabelItemComponent if subDeviceParam with paramName status is available', () => {
      const _initialState = { ...initialState };
      _initialState.subDeviceParam.subDeviceParams = [subDeviceParamThree];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'motorSwitchOffLabelItemComponent').first();
      expect(component.length).toBe(1);
    });

    it('should render motorSwitchOnLabelItemComponent if subDeviceParam with paramName status is available', () => {
      const _initialState = { ...initialState };
      _initialState.subDeviceParam.subDeviceParams = [subDeviceParamThree];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'motorSwitchOnLabelItemComponent').first();
      expect(component.length).toBe(1);
    });

    it('should render motorSwitchItemComponent if subDeviceParam with paramName status is available', () => {
      const _initialState = { ...initialState };
      _initialState.subDeviceParam.subDeviceParams = [subDeviceParamThree];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'motorSwitchItemComponent').first();
      expect(component.length).toBe(1);
    });

    it('should call handleChange and set paramValue on if motorSwitchItemComponent is clicked', () => {
      const _initialState = { ...initialState };
      _initialState.subDeviceParam.subDeviceParams = [subDeviceParamThree];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'motorSwitchItemComponent').first();
      component.props().onChange(subDeviceParamThree);
      expect(store.getActions()).toEqual([
        {
          payload: {
            ...subDeviceParamThree,
            paramValue: 'on',
          },
          type: 'SUB_DEVICE_PARAM_UPDATE_STATUS',
        },
        { payload: true, type: 'SET_PROGRESS' },
      ]);
    });

    it('should call handleChange and set paramValue off if motorSwitchItemComponent is clicked', () => {
      const _initialState = { ...initialState };
      const subDeviceParam = { ...subDeviceParamThree, paramValue: 'on' };
      _initialState.subDeviceParam.subDeviceParams = [subDeviceParam];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'motorSwitchItemComponent').first();
      component.props().onChange(subDeviceParamThree);
      expect(store.getActions()).toEqual([
        {
          payload: { ...subDeviceParamThree },
          type: 'SUB_DEVICE_PARAM_UPDATE_STATUS',
        },
        { payload: true, type: 'SET_PROGRESS' },
      ]);
    });
  });
});
