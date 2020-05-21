import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import LogContextProvider from '../../../_contexts/log/LogContext.provider';
import { findByDataAttr, initialState } from '../../../_utils';
import { deviceOne } from '../../../_utils/fixtures/device.fixture';
import { logFive, logFour, logOne, logSix, logThree, logTwo } from '../../../_utils/fixtures/log.fixture';
import Stats from './Stats';

jest.mock('axios');

let store;
const props = {
  deviceId: deviceOne.deviceId,
};
const mockStore = configureStore([thunk]);
const setupWrapper = _initialState => {
  store = mockStore(_initialState);
  return mount(
    <Provider store={store}>
      <LogContextProvider>
        <Stats {...props} />
      </LogContextProvider>
    </Provider>
  );
};

describe('Stats', () => {
  describe('Components Testing with state', () => {
    let wrapper;
    beforeEach(() => {});

    afterEach(() => {
      wrapper.unmount();
      store.clearActions();
    });

    it('should render without error', () => {
      wrapper = setupWrapper(initialState);
      const component = findByDataAttr(wrapper, 'StatsCardContainer').first();
      expect(component.length).toBe(1);
    });

    it('should render StatsAlertComponent if no state', () => {
      wrapper = setupWrapper(initialState);
      const component = findByDataAttr(wrapper, 'StatsAlertComponent').first();
      expect(component.length).toBe(1);
    });

    it('should not render StatsListItemComponent if no logs', () => {
      wrapper = setupWrapper(initialState);
      const component = findByDataAttr(wrapper, 'StatsListItemComponent').first();
      expect(component.length).toBe(0);
    });

    it('should not render StatsListItemDeviceIconComponent if no logs', () => {
      wrapper = setupWrapper(initialState);
      const component = findByDataAttr(wrapper, 'StatsListItemDeviceIconComponent').first();
      expect(component.length).toBe(0);
    });

    it('should not render StatsListItemManualIconComponent if no logs', () => {
      wrapper = setupWrapper(initialState);
      const component = findByDataAttr(wrapper, 'StatsListItemManualIconComponent').first();
      expect(component.length).toBe(0);
    });

    it('should not render StatsListItemDeviceIconComponent if has logs but not triggered by device', () => {
      const _initialState = { ...initialState };
      _initialState.log.logs = [logOne, logTwo, logThree, logFour];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'StatsListItemDeviceIconComponent').first();
      expect(component.length).toBe(0);
    });

    it('should not render StatsListItemManualIconComponent if has logs but not triggered by user', () => {
      const _initialState = { ...initialState };
      _initialState.log.logs = [logFive, logSix];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'StatsListItemManualIconComponent').first();
      expect(component.length).toBe(0);
    });

    it('should render StatsListItemDeviceIconComponent if has logs and triggered by device', () => {
      const _initialState = { ...initialState };
      _initialState.log.logs = [logFive, logSix];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'StatsListItemDeviceIconComponent').first();
      expect(component.length).toBe(1);
    });

    it('should not render StatsListItemManualIconComponent if has logs but not triggered by user', () => {
      const _initialState = { ...initialState };
      _initialState.log.logs = [logOne, logTwo, logThree, logFour];
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'StatsListItemManualIconComponent').first();
      expect(component.length).toBe(1);
    });
  });
});
