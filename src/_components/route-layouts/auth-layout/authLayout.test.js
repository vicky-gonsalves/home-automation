import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router';
import { Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import UserContextProvider from '../../../_contexts/user/UserContext.provider';
import { history } from '../../../_helpers/history/history';
import { checkProps, findByDataAttr, getStateClone, initialState, wait, getInnerComponent } from '../../../_utils';
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
        <UserContextProvider>
          <AuthLayout {..._props} />
        </UserContextProvider>
      </Router>
    </Provider>
  );
};
const renderLayoutPath = (component, index) => {
  return component.at(index).props().path;
};

let innerStore;
const innerProps = {
  history,
  location: {},
  match: {},
};

const setUpInnerWrapper = (state, InnerComponent, _props = {}) => {
  innerStore = mockStore(state);
  return mount(
    <Provider store={store}>
      <Router history={history}>
        <UserContextProvider>
          <InnerComponent {..._props} />
        </UserContextProvider>
      </Router>
    </Provider>
  );
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

    describe('Integration Test', () => {
      let innerWrapper;
      afterEach(() => {
        innerWrapper.unmount();
        innerStore.clearActions();
      });

      it('should render SignInPage if route is /signin', async () => {
        const _props = { isLoggedIn: true, isAdmin: true };
        wrapper = setupWrapper(initialState, _props);
        history.push('/signin');
        await wait();
        const component = wrapper.find('[path="/signin"]').first();
        const innerComponent = await getInnerComponent(component);
        const _initialState = getStateClone();
        innerWrapper = setUpInnerWrapper(_initialState, innerComponent.default, innerProps);
        const itemsInInnerComponent = findByDataAttr(innerWrapper, 'signInContainer');
        expect(innerWrapper.props()).toBeDefined();
        expect(itemsInInnerComponent.length).toBeTruthy();
      });

      it('should render PublicPage if route is /', async () => {
        const _props = { isLoggedIn: true, isAdmin: true };
        wrapper = setupWrapper(initialState, _props);
        history.push('/');
        await wait();
        const component = wrapper.find('[path="/"]').first();
        const innerComponent = await getInnerComponent(component);
        const _initialState = getStateClone();
        innerWrapper = setUpInnerWrapper(_initialState, innerComponent.default, innerProps);
        const itemsInInnerComponent = findByDataAttr(innerWrapper, 'publicPageContainer');
        expect(innerWrapper.props()).toBeDefined();
        expect(itemsInInnerComponent.length).toBeTruthy();
      });

      it('should render ForgotPasswordPage if route is /forgot-password', async () => {
        const _props = { isLoggedIn: true, isAdmin: true };
        wrapper = setupWrapper(initialState, _props);
        history.push('/forgot-password');
        await wait();
        const component = wrapper.find('[path="/forgot-password"]').first();
        const innerComponent = await getInnerComponent(component);
        const _initialState = getStateClone();
        innerWrapper = setUpInnerWrapper(_initialState, innerComponent.default, innerProps);
        const itemsInInnerComponent = findByDataAttr(innerWrapper, 'forgotPasswordPageContainer');
        expect(innerWrapper.props()).toBeDefined();
        expect(itemsInInnerComponent.length).toBeTruthy();
      });
    });
  });
});
