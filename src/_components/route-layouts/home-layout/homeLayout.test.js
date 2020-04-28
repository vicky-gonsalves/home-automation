import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router';
import { Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { history } from '../../../_helpers/history/history';
import { checkProps, findByDataAttr, getStateClone, initialState, wait } from '../../../_utils';
import HomeLayout from './homeLayout';

const homeLayoutPath = ['/home'];
let wrapper;
let store;
const props = {
  isLoggedIn: true,
};
const mockStore = configureStore([thunk]);
const setupWrapper = (state, _props = {}) => {
  store = mockStore(state);
  return mount(
    <Provider store={store}>
      <Router history={history}>
        <HomeLayout {..._props} />
      </Router>
    </Provider>
  );
};
const renderLayoutPath = (component, index) => {
  return component
    .at(index)
    .props()
    .render({ location: homeLayoutPath[index] }).props.to.pathname;
};

let innerStore;
const innerProps = {
  history,
  location: {},
  match: {},
};
const getInnerComponent = component => component.props().component().props.children.type._result;
const setUpInnerWrapper = (state, InnerComponent, _props = {}) => {
  innerStore = mockStore(state);
  return mount(
    <Provider store={store}>
      <Router history={history}>
        <InnerComponent {..._props} />
      </Router>
    </Provider>
  );
};

describe('HomeLayout', () => {
  describe('Checking PropTypes', () => {
    it('should not throw a warning', () => {
      const propsErr = checkProps(HomeLayout, props);
      expect(propsErr).toBeUndefined();
    });

    it('should throw a warning if props are missing', () => {
      const propsErr = checkProps(HomeLayout, {});
      expect(propsErr).toBeDefined();
    });
  });
  describe('Component Test', () => {
    afterEach(() => {
      wrapper.unmount();
    });

    it('should render components if user has been authenticated', () => {
      wrapper = setupWrapper(initialState, props);
      const component = wrapper.find(Route);
      expect(component).toHaveLength(homeLayoutPath.length);
      expect(component.at(0).props().path).toBe(homeLayoutPath[0]);
    });

    it('should redirect to signin if user is not authenticated', () => {
      const signInPath = '/signin';
      const _props = { isLoggedIn: false };
      wrapper = setupWrapper(initialState, _props);
      const component = wrapper.find(Route);
      expect(component).toHaveLength(homeLayoutPath.length);
      expect(renderLayoutPath(component, 0)).toBe(signInPath);
    });

    it('should redirect to signin if has no props', () => {
      // eslint-disable-next-line no-console
      console.error = jest.fn();
      const signInPath = '/signin';
      const _props = {};
      wrapper = setupWrapper(initialState, _props);
      const component = wrapper.find(Route);
      expect(component).toHaveLength(homeLayoutPath.length);
      expect(renderLayoutPath(component, 0)).toBe(signInPath);
      // eslint-disable-next-line no-console
      console.error.mockClear();
    });

    describe('Integration Test', () => {
      let innerWrapper;
      afterEach(() => {
        innerWrapper.unmount();
        innerStore.clearActions();
      });

      it('should render HomePage if isLoggedIn and route is /home', async () => {
        const _props = { isLoggedIn: true, isAdmin: true };
        wrapper = setupWrapper(initialState, _props);
        history.push('/home');
        await wait();
        const component = wrapper.find('[path="/home"]').first();
        const innerComponent = getInnerComponent(component);
        const _initialState = getStateClone();
        _initialState.user.isLoggedIn = true;
        _initialState.user.isAuthorized = true;
        _initialState.socket.connected = true;
        innerWrapper = setUpInnerWrapper(_initialState, innerComponent, innerProps);
        const itemsInInnerComponent = findByDataAttr(innerWrapper, 'homePageContainer');
        expect(innerWrapper.props()).toBeDefined();
        expect(itemsInInnerComponent.length).toBeTruthy();
      });
    });
  });
});
