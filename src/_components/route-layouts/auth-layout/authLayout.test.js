import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router';
import { Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { history } from '../../../_helpers/history/history';
import { checkProps, initialState } from '../../../_utils';
import AuthLayout from './authLayout';

const authLayoutPath = ['/signin', '/forgot-password', '/'];
let wrapper;
let store;
const props = {};
const mockStore = configureStore([thunk]);
const setupWrapper = (state, _props = {}) => {
  store = mockStore(state);
  return mount(
    <Provider store={store}>
      <Router history={history}>
        <AuthLayout {..._props} />
      </Router>
    </Provider>
  );
};
const renderLayoutPath = (component, index) => {
  return component.at(index).props().path;
};

describe('AuthLayout', () => {
  describe('Checking PropTypes', () => {
    it('should not throw a warning', () => {
      const propsErr = checkProps(AuthLayout, props);
      expect(propsErr).toBeUndefined();
    });
  });
  describe('Component Test', () => {
    afterEach(() => {
      wrapper.unmount();
    });

    it('should render Routes', () => {
      wrapper = setupWrapper(initialState, props);
      const component = wrapper.find(Route);
      expect(component).toHaveLength(3);
      expect(renderLayoutPath(component, 0)).toBe(authLayoutPath[0]);
      expect(renderLayoutPath(component, 1)).toBe(authLayoutPath[1]);
      expect(renderLayoutPath(component, 2)).toBe(authLayoutPath[2]);
    });
  });
});
