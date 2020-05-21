import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { checkProps, findByDataAttr, initialState } from '../../../_utils';
import UserForm, { SimpleUserForm } from './UserForm';

let wrapper;
let store;
const mockStore = configureStore([thunk]);
const setupWrapper = (_initialState, _props) => {
  store = mockStore(_initialState);
  return mount(
    <Provider store={store}>
      <UserForm {..._props} />
    </Provider>
  );
};

describe('UserForm', () => {
  describe('Checking PropTypes', () => {
    it('should not throw a warning for UserForm', () => {
      const propsErr = checkProps(UserForm, {});
      expect(propsErr).toBeUndefined();
    });

    it('should not throw a warning for SimpleUserForm', () => {
      const props = {
        handleSubmit: jest.fn(),
        isFetching: false,
      };
      const propsErr = checkProps(SimpleUserForm, props);
      expect(propsErr).toBeUndefined();
    });
  });

  describe('Components Testing with State', () => {
    beforeEach(() => {});

    afterEach(() => {
      wrapper.unmount();
      store.clearActions();
    });

    it('should render nameInput field for type text', () => {
      const props = {
        handleSubmit: jest.fn(),
        isFetching: false,
      };
      wrapper = setupWrapper(initialState, props);
      const component = findByDataAttr(wrapper, 'nameInput').first();
      expect(component).toHaveLength(1);
    });
  });
});
