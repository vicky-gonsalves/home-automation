import { mount, shallow } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { clickButton, findByDataAttr, initialState, wait } from '../../../_utils';
import { deviceOne } from '../../../_utils/fixtures/device.fixture';
import CardActionFooter from './CardActionFooter';

jest.mock('axios');
jest.mock('../../alerts/tank-alert/tankAlert', () => ({ deviceId }) => <div>{deviceId}</div>);
jest.mock('../../alerts/smart-switch-alert/smartSwitchAlert', () => ({ deviceId }) => <div>{deviceId}</div>);
jest.mock('../stats/Stats', () => ({ deviceId }) => <div>{deviceId}</div>);

let store;
const props = {
  deviceId: deviceOne.deviceId,
  deviceVariant: deviceOne.variant,
};
const mockStore = configureStore([thunk]);
const setupWrapper = _initialState => {
  store = mockStore(_initialState);
  return mount(
    <Provider store={store}>
      <CardActionFooter {...props} />
    </Provider>
  );
};

describe('CardActionFooter', () => {
  describe('Components Testing', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<CardActionFooter {...props} />);
    });
    afterEach(() => {
      wrapper.unmount();
    });

    it('should render without error', () => {
      const component = findByDataAttr(wrapper, 'cardActionFooterContainer').first();
      expect(component.length).toBe(1);
    });
  });

  describe('Components Testing with state', () => {
    let wrapper;
    beforeEach(() => {});

    afterEach(() => {
      wrapper.unmount();
      store.clearActions();
    });

    it('should toggle expanded', async () => {
      wrapper = setupWrapper(initialState);
      const component = findByDataAttr(wrapper, 'collapseButtonComponent').first();
      await clickButton(component);
      await wait(1000);
      component.update();
      const component2 = findByDataAttr(wrapper, 'collapseComponent').first();
      expect(component2.props().in).toBe(true);
    });
  });
});
