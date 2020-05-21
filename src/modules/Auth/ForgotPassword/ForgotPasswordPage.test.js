import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import UserContextProvider from '../../../_contexts/user/UserContext.provider';
import { history } from '../../../_helpers/history/history';
import { checkProps, findByDataAttr, getStateClone } from '../../../_utils';
import ForgotPasswordPage from './ForgotPasswordPage';

jest.mock('axios');
let wrapper;
let store;

const props = {
  history,
  location: {},
  match: {},
};
const mockStore = configureStore([thunk]);
const setupWrapper = (state, _props = {}) => {
  store = mockStore(state);
  return mount(
    <Provider store={store}>
      <UserContextProvider>
        <ForgotPasswordPage {..._props} />
      </UserContextProvider>
    </Provider>
  );
};

describe('NotFound Page', () => {
  describe('Checking PropTypes', () => {
    it('should not throw a warning', () => {
      const propsErr = checkProps(ForgotPasswordPage, props);
      expect(propsErr).toBeUndefined();
    });
  });

  describe('Components Testing', () => {
    afterEach(() => {
      wrapper.unmount();
      store.clearActions();
    });

    it('should render without error', () => {
      const _initialState = getStateClone();
      wrapper = setupWrapper(_initialState, props);
      const component = findByDataAttr(wrapper, 'forgotPasswordPageContainer').first();
      expect(component.length).toBe(1);
    });
  });
});
