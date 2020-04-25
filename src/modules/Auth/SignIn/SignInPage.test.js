import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { history } from '../../../_helpers/history/history';
import { checkProps, findByDataAttr, getStateClone } from '../../../_utils';
import SignInPage from './SignInPage';

let wrapper;
let store;
const mockStore = configureStore([thunk]);
const props = {
  classes: {
    paper: '',
    main: '',
    footer: '',
    avatar: '',
  },
  history,
  location: {},
  match: {},
};

const setupWrapper = (_initialState, _props) => {
  store = mockStore(_initialState);
  return mount(
    <Provider store={store}>
      <SignInPage {..._props} />
    </Provider>
  );
};

describe('SignInPage', () => {
  describe('Other Checks', () => {
    describe('Checking PropTypes', () => {
      it('should not throw a warning', () => {
        const propsErr = checkProps(SignInPage, props);
        expect(propsErr).toBeUndefined();
      });
    });

    describe('Checking Components', () => {
      beforeEach(() => {
        history.push = jest.fn();
      });
      afterEach(() => {
        wrapper.unmount();
        history.push.mockClear();
      });

      it('should have signIn container', () => {
        const _initialState = getStateClone();
        wrapper = setupWrapper(_initialState, props);
        const component = findByDataAttr(wrapper, 'signInContainer').first();
        expect(component.length).toBe(1);
      });

      it('should have signInForm component', () => {
        const _initialState = getStateClone();
        wrapper = setupWrapper(_initialState, props);
        const component = findByDataAttr(wrapper, 'signInFormComponent').first();
        expect(component.length).toBe(1);
      });

      it('should have forgot password button', () => {
        const _initialState = getStateClone();
        wrapper = setupWrapper(_initialState, props);
        const component = findByDataAttr(wrapper, 'forgotPassword').first();
        expect(component.length).toBe(1);
      });

      it('should navigate to forgot password page', async () => {
        const _initialState = getStateClone();
        wrapper = setupWrapper(_initialState, props);
        history.location = { pathname: '/signin', search: '', hash: '', state: undefined };
        const component = findByDataAttr(wrapper, 'forgotPassword').first();
        component.props().onClick();
        expect(history.push).toHaveBeenCalledWith('/forgot-password');
        expect(history.push).toHaveBeenCalledTimes(1);
      });

      it('should navigate to home page if user is logged in', () => {
        const _initialState = getStateClone();
        _initialState.user.isLoggedIn = true;
        _initialState.user.tokens = { access: 'access_token' };
        wrapper = setupWrapper(_initialState, props);
        history.location = { pathname: '/signin', search: '', hash: '', state: undefined };
        expect(history.push).toHaveBeenCalledWith('/home');
        expect(history.push).toHaveBeenCalledTimes(1);
      });

      it('should not navigate to home page if user is not logged in', () => {
        const _initialState = getStateClone();
        wrapper = setupWrapper(_initialState, props);
        history.location = { pathname: '/signin', search: '', hash: '', state: undefined };
        expect(history.push).toHaveBeenCalledTimes(0);
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
});
