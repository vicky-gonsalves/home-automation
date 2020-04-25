import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { history } from '../../../_helpers/history/history';
import { checkProps, findByDataAttr, getStateClone, initialState } from '../../../_utils';
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

    it('should render navbarComponent', () => {
      const _initialState = getStateClone();
      wrapper = setupWrapper(_initialState, props);
      const component = findByDataAttr(wrapper, 'navbarComponent').first();
      expect(component).toHaveLength(1);
    });

    it('should render footerComponent', () => {
      const _initialState = getStateClone();
      wrapper = setupWrapper(_initialState, props);
      const component = findByDataAttr(wrapper, 'footerComponent').first();
      expect(component).toHaveLength(1);
    });

    it('should render adminDrawerComponent if adminDrawer.show is true', () => {
      const _initialState = getStateClone();
      _initialState.adminDrawer.show = true;
      wrapper = setupWrapper(_initialState, props);
      const component = findByDataAttr(wrapper, 'adminDrawerComponent').first();
      expect(component).toHaveLength(1);
    });

    it('should not render adminDrawerComponent if adminDrawer.show is false', () => {
      const _initialState = getStateClone();
      _initialState.adminDrawer.show = false;
      wrapper = setupWrapper(_initialState, props);
      const component = findByDataAttr(wrapper, 'adminDrawerComponent');
      expect(component).toHaveLength(0);
    });
  });
});
