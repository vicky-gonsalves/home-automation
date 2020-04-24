import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { history } from '../../_helpers/history/history';
import { checkProps, findByDataAttr, initialState } from '../../_utils';
import { admin, userOne } from '../../_utils/fixtures/user.fixture';
import config from '../../config';
import Navbar from './navbar';

jest.mock('axios');

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
      expect(store.getActions()).toEqual([{ type: 'SIGN_OUT' }, { type: 'DISCONNECTED' }, { type: 'CLEAR_DATA' }]);
    });

    it('should not have drawerIconButtonComponent if logged in user is not admin', () => {
      const _initialState = { ...initialState };
      _initialState.user = { ...userOne };
      _initialState.user.isLoggedIn = true;
      _initialState.user.tokens = { access: {}, refresh: {} };
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'drawerIconButtonComponent');
      expect(component).toHaveLength(0);
    });

    it('should have drawerIconButtonComponent if logged in user is admin and burger is true', () => {
      const _initialState = { ...initialState };
      _initialState.user = { ...admin };
      _initialState.user.isLoggedIn = true;
      _initialState.user.tokens = { access: {}, refresh: {} };
      _initialState.siteSetting.burger = true;
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'drawerIconButtonComponent').first();
      expect(component.length).toBe(1);
    });

    it('should not have drawerIconButtonComponent if logged in user is admin and burger is false', () => {
      const _initialState = { ...initialState };
      _initialState.user = { ...admin };
      _initialState.user.isLoggedIn = true;
      _initialState.user.tokens = { access: {}, refresh: {} };
      _initialState.siteSetting.burger = false;
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'drawerIconButtonComponent');
      expect(component.length).toBe(0);
    });

    it('should not have drawerIconButtonComponent if logged in user is admin and no siteSetting', () => {
      const _initialState = { ...initialState };
      _initialState.user = { ...admin };
      _initialState.user.isLoggedIn = true;
      _initialState.user.tokens = { access: {}, refresh: {} };
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'drawerIconButtonComponent');
      expect(component.length).toBe(0);
    });

    it('should not have adminPanelMenuItem if logged in user is not admin', () => {
      const _initialState = { ...initialState };
      _initialState.user = { ...userOne };
      _initialState.user.isLoggedIn = true;
      _initialState.user.tokens = { access: {}, refresh: {} };
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'adminPanelMenuItem');
      expect(component).toHaveLength(0);
    });

    it('should have adminPanelMenuItem if logged in user is admin', () => {
      const _initialState = { ...initialState };
      _initialState.user = { ...admin };
      _initialState.user.isLoggedIn = true;
      _initialState.user.tokens = { access: {}, refresh: {} };
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'adminPanelMenuItem').first();
      expect(component.length).toBe(1);
    });

    it('should have close drawer if logged in user is admin and adminDrawer is open', async () => {
      const _initialState = { ...initialState };
      _initialState.user = { ...admin };
      _initialState.adminDrawer.open = true;
      _initialState.user.isLoggedIn = true;
      _initialState.user.tokens = { access: {}, refresh: {} };
      _initialState.siteSetting.burger = true;
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'drawerIconButtonComponent').first();
      component.props().onClick();
      expect(store.getActions()).toEqual([{ type: 'CLOSE_ADMIN_DRAWER' }]);
    });

    it('should have open drawer if logged in user is admin and adminDrawer is closed', async () => {
      const _initialState = { ...initialState };
      _initialState.user = { ...admin };
      _initialState.adminDrawer.open = false;
      _initialState.user.isLoggedIn = true;
      _initialState.user.tokens = { access: {}, refresh: {} };
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'drawerIconButtonComponent').first();
      component.props().onClick();
      expect(store.getActions()).toEqual([{ type: 'OPEN_ADMIN_DRAWER' }]);
    });

    it('should navigate to specified path', async () => {
      history.push = jest.fn();
      const _initialState = { ...initialState };
      _initialState.user = { ...admin };
      _initialState.user.isLoggedIn = true;
      _initialState.user.tokens = { access: {}, refresh: {} };
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'adminPanelMenuItem').first();
      component.props().onClick('/admin');
      expect(history.push).toHaveBeenCalled();
      history.push.mockClear();
    });
  });
});
