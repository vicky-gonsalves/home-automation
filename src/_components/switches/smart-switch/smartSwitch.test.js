import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import SubDeviceParamContextProvider from '../../../_contexts/sub-device-param/SubDeviceParamContext.provider';
import { subDeviceParamService } from '../../../_services';
import { checkProps, findByDataAttr, initialState } from '../../../_utils';
import { deviceTwo } from '../../../_utils/fixtures/device.fixture';
import { subDeviceThree } from '../../../_utils/fixtures/subDevice.fixture';
import { subDeviceParamFive, subDeviceParamFour, subDeviceParamTen } from '../../../_utils/fixtures/subDeviceParam.fixture';
import SmartSwitch from './smartSwitch';

jest.mock('axios');

let wrapper;
let store;
const mockStore = configureStore([thunk]);
const props = {
  deviceId: deviceTwo.deviceId,
  name: deviceTwo.name,
  subDeviceId: subDeviceThree.subDeviceId,
  show: true,
};

const setupWrapper = _initialState => {
  store = mockStore(_initialState);
  return mount(
    <Provider store={store}>
      <SubDeviceParamContextProvider>
        <SmartSwitch {...props} />
      </SubDeviceParamContextProvider>
    </Provider>
  );
};

describe('SmartSwitch Component', () => {
  describe('Checking PropTypes', () => {
    it('should not throw a warning', () => {
      const propsErr = checkProps(SmartSwitch, props);
      expect(propsErr).toBeUndefined();
    });
    it('should throw a warning', () => {
      const propsErr = checkProps(SmartSwitch, {});
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
          <SubDeviceParamContextProvider>
            <SmartSwitch {..._props} />
          </SubDeviceParamContextProvider>
        </Provider>
      );
      const component = findByDataAttr(wrapper, 'smartSwitchContainer').first();
      expect(component.length).toBe(0);
      // eslint-disable-next-line no-console
      console.error.mockClear();
    });

    it('should not render if no states', () => {
      wrapper = setupWrapper(initialState);
      const component = findByDataAttr(wrapper, 'smartSwitchContainer').first();
      expect(component.length).toBe(0);
    });

    it('should render smartSwitchIconComponent if no states', () => {
      wrapper = setupWrapper(initialState);
      const component = findByDataAttr(wrapper, 'smartSwitchIconComponent').first();
      expect(component.length).toBe(1);
    });

    it('should render smartSwitchIconComponent if subDeviceParam with paramName status is available', () => {
      const _initialState = { ...initialState };
      _initialState.subDeviceParam.subDeviceParams = [subDeviceParamFour];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'smartSwitchIconComponent').first();
      expect(component.length).toBe(1);
    });

    it('should render smartSwitchAlertComponent if only subDeviceParam without paramName status is available', () => {
      const _initialState = { ...initialState };
      _initialState.subDeviceParam.subDeviceParams = [subDeviceParamTen];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'smartSwitchAlertComponent').first();
      expect(component.length).toBe(1);
    });

    it('should not render smartSwitchAlertComponent if subDeviceParam with paramName status is available', () => {
      const _initialState = { ...initialState };
      _initialState.subDeviceParam.subDeviceParams = [subDeviceParamFour];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'smartSwitchAlertComponent').first();
      expect(component.length).toBe(0);
    });

    it('should not render smartSwitchAlertComponent if no states', () => {
      wrapper = setupWrapper(initialState);
      const component = findByDataAttr(wrapper, 'smartSwitchAlertComponent').first();
      expect(component.length).toBe(0);
    });

    it('should render smartSwitchContainer if subDeviceParam with paramName status is available', () => {
      const _initialState = { ...initialState };
      _initialState.subDeviceParam.subDeviceParams = [subDeviceParamFour];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'smartSwitchContainer').first();
      expect(component.length).toBe(1);
    });

    it('should render smartSwitchComponent if subDeviceParam with paramName status is available', () => {
      const _initialState = { ...initialState };
      _initialState.subDeviceParam.subDeviceParams = [subDeviceParamFour];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'smartSwitchComponent').first();
      expect(component.length).toBe(1);
    });

    it('should not render smartSwitchAllComponent if only one subDeviceParam with paramName status is available', () => {
      const _initialState = { ...initialState };
      _initialState.subDeviceParam.subDeviceParams = [subDeviceParamFour];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'smartSwitchAllComponent').first();
      expect(component.length).toBe(0);
    });

    it('should not render smartSwitchAllComponent if name is not All and if more than one subDeviceParam with paramName status is available', () => {
      const _initialState = { ...initialState };
      _initialState.subDeviceParam.subDeviceParams = [subDeviceParamFour, subDeviceParamFive];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'smartSwitchAllComponent').first();
      expect(component.length).toBe(0);
    });

    it('should render smartSwitchAllComponent if name is All and if more than one subDeviceParam with paramName status is available', () => {
      const _initialState = { ...initialState };
      _initialState.subDeviceParam.subDeviceParams = [subDeviceParamFour, subDeviceParamFive];
      const _props = {
        deviceId: deviceTwo.deviceId,
        name: 'All',
        show: true,
      };
      store = mockStore(initialState);
      wrapper = mount(
        <Provider store={store}>
          <SubDeviceParamContextProvider>
            <SmartSwitch {..._props} />
          </SubDeviceParamContextProvider>
        </Provider>
      );
      const component = findByDataAttr(wrapper, 'smartSwitchAllComponent').first();
      expect(component.length).toBe(1);
    });

    it('should call handleAllChange', () => {
      subDeviceParamService.updateAllSubDeviceParamStatus = jest.fn().mockResolvedValue({});
      const spy = jest.spyOn(subDeviceParamService, 'updateAllSubDeviceParamStatus');
      const _initialState = { ...initialState };
      _initialState.subDeviceParam.subDeviceParams = [subDeviceParamFour, subDeviceParamFive];
      const _props = {
        deviceId: deviceTwo.deviceId,
        name: 'All',
        show: true,
      };
      store = mockStore(initialState);
      wrapper = mount(
        <Provider store={store}>
          <SubDeviceParamContextProvider>
            <SmartSwitch {..._props} />
          </SubDeviceParamContextProvider>
        </Provider>
      );
      const component = wrapper.find('input[type="checkbox"]').first();
      component.simulate('change');
      expect(spy.mock.calls).toEqual([[deviceTwo.deviceId, 'on']]);
      subDeviceParamService.updateAllSubDeviceParamStatus.mockReset();
    });

    it('should call handleAllChange', () => {
      subDeviceParamService.updateAllSubDeviceParamStatus = jest.fn().mockResolvedValue({});
      const spy = jest.spyOn(subDeviceParamService, 'updateAllSubDeviceParamStatus');
      const _initialState = { ...initialState };
      _initialState.subDeviceParam.subDeviceParams = [
        { ...subDeviceParamFour, paramValue: 'on' },
        { ...subDeviceParamFive, paramValue: 'on' },
      ];
      const _props = {
        deviceId: deviceTwo.deviceId,
        name: 'All',
        show: true,
      };
      store = mockStore(initialState);
      wrapper = mount(
        <Provider store={store}>
          <SubDeviceParamContextProvider>
            <SmartSwitch {..._props} />
          </SubDeviceParamContextProvider>
        </Provider>
      );
      const component = wrapper.find('input[type="checkbox"]').first();
      component.simulate('change');
      expect(spy.mock.calls).toEqual([[deviceTwo.deviceId, 'off']]);
      subDeviceParamService.updateAllSubDeviceParamStatus.mockReset();
    });

    it('should call handleChange', () => {
      subDeviceParamService.updateSubDeviceParamStatus = jest.fn().mockResolvedValue({});
      const spy = jest.spyOn(subDeviceParamService, 'updateSubDeviceParamStatus');
      const _initialState = { ...initialState };
      _initialState.subDeviceParam.subDeviceParams = [subDeviceParamFour];
      wrapper = setupWrapper(_initialState);
      const component = wrapper.find('input[type="checkbox"]').first();
      component.simulate('change');
      expect(spy.mock.calls).toEqual([[subDeviceParamFour]]);
      subDeviceParamService.updateAllSubDeviceParamStatus.mockReset();
    });

    it('should call handleChange when status is on', () => {
      subDeviceParamService.updateSubDeviceParamStatus = jest.fn().mockResolvedValue({});
      const spy = jest.spyOn(subDeviceParamService, 'updateSubDeviceParamStatus');
      const _initialState = { ...initialState };
      const subDeviceParam = { ...subDeviceParamFour, paramValue: 'on' };
      _initialState.subDeviceParam.subDeviceParams = [subDeviceParam];
      wrapper = setupWrapper(_initialState);
      const component = wrapper.find('input[type="checkbox"]').first();
      component.simulate('change');
      expect(spy.mock.calls).toEqual([[{ ...subDeviceParamFour, paramValue: 'off' }]]);
      subDeviceParamService.updateAllSubDeviceParamStatus.mockReset();
    });
  });
});
