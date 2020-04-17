import { shallow } from 'enzyme';
import React from 'react';
import { history } from '../../../_helpers/history/history';
import { checkProps, clickButton, findByDataAttr } from '../../../_utils';
import SignInPage, { SignInPage as SignInPageClass } from './SignInPage';

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
        history.location = { pathname: '/signin', search: '', hash: '', state: undefined };
        const component = findByDataAttr(wrapper, 'forgotPassword').first();
        await clickButton(component);
        expect(history.push).toHaveBeenCalledTimes(1);
      });

      it('should navigate to home page if user is logged in on componentDidUpdate', () => {
        history.location = { pathname: '/signin', search: '', hash: '', state: undefined };
        wrapper.setProps({ isLoggedIn: true, tokens: { access: 'access_token' } });
        wrapper.instance().componentDidUpdate();
        expect(history.push).toHaveBeenCalledTimes(1);
      });

      it('should not navigate to home page if user is not logged in', () => {
        history.location = { pathname: '/signin', search: '', hash: '', state: undefined };
        wrapper.setProps({ isLoggedIn: false });
        wrapper.instance().componentDidUpdate();
        expect(history.push).toHaveBeenCalledTimes(0);
      });
    });
  });
});
