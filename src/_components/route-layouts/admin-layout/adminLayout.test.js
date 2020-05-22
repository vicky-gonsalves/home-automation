import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router';
import { Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import SiteSettingContextProvider from '../../../_contexts/site-setting/SiteSettingContext.provider';
import UserContextProvider from '../../../_contexts/user/UserContext.provider';
import { history } from '../../../_helpers/history/history';
import { checkProps, findByDataAttr, getStateClone, initialState, wait, getInnerComponent } from '../../../_utils';
import AdminLayout from './adminLayout';

const adminLayoutPath = ['/admin', '/users', '/users/new', '/users/edit/:id', '/users/view/:id'];
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
        <SiteSettingContextProvider>
          <Router history={history}>
            <AdminLayout {..._props} />
          </Router>
        </SiteSettingContextProvider>
      </UserContextProvider>
    </Provider>
  );
};
const renderLayoutPath = (component, index) => {
  return component
    .at(index)
    .props()
    .render({ location: adminLayoutPath[index] }).props.to.pathname;
};

let innerStore;
const innerProps = {
  history,
  location: {},
  match: {},
};

const setUpInnerWrapper = (_state, InnerComponent, _props = {}) => {
  innerStore = mockStore(_state);
  return mount(
    <Provider store={innerStore}>
      <UserContextProvider>
        <SiteSettingContextProvider>
          <Router history={history}>
            <InnerComponent {..._props} />
          </Router>
        </SiteSettingContextProvider>
      </UserContextProvider>
    </Provider>
  );
};

