import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { userActions } from './_actions';
import { history } from './_helpers/history/history';
import { findByDataAttr, findByDataAttrWhenMounted, getStateClone, initialState, wait } from './_utils';
import { userOne } from './_utils/fixtures/user.fixture';
import App from './App';
import DashboardPage from './modules/Admin/Dashboard/DashboardPage';
import UserEditorPage from './modules/Admin/User/UserEditor/UserEditorPage';
import UserListPage from './modules/Admin/User/UserList/UserListPage';
import SignInPage from './modules/Auth/SignIn/SignInPage';
import HomePage from './modules/Home/HomePage';

jest.mock('axios');

let wrapper;
let store;
const mockStore = configureStore([thunk]);
const setupWrapper = (state, _props = {}) => {
  store = mockStore(state);
  return mount(
    <Provider store={store}>
      <App {..._props} />
    </Provider>
  );
};

describe('App', () => {
  describe('Components Testing', () => {
    beforeEach(() => {
      userActions.me = jest.fn().mockRejectedValueOnce('Error');
      history.location = { pathname: '/', search: '', hash: '', state: undefined };
    });

    afterEach(() => {
      wrapper.unmount();
      store.clearActions();
      userActions.me.mockRestore();
    });

    it('should render without error', () => {
      wrapper = setupWrapper(initialState);
      const component = findByDataAttrWhenMounted(wrapper, 'appContainer').first();
      expect(component).toHaveLength(1);
    });

    it('should have routerComponent', () => {
      wrapper = setupWrapper(initialState);
      const component = findByDataAttr(wrapper, 'routerComponent').first();
      expect(component).toHaveLength(1);
    });

    it('should have switchComponent', () => {
      wrapper = setupWrapper(initialState);
      const component = findByDataAttr(wrapper, 'switchComponent').first();
      expect(component).toHaveLength(1);
    });

    it('should not have linearProgressComponent visible', () => {
      const _initialState = getStateClone();
      _initialState.user.isFetching = false;
      _initialState.device.isFetchingDevice = false;
      wrapper = setupWrapper(initialState);
      const component = findByDataAttr(wrapper, 'linearProgressComponent').first();
      expect(component).toHaveLength(1);
      expect(component.props().className).toBeDefined();
    });

    it('should have linearProgressComponent visible if user isFetching and path is home', () => {
      const _initialState = getStateClone();
      _initialState.user.isFetching = true;
      history.location = { pathname: '/home', search: '', hash: '', state: undefined };
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'linearProgressComponent').first();
      expect(component).toHaveLength(1);
      expect(component.props().className).toBe('');
    });

    it('should have linearProgressComponent visible if device isFetchingDevice and path is home', () => {
      const _initialState = getStateClone();
      _initialState.device.isFetchingDevice = true;
      history.location = { pathname: '/home', search: '', hash: '', state: undefined };
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'linearProgressComponent').first();
      expect(component).toHaveLength(1);
      expect(component.props().className).toBe('');
    });
  });

  describe('When User is Logged In', () => {
    beforeEach(() => {
      userActions.me = jest.fn().mockResolvedValueOnce({ data: userOne });
      history.location = { pathname: '/', search: '', hash: '', state: undefined };
    });

    afterEach(() => {
      wrapper.unmount();
      store.clearActions();
      userActions.me.mockRestore();
    });

    it('should have HomePage if user is logged in', () => {
      const _initialState = getStateClone();
      _initialState.user.isLoggedIn = true;
      _initialState.user.tokens = { access: { token: '', expires: '' }, refresh: { token: '', expires: '' } };
      wrapper = setupWrapper(_initialState);
      const component = wrapper.find(HomePage);
      expect(component).toHaveLength(1);
      expect(history.location.pathname).toBe('/home');
    });

    it('should have Admin DashBoardPage if user is logged in and having role admin', () => {
      history.location = { pathname: '/admin', search: '', hash: '', state: undefined };
      const _initialState = getStateClone();
      _initialState.user.isLoggedIn = true;
      _initialState.user.role = 'admin';
      _initialState.user.tokens = { access: { token: '', expires: '' }, refresh: { token: '', expires: '' } };
      wrapper = setupWrapper(_initialState);
      const component = wrapper.find(DashboardPage);
      expect(component).toHaveLength(1);
      expect(history.location.pathname).toBe('/admin');
    });

    it('should not have Admin DashBoardPage if user is logged in and having role user', () => {
      history.location = { pathname: '/admin', search: '', hash: '', state: undefined };
      const _initialState = getStateClone();
      _initialState.user.isLoggedIn = true;
      _initialState.user.role = 'user';
      _initialState.user.tokens = { access: { token: '', expires: '' }, refresh: { token: '', expires: '' } };
      wrapper = setupWrapper(_initialState);
      const component = wrapper.find(HomePage);
      expect(component).toHaveLength(1);
      expect(history.location.pathname).toBe('/home');
    });

    it('should have Admin UserListPage if user is logged in and having role admin', () => {
      history.location = { pathname: '/users', search: '', hash: '', state: undefined };
      const _initialState = getStateClone();
      _initialState.user.isLoggedIn = true;
      _initialState.user.role = 'admin';
      _initialState.user.tokens = { access: { token: '', expires: '' }, refresh: { token: '', expires: '' } };
      wrapper = setupWrapper(_initialState);
      const component = wrapper.find(UserListPage);
      expect(component).toHaveLength(1);
      expect(history.location.pathname).toBe('/users');
    });

    it('should have Admin UserEditorPage if user is logged in and having role admin', () => {
      history.location = { pathname: '/users/new', search: '', hash: '', state: undefined };
      const _initialState = getStateClone();
      _initialState.user.isLoggedIn = true;
      _initialState.user.role = 'admin';
      _initialState.user.tokens = { access: { token: '', expires: '' }, refresh: { token: '', expires: '' } };
      wrapper = setupWrapper(_initialState);
      const component = wrapper.find(UserEditorPage);
      expect(component).toHaveLength(1);
      expect(history.location.pathname).toBe('/users/new');
    });

    it('should not have Admin UserListPage if user is logged in and having role user', () => {
      history.location = { pathname: '/users', search: '', hash: '', state: undefined };
      const _initialState = getStateClone();
      _initialState.user.isLoggedIn = true;
      _initialState.user.role = 'user';
      _initialState.user.tokens = { access: { token: '', expires: '' }, refresh: { token: '', expires: '' } };
      wrapper = setupWrapper(_initialState);
      const component = wrapper.find(HomePage);
      expect(component).toHaveLength(1);
      expect(history.location.pathname).toBe('/home');
    });

    it('should not have Admin UserEditorPage if user is logged in and having role user', () => {
      history.location = { pathname: '/users/new', search: '', hash: '', state: undefined };
      const _initialState = getStateClone();
      _initialState.user.isLoggedIn = true;
      _initialState.user.role = 'user';
      _initialState.user.tokens = { access: { token: '', expires: '' }, refresh: { token: '', expires: '' } };
      wrapper = setupWrapper(_initialState);
      const component = wrapper.find(HomePage);
      expect(component).toHaveLength(1);
      expect(history.location.pathname).toBe('/home');
    });

    it('should not have SignInPage if user is logged in', () => {
      const _initialState = getStateClone();
      _initialState.user.isLoggedIn = true;
      _initialState.user.tokens = { access: { token: '', expires: '' }, refresh: { token: '', expires: '' } };
      wrapper = setupWrapper(_initialState);
      const component = wrapper.find(SignInPage);
      expect(component).toHaveLength(0);
      expect(history.location.pathname).toBe('/home');
    });
  });

  describe('When User is NOT Logged In', () => {
    beforeEach(() => {
      history.location = { pathname: '/home', search: '', hash: '', state: undefined };
    });

    afterEach(() => {
      wrapper.unmount();
      store.clearActions();
    });

    it('should not have HomePage if user is not logged in', () => {
      const _initialState = getStateClone();
      wrapper = setupWrapper(_initialState);
      const component = wrapper.find(HomePage);
      expect(component).toHaveLength(0);
      expect(history.location.pathname).toBe('/signin');
    });

    it('should not have Admin DashBoardPage if user is not logged in', () => {
      const _initialState = getStateClone();
      wrapper = setupWrapper(_initialState);
      const component = wrapper.find(DashboardPage);
      expect(component).toHaveLength(0);
      expect(history.location.pathname).toBe('/signin');
    });

    it('should not have Admin UserListPage if user is not logged in', () => {
      const _initialState = getStateClone();
      wrapper = setupWrapper(_initialState);
      const component = wrapper.find(UserListPage);
      expect(component).toHaveLength(0);
      expect(history.location.pathname).toBe('/signin');
    });

    it('should not have Admin UserEditorPage if user is not logged in', () => {
      const _initialState = getStateClone();
      wrapper = setupWrapper(_initialState);
      const component = wrapper.find(UserEditorPage);
      expect(component).toHaveLength(0);
      expect(history.location.pathname).toBe('/signin');
    });

    it('should have SignInPage if user is not logged in', () => {
      const _initialState = getStateClone();
      wrapper = setupWrapper(_initialState);
      const component = wrapper.find(SignInPage);
      expect(component).toHaveLength(1);
      expect(history.location.pathname).toBe('/signin');
    });
  });

  describe('State actions When User is Logged In', () => {
    beforeEach(() => {
      history.location = { pathname: '/', search: '', hash: '', state: undefined };
    });

    afterEach(() => {
      wrapper.unmount();
      store.clearActions();
      userActions.me.mockRestore();
    });

    it('should disconnect and dispatch reset state actions if user is logged in but received error from getMe Api', async () => {
      userActions.me = jest.fn().mockRejectedValueOnce('Error');
      const _initialState = getStateClone();
      _initialState.user.isLoggedIn = true;
      _initialState.user.tokens = { access: { token: '', expires: '' }, refresh: { token: '', expires: '' } };
      wrapper = setupWrapper(_initialState);
      await wait();
      expect(store.getActions()).toEqual([
        { payload: true, type: 'DEVICE_UPDATE_FETCHING' },
        { type: 'SIGN_OUT' },
        { type: 'DISCONNECTED' },
        { type: 'CLEAR_DATA' },
      ]);
    });

    it('should disconnect and dispatch reset state actions if user is logged in but received no data from getMe Api', async () => {
      userActions.me = jest.fn().mockResolvedValueOnce();
      const _initialState = getStateClone();
      _initialState.user.isLoggedIn = true;
      _initialState.user.tokens = { access: { token: '', expires: '' }, refresh: { token: '', expires: '' } };
      wrapper = setupWrapper(_initialState);
      await wait();
      expect(store.getActions()).toEqual([
        { payload: true, type: 'DEVICE_UPDATE_FETCHING' },
        { type: 'SIGN_OUT' },
        { type: 'DISCONNECTED' },
        { type: 'CLEAR_DATA' },
      ]);
    });
  });
});
