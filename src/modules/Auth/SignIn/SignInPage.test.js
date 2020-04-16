import { mount, shallow } from 'enzyme';
import faker from 'faker';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { userConstants } from '../../../_constants';
import { history } from '../../../_helpers/history/history';
import { checkProps, clickButton, findByDataAttr, initialState } from '../../../_utils';
import SignInPage, { SignInPage as SignInPageClass } from './SignInPage';

const mockStore = configureStore([thunk]);
const name = faker.name.firstName();
const email = faker.internet.email();

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

describe('SignInPage', () => {
  describe('Store Checks', () => {
    let component;
    let store;
    beforeEach(() => {
      store = mockStore(initialState);
      component = mount(
        <Provider store={store}>
          <SignInPage {...props} />
        </Provider>
      );
      // clear SIGN_OUT
      store.clearActions();
    });

    afterEach(() => {
      component.unmount();
      store.clearActions();
    });

    it('should dispatch SET_USER', () => {
      const fakeUser = {
        name,
        email,
      };
      const expectedPayload = {
        type: 'SET_USER',
        payload: { ...fakeUser },
      };
      store.dispatch({
        type: userConstants.SET_USER,
        payload: fakeUser,
      });
      expect(store.getActions()).toEqual([expectedPayload]);
    });
  });

  describe('Other Checks', () => {
    describe('Checking PropTypes', () => {
      it('should not throw a warning', () => {
        const propsErr = checkProps(SignInPage, props);
        expect(propsErr).toBeUndefined();
      });
    });

    describe('Checking Components', () => {
      let wrapper;
      beforeEach(() => {
        const _props = {
          ...props,
          signIn: jest.fn(),
          signOut: jest.fn(),
          isLoggedIn: false,
        };
        history.push = jest.fn();
        wrapper = shallow(<SignInPageClass {..._props} />);
      });
      afterEach(() => {
        wrapper.unmount();
        history.push.mockClear();
      });

      it('should have signIn container', () => {
        const component = findByDataAttr(wrapper, 'signInContainer').first();
        expect(component.length).toBe(1);
      });

      it('should have signInForm component', () => {
        const component = findByDataAttr(wrapper, 'signInFormComponent').first();
        expect(component.length).toBe(1);
      });

      it('should have navbar component', () => {
        const component = findByDataAttr(wrapper, 'navbarComponent').first();
        expect(component.length).toBe(1);
      });

      it('should have footer component', () => {
        const component = findByDataAttr(wrapper, 'footerComponent').first();
        expect(component.length).toBe(1);
      });

      it('should have forgot password button', () => {
        const component = findByDataAttr(wrapper, 'forgotPassword').first();
        expect(component.length).toBe(1);
      });

      it('should navigate to forgot password page', async () => {
        const component = findByDataAttr(wrapper, 'forgotPassword').first();
        await clickButton(component);
        expect(history.push).toHaveBeenCalledTimes(1);
      });

      it('should navigate to home page if user is logged in', () => {
        wrapper.setProps({ isLoggedIn: true, tokens: { access: 'access_token' } });
        wrapper.instance().componentDidUpdate();
        expect(history.push).toHaveBeenCalledTimes(1);
      });

      it('should not navigate to home page if user is not logged in', () => {
        wrapper.setProps({ isLoggedIn: false });
        wrapper.instance().componentDidUpdate();
        expect(history.push).toHaveBeenCalledTimes(0);
      });
    });
  });
});
