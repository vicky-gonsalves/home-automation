import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { history } from '../../../_helpers/history/history';
import { checkProps, initialState } from '../../../_utils';
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
      <Router history={history}>
        <Layout {..._props} />
      </Router>
    </Provider>
  );
};
describe('Layout', () => {
  describe('Checking PropTypes', () => {
    it('should not throw a warning', () => {
      const propsErr = checkProps(Layout, props);
      expect(propsErr).toBeUndefined();
    });

    it('should throw a warning if props are missing', () => {
      const propsErr = checkProps(Layout, {});
      expect(propsErr).toBeDefined();
    });
  });
  describe('Component Test', () => {
    afterEach(() => {
      wrapper.unmount();
    });

    it('should render HomeLayout', () => {
      wrapper = setupWrapper(initialState, props);
      const component = wrapper.find(HomeLayout);
      expect(component).toHaveLength(1);
    });

    it('should render AdminLayout', () => {
      wrapper = setupWrapper(initialState, props);
      const component = wrapper.find(AdminLayout);
      expect(component).toHaveLength(1);
    });

    it('should render AuthLayout', () => {
      wrapper = setupWrapper(initialState, props);
      const component = wrapper.find(AuthLayout);
      expect(component).toHaveLength(1);
    });
  });
});
