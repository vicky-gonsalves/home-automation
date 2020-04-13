import { createShallow } from '@material-ui/core/test-utils';
import { mount } from 'enzyme';
import faker from 'faker';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { checkProps, findByDataAttr, initialState, submitFormikForm, updateFormikField } from '../../../_utils';
import DefaultSignInForm, { SignInForm } from './SignInForm';

let store;
const props = {
  isFetching: false,
  signIn: jest.fn(),
};
const mockStore = configureStore([thunk]);
const setupWrapper = _initialState => {
  store = mockStore(_initialState);
  return mount(
    <Provider store={store}>
      <DefaultSignInForm {...props} />
    </Provider>
  );
};

const email = faker.internet.email();
const password = faker.internet.password();

describe('SignInForm Component', () => {
  describe('Checking PropTypes', () => {
    it('should not throw a warning', () => {
      const propsErr = checkProps(SignInForm, props);
      expect(propsErr).toBeUndefined();
    });
  });

  describe('Components Test', () => {
    let wrapper;
    beforeEach(() => {
      const shallow = createShallow({ untilSelector: 'TextField' });
      wrapper = shallow(<SignInForm {...props} />);
    });

    it('should have email input field', () => {
      const component = findByDataAttr(wrapper, 'emailInput');
      expect(component.length).toBe(1);
    });

    it('should show no error when first entered email input field', () => {
      const component = findByDataAttr(wrapper, 'emailInput');
      expect(component.props().error).toBeUndefined();
    });

    it('should have password input field', () => {
      const component = findByDataAttr(wrapper, 'passwordInput');
      expect(component.length).toBe(1);
    });

    it('should have remember me checkbox', () => {
      const component = findByDataAttr(wrapper, 'rememberMe');
      expect(component.length).toBe(1);
    });

    it('should have submit button', () => {
      const component = findByDataAttr(wrapper, 'submitButton');
      expect(component.length).toBe(1);
    });
  });

  describe('Component Testing', () => {
    let wrapper;
    beforeEach(() => {
      const _initialState = { ...initialState };
      wrapper = setupWrapper(_initialState);
    });

    afterEach(() => {
      wrapper.unmount();
      store.clearActions();
    });

    it('should error if filled invaild value in email input', async () => {
      const emailInput = wrapper.find(`input[name="email"]`).first();
      await updateFormikField(emailInput, 'email', 'invalidEmail');
      emailInput.update();
      const formikEmailInput = findByDataAttr(wrapper, 'emailInput').first();
      expect(formikEmailInput.props().error).toBe(true);
      expect(formikEmailInput.props().helperText).toEqual('email must be a valid email');
    });

    it('should error if empty value in email input', async () => {
      const emailInput = wrapper.find(`input[name="email"]`).first();
      await updateFormikField(emailInput, 'email', '');
      emailInput.update();
      const formikEmailInput = findByDataAttr(wrapper, 'emailInput').first();
      expect(formikEmailInput.props().error).toBe(true);
      expect(formikEmailInput.props().helperText).toEqual('Please enter email address');
    });

    it('should not have error if valid email value', async () => {
      const emailInput = wrapper.find(`input[name="email"]`).first();
      await updateFormikField(emailInput, 'email', email);
      emailInput.update();
      const formikEmailInput = findByDataAttr(wrapper, 'emailInput').first();
      expect(formikEmailInput.props().error).toBeUndefined();
    });

    it('should error if password input is empty', async () => {
      const passInput = wrapper.find(`input[name="password"]`).first();
      await updateFormikField(passInput, 'password', '');
      passInput.update();
      const formikPassInput = findByDataAttr(wrapper, 'passwordInput').first();
      expect(formikPassInput.props().error).toBe(true);
      expect(formikPassInput.props().helperText).toEqual('Please enter password');
    });

    it('should not submit form if email and password are invalid', async () => {
      const form = wrapper.find(`form`).first();
      const emailInput = wrapper.find(`input[name="email"]`).first();
      const passInput = wrapper.find(`input[name="password"]`).first();
      await updateFormikField(emailInput, 'email', '');
      await updateFormikField(passInput, 'password', '');
      emailInput.update();
      passInput.update();
      await submitFormikForm(form);
      const formikEmailInput = findByDataAttr(wrapper, 'emailInput').first();
      const formikPassInput = findByDataAttr(wrapper, 'passwordInput').first();
      expect(store.getActions().length).toBe(0);
      expect(formikEmailInput.props().error).toBe(true);
      expect(formikPassInput.props().error).toBe(true);
    });

    it('should submit form if email and password are valid', async () => {
      const form = wrapper.find(`form`).first();
      await submitFormikForm(form, { elements: { email, password } });
      expect(store.getActions()).toEqual([{ type: 'SIGN_IN' }, { type: 'SET_LOGIN_ERROR', payload: { error: 'No Data' } }]);
    });
  });
});
