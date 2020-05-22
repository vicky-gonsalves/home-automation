import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import SiteSettingContextProvider from '../../../_contexts/site-setting/SiteSettingContext.provider';
import UserContextProvider from '../../../_contexts/user/UserContext.provider';
import { history } from '../../../_helpers/history/history';
import { checkProps, findByDataAttr, getStateClone } from '../../../_utils';
import AdminLayout from '../admin-layout/adminLayout';
import AuthLayout from '../auth-layout/authLayout';
import HomeLayout from '../home-layout/homeLayout';
import Layout from './layout';

let wrapper;
let store;
const props = {
  isAdmin: true,
  isLoggedIn: true,
};
const mockStore = configureStore([thunk]);
const setupWrapper = (state, _props = {}) => {
  store = mockStore(state);
  return mount(
    <Provider store={store}>
      <UserContextProvider>
        <Router history={history}>
          <Layout {..._props} />
        </Router>
      </UserContextProvider>
    </Provider>
  );
};
describe('Layout', () => {
  describe('Checking PropTypes', () => {
    it('should not throw a warning', () => {
      const propsErr = checkProps(Layout, props);
      expect(propsErr).toBeUndefined();
    });

    it('should not throw warning if props are missing', () => {
      const propsErr = checkProps(Layout, {});
      expect(propsErr).toBeUndefined();
    });
  });
  describe('Component Test', () => {
    afterEach(() => {
      wrapper.unmount();
      store.clearActions();
    });

    it('should render HomeLayout', () => {
      const _initialState = getStateClone();
      wrapper = setupWrapper(_initialState, props);
      const component = wrapper.find(HomeLayout);
      expect(component).toHaveLength(1);
    });

    it('should render AdminLayout', () => {
      const _initialState = getStateClone();
      wrapper = setupWrapper(_initialState, props);
      const component = wrapper.find(AdminLayout);
      expect(component).toHaveLength(1);
    });

    it('should render AuthLayout', () => {
      const _initialState = getStateClone();
      wrapper = setupWrapper(_initialState, props);
      const component = wrapper.find(AuthLayout);
      expect(component).toHaveLength(1);
    });
  });
});
