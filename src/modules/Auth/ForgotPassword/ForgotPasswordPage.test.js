import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { history } from '../../../_helpers/history/history';
import { checkProps, findByDataAttr, getStateClone } from '../../../_utils';
import ForgotPasswordPage from './ForgotPasswordPage';

jest.mock('axios');
let wrapper;
let store;

const props = {
  history,
  location: {},
  match: {},
};
const mockStore = configureStore([thunk]);
const setupWrapper = (state, _props = {}) => {
  store = mockStore(state);
  return mount(
    <Provider store={store}>
      <ForgotPasswordPage {..._props} />
    </Provider>
  );
};

describe('NotFound Page', () => {
  describe('Checking PropTypes', () => {
    it('should not throw a warning', () => {
      const propsErr = checkProps(ForgotPasswordPage, props);
      expect(propsErr).toBeUndefined();
    });
  });

  describe('Components Testing', () => {
    afterEach(() => {
      wrapper.unmount();
      store.clearActions();
    });

    it('should render without error', () => {
      const _initialState = getStateClone();
      wrapper = setupWrapper(_initialState, props);
      const component = findByDataAttr(wrapper, 'forgotPasswordPageContainer').first();
      expect(component.length).toBe(1);
    });

    it('should hide drawer if its not already hidden', () => {
      const _initialState = getStateClone();
      _initialState.socket.connected = true;
      _initialState.user.isLoggedIn = true;
      _initialState.user.isAuthorized = true;
      _initialState.adminDrawer.show = true;
      wrapper = setupWrapper(_initialState, props);
      expect(store.getActions()).toEqual([{ type: 'HIDE_ADMIN_DRAWER' }]);
    });

    it('should not hide drawer if its already hidden', () => {
      const _initialState = getStateClone();
      _initialState.socket.connected = true;
      _initialState.user.isLoggedIn = true;
      _initialState.user.isAuthorized = true;
      _initialState.adminDrawer.show = false;
      wrapper = setupWrapper(_initialState, props);
      expect(store.getActions()).toHaveLength(0);
    });

    it('should hide burger if its not already hidden', () => {
      const _initialState = getStateClone();
      _initialState.socket.connected = true;
      _initialState.user.isLoggedIn = true;
      _initialState.user.isAuthorized = true;
      _initialState.siteSetting.burger = true;
      wrapper = setupWrapper(_initialState, props);
      expect(store.getActions()).toEqual([{ type: 'HIDE_BURGER' }]);
    });

    it('should not hide burger if its already hidden', () => {
      const _initialState = getStateClone();
      _initialState.socket.connected = true;
      _initialState.user.isLoggedIn = true;
      _initialState.user.isAuthorized = true;
      _initialState.siteSetting.burger = false;
      wrapper = setupWrapper(_initialState, props);
      expect(store.getActions()).toHaveLength(0);
    });
  });
});