describe('AdminLayout', () => {
  describe('Checking PropTypes', () => {
    it('should not throw a warning', () => {
      const propsErr = checkProps(AdminLayout, props);
      expect(propsErr).toBeUndefined();
    });

    it('should throw a warning if props are missing', () => {
      const propsErr = checkProps(AdminLayout, {});
      expect(propsErr).toBeUndefined();
    });
  });
  describe('Component Test', () => {
    afterEach(() => {
      wrapper.unmount();
      store.clearActions();
    });

    it('should render components if user has been authenticated and role is admin', () => {
      wrapper = setupWrapper(initialState, props);
      const component = wrapper.find(Route);
      expect(component).toHaveLength(adminLayoutPath.length);
      expect(component.at(0).props().path).toBe(adminLayoutPath[0]);
      expect(component.at(1).props().path).toBe(adminLayoutPath[1]);
      expect(component.at(2).props().path).toBe(adminLayoutPath[2]);
      expect(component.at(3).props().path).toBe(adminLayoutPath[3]);
      expect(component.at(4).props().path).toBe(adminLayoutPath[4]);
    });

    it('should redirect to signin if user is not authenticated', () => {
      const signInPath = '/signin';
      const _props = { isLoggedIn: false, isAdmin: false };
      wrapper = setupWrapper(initialState, _props);
      const component = wrapper.find(Route);
      expect(component).toHaveLength(adminLayoutPath.length);
      expect(renderLayoutPath(component, 0)).toBe(signInPath);
      expect(renderLayoutPath(component, 1)).toBe(signInPath);
      expect(renderLayoutPath(component, 2)).toBe(signInPath);
      expect(renderLayoutPath(component, 3)).toBe(signInPath);
      expect(renderLayoutPath(component, 4)).toBe(signInPath);
    });

    it('should redirect to signin if user is not admin', () => {
      const signInPath = '/signin';
      const _props = { isLoggedIn: true, isAdmin: false };
      wrapper = setupWrapper(initialState, _props);
      const component = wrapper.find(Route);
      expect(component).toHaveLength(adminLayoutPath.length);
      expect(renderLayoutPath(component, 0)).toBe(signInPath);
      expect(renderLayoutPath(component, 1)).toBe(signInPath);
      expect(renderLayoutPath(component, 2)).toBe(signInPath);
      expect(renderLayoutPath(component, 3)).toBe(signInPath);
      expect(renderLayoutPath(component, 4)).toBe(signInPath);
    });

    it('should redirect to signin if user is admin but not logged in', () => {
      const signInPath = '/signin';
      const _props = { isLoggedIn: false, isAdmin: true };
      wrapper = setupWrapper(initialState, _props);
      const component = wrapper.find(Route);
      expect(component).toHaveLength(adminLayoutPath.length);
      expect(renderLayoutPath(component, 0)).toBe(signInPath);
      expect(renderLayoutPath(component, 1)).toBe(signInPath);
      expect(renderLayoutPath(component, 2)).toBe(signInPath);
      expect(renderLayoutPath(component, 3)).toBe(signInPath);
      expect(renderLayoutPath(component, 4)).toBe(signInPath);
    });

    it('should redirect to signin if has no props', () => {
      // eslint-disable-next-line no-console
      console.error = jest.fn();
      const signInPath = '/signin';
      const _props = {};
      wrapper = setupWrapper(initialState, _props);
      const component = wrapper.find(Route);
      expect(component).toHaveLength(adminLayoutPath.length);
      expect(renderLayoutPath(component, 0)).toBe(signInPath);
      expect(renderLayoutPath(component, 1)).toBe(signInPath);
      expect(renderLayoutPath(component, 2)).toBe(signInPath);
      expect(renderLayoutPath(component, 3)).toBe(signInPath);
      expect(renderLayoutPath(component, 4)).toBe(signInPath);
      // eslint-disable-next-line no-console
      console.error.mockClear();
    });

    describe('Integration Test', () => {
      let innerWrapper;
      afterEach(() => {
        innerWrapper.unmount();
        innerStore.clearActions();
      });

      it('should render UserListPage if isLoggedIn and isAdmin and route is /users', async () => {
        const _props = { isLoggedIn: true, isAdmin: true };
        wrapper = setupWrapper(initialState, _props);
        history.push('/users');
        await wait();
        const component = wrapper.find('[path="/users"]').first();
        const innerComponent = await getInnerComponent(component);
        const _initialState = getStateClone();
        _initialState.user.isLoggedIn = true;
        _initialState.user.isAuthorized = true;
        _initialState.user.tokens = { access: {} };
        _initialState.socket.connected = true;
        innerWrapper = setUpInnerWrapper(_initialState, innerComponent.default, innerProps);
        const itemsInInnerComponent = findByDataAttr(innerWrapper, 'userListPageComponent');
        expect(innerWrapper.props()).toBeDefined();
        expect(itemsInInnerComponent.length).toBeTruthy();
      });

      it('should render UserEditorPage if isLoggedIn and isAdmin and route is /users/new', async () => {
        const _props = { isLoggedIn: true, isAdmin: true };
        wrapper = setupWrapper(initialState, _props);
        history.push('/users/new');
        await wait();
        const component = wrapper.find('[path="/users/new"]').first();
        const innerComponent = await getInnerComponent(component);
        const _initialState = getStateClone();
        _initialState.user.isLoggedIn = true;
        _initialState.user.isAuthorized = true;
        _initialState.socket.connected = true;
        innerWrapper = setUpInnerWrapper(_initialState, innerComponent.default, innerProps);
        const itemsInInnerComponent = findByDataAttr(innerWrapper, 'userEditorPageContainer');
        expect(innerWrapper.props()).toBeDefined();
        expect(itemsInInnerComponent.length).toBeTruthy();
      });

      it('should render DashboardPage if isLoggedIn and isAdmin and route is /admin', async () => {
        const _props = { isLoggedIn: true, isAdmin: true };
        wrapper = setupWrapper(initialState, _props);
        history.push('/admin');
        await wait();
        const component = wrapper.find('[path="/admin"]').first();
        const innerComponent = await getInnerComponent(component);
        const _initialState = getStateClone();
        _initialState.user.isLoggedIn = true;
        _initialState.user.isAuthorized = true;
        _initialState.socket.connected = true;
        innerWrapper = setUpInnerWrapper(_initialState, innerComponent.default, innerProps);
        const itemsInInnerComponent = findByDataAttr(innerWrapper, 'dashboardPageContainer');
        expect(innerWrapper.props()).toBeDefined();
        expect(itemsInInnerComponent.length).toBeTruthy();
      });
    });
  });
});
