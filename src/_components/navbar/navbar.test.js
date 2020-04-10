import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { checkProps, findByDataAttr, initialState } from '../../_utils';
import { userOne } from '../../_utils/fixtures/user.fixture';
import config from '../../config';
import Navbar from './navbar';

let wrapper;
let store;
const mockStore = configureStore([thunk]);
const props = {
  appName: config.appName,
  'data-test': '',
};

const setupWrapper = _initialState => {
  store = mockStore(_initialState);
  return mount(
    <Provider store={store}>
      <Navbar {...props} />
    </Provider>
  );
};

describe('Navbar Component', () => {
  describe('Checking PropTypes', () => {
    it('should not throw a warning', () => {
      const propsErr = checkProps(Navbar, props);
      expect(propsErr).toBeUndefined();
    });
  });

  describe('Components Testing with State', () => {
    beforeEach(() => {});
    afterEach(() => {
      wrapper.unmount();
      store.clearActions();
    });

    it('should render without error', () => {
      wrapper = setupWrapper(initialState);
      const component = findByDataAttr(wrapper, 'navbar').first();
      expect(component.length).toBe(1);
    });

    it('should render app name on navbar', () => {
      wrapper = setupWrapper(initialState);
      const component = findByDataAttr(wrapper, 'appName').first();
      expect(component.length).toBe(1);
      expect(component.text()).toBe(config.appName);
    });

    it('should render toolbar', () => {
      wrapper = setupWrapper(initialState);
      const component = findByDataAttr(wrapper, 'toolbar').first();
      expect(component.length).toBe(1);
    });

    it('should render icon on navbar', () => {
      wrapper = setupWrapper(initialState);
      const component = findByDataAttr(wrapper, 'icon').first();
      expect(component.length).toBe(1);
    });

    it('should not render loggedInMenuContainer on navbar if no state', () => {
      wrapper = setupWrapper(initialState);
      const component = findByDataAttr(wrapper, 'loggedInMenuContainer').first();
      expect(component.length).toBe(0);
    });

    it('should render loggedInMenuContainer on navbar if logged in', () => {
      const _initialState = { ...initialState };
      _initialState.user = { ...userOne };
      _initialState.user.isLoggedIn = true;
      _initialState.user.tokens = { access: {}, refresh: {} };
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'loggedInMenuContainer').first();
      expect(component.length).toBe(1);
    });

    it('should open menu', () => {
      const _initialState = { ...initialState };
      _initialState.user = { ...userOne };
      _initialState.user.isLoggedIn = true;
      _initialState.user.tokens = { access: {}, refresh: {} };
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'MenuOpenerButtonIconComponent').first();
      component.simulate('click');
      const componentTwo = findByDataAttr(wrapper, 'MenuComponent').first();
      expect(componentTwo.props().open).toBeTruthy();
    });

    it('should close menu', () => {
      const _initialState = { ...initialState };
      _initialState.user = { ...userOne };
      _initialState.user.isLoggedIn = true;
      _initialState.user.tokens = { access: {}, refresh: {} };
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'MenuComponent').first();
      component.props().onClose();
      expect(component.props().open).toBeFalsy();
    });

    it('should logout user', () => {
      const _initialState = { ...initialState };
      _initialState.user = { ...userOne };
      _initialState.user.isLoggedIn = true;
      _initialState.user.tokens = { access: {}, refresh: {} };
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'MenuItemComponent').first();
      component.props().onClick();
      expect(store.getActions()).toEqual([
        { type: 'SIGN_OUT' },
        { type: 'DISCONNECTED' },
        { type: 'DEVICE_REMOVE_ALL' },
        { type: 'SHARED_DEVICE_REMOVE_ALL' },
        { type: 'SUB_DEVICE_REMOVE_ALL' },
        { type: 'DEVICE_PARAM_REMOVE_ALL' },
        { type: 'SUB_DEVICE_PARAM_REMOVE_ALL' },
        { type: 'DEVICE_SETTING_REMOVE_ALL' },
        { type: 'SUB_DEVICE_SETTING_REMOVE_ALL' },
        { type: 'ONLINE_DEVICE_REMOVE_ALL' },
        { type: 'LOG_REMOVE_ALL' },
      ]);
    });
  });
});
