import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { history } from '../../_helpers/history/history';
import { checkProps, findByDataAttr, getStateClone } from '../../_utils';
import config from '../../config';
import PublicPage from './PublicPage';

let wrapper;
let store;
const mockStore = configureStore([thunk]);
const props = {
  classes: {
    main: '',
    icon: '',
    heroContent: '',
    heroButtons: '',
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
      <PublicPage {..._props} />
    </Provider>
  );
};

describe('Public Page', () => {
  describe('Checking PropTypes', () => {
    it('should not throw a warning', () => {
      const propsErr = checkProps(PublicPage, props);
      expect(propsErr).toBeUndefined();
    });
  });

  describe('Components Testing', () => {
    beforeEach(() => {
      history.push = jest.fn();
    });
    afterEach(() => {
      history.push.mockClear();
    });
    it('should render without error', () => {
      const _initialState = getStateClone();
      wrapper = setupWrapper(_initialState, props);
      const component = findByDataAttr(wrapper, 'publicPageContainer').first();
      expect(component.length).toBe(1);
    });

    it('should have signIn button component', () => {
      const _initialState = getStateClone();
      wrapper = setupWrapper(_initialState, props);
      const component = findByDataAttr(wrapper, 'signInButtonComponent').first();
      expect(component.length).toBe(1);
    });

    it('should have message', () => {
      const _initialState = getStateClone();
      wrapper = setupWrapper(_initialState, props);
      const component = findByDataAttr(wrapper, 'message').first();
      expect(component.length).toBe(1);
      expect(component.text()).toEqual(
        `This is restricted site. If you have credentials please proceed with Sign In else please EXIT.`
      );
    });

    it('should have app name', () => {
      const _initialState = getStateClone();
      wrapper = setupWrapper(_initialState, props);
      const component = findByDataAttr(wrapper, 'appName').first();
      expect(component.length).toBe(1);
      expect(component.text()).toEqual(config.appName);
    });

    it('should redirect to home page if already logged in', () => {
      const _initialState = getStateClone();
      _initialState.user.isLoggedIn = true;
      _initialState.user.tokens = { access: 'access_token' };
      wrapper = setupWrapper(_initialState, props);
      history.location = { pathname: '/', search: '', hash: '', state: undefined };
      expect(history.push).toHaveBeenCalledWith('/home');
      expect(history.push).toHaveBeenCalledTimes(1);
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
