import { mount } from 'enzyme';
import { find } from 'lodash';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { history } from '../../../../_helpers/history/history';
import { checkProps, findByDataAttr, getStateClone } from '../../../../_utils';
import UserListPage from './UserListPage';

let wrapper;
let store;
const mockStore = configureStore([thunk]);
const props = {
  classes: {
    root: '',
    footer: '',
  },
  history,
  location: {},
  match: {},
};

const setupWrapper = (_initialState, _props) => {
  store = mockStore(_initialState);
  return mount(
    <Provider store={store}>
      <UserListPage {..._props} />
    </Provider>
  );
};

describe('UserListPage Component', () => {
  describe('Checking PropTypes', () => {
    it('should not throw a warning', () => {
      const propsErr = checkProps(UserListPage, props);
      expect(propsErr).toBeUndefined();
    });
  });

  describe('Components Testing with State', () => {
    beforeEach(() => {});
    afterEach(() => {
      wrapper.unmount();
      if (store) {
        store.clearActions();
      }
    });

    it('should render adminPageContainerForUserList', () => {
      const _initialState = getStateClone();
      _initialState.user.isLoggedIn = true;
      _initialState.user.tokens = { access: {} };
      _initialState.socket.connected = true;
      wrapper = setupWrapper(_initialState, props);
      const component = findByDataAttr(wrapper, 'adminPageContainerForUserList').first();
      expect(component.length).toBe(1);
    });

    it('should not render userListPageComponent if not logged in and not connected', () => {
      const _initialState = getStateClone();
      wrapper = setupWrapper(_initialState, props);
      const component = findByDataAttr(wrapper, 'adminPageContainerForUserList').first();
      expect(component).toHaveLength(0);
    });

    it('should not render userListPageComponent if not logged in and not connected', () => {
      const _initialState = getStateClone();
      wrapper = setupWrapper(_initialState, props);
      const component = findByDataAttr(wrapper, 'userListPageComponent');
      expect(component).toHaveLength(0);
    });

    it('should  render userListPageComponent if logged in, has token and connected', () => {
      const _initialState = getStateClone();
      _initialState.user.isLoggedIn = true;
      _initialState.user.tokens = { access: {} };
      _initialState.socket.connected = true;
      wrapper = setupWrapper(_initialState, props);
      const component = findByDataAttr(wrapper, 'userListPageComponent').first();
      expect(component).toHaveLength(1);
    });

    it('should not render userListPageComponent if not logged in, has token and connected', () => {
      const _initialState = getStateClone();
      _initialState.user.isLoggedIn = false;
      _initialState.user.tokens = { access: {} };
      _initialState.socket.connected = true;
      wrapper = setupWrapper(_initialState, props);
      const component = findByDataAttr(wrapper, 'userListPageComponent');
      expect(component).toHaveLength(0);
    });

    it('should not render userListPageComponent if not logged in, has no token and connected', () => {
      const _initialState = getStateClone();
      _initialState.user.isLoggedIn = false;
      _initialState.socket.connected = true;
      wrapper = setupWrapper(_initialState, props);
      const component = findByDataAttr(wrapper, 'userListPageComponent');
      expect(component).toHaveLength(0);
    });

    it('should show drawer if its not already shown', () => {
      const _initialState = getStateClone();
      _initialState.adminDrawer.show = false;
      wrapper = setupWrapper(_initialState, props);
      expect(find(store.getActions(), ['type', 'SHOW_ADMIN_DRAWER'])).toBeTruthy();
    });

    it('should not show drawer if its already shown', () => {
      const _initialState = getStateClone();
      _initialState.adminDrawer.show = true;
      wrapper = setupWrapper(_initialState, props);
      expect(find(store.getActions(), ['type', 'SHOW_ADMIN_DRAWER'])).toBeFalsy();
    });

    it('should show burger if its not already shown', () => {
      const _initialState = getStateClone();
      _initialState.siteSetting.burger = false;
      wrapper = setupWrapper(_initialState, props);
      expect(find(store.getActions(), ['type', 'SHOW_BURGER'])).toBeTruthy();
    });

    it('should not show burger if its already shown', () => {
      const _initialState = getStateClone();
      _initialState.siteSetting.burger = true;
      wrapper = setupWrapper(_initialState, props);
      expect(find(store.getActions(), ['type', 'SHOW_BURGER'])).toBeFalsy();
    });
  });
});
