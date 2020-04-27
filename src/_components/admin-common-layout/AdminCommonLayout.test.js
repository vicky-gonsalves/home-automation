import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { checkProps, findByDataAttr, getStateClone } from '../../_utils';
import UserList from '../user-list/userList';
import AdminCommonLayout from './AdminCommonLayout';

jest.mock('axios');

let wrapper;
let store;
const mockStore = configureStore([thunk]);
const props = {
  classes: {
    root: '',
    footer: '',
    content: '',
    contentShift: '',
  },
  component: <UserList isConnected={true} isLoggedIn={true} />,
};

const setupWrapper = (_initialState, _props) => {
  store = mockStore(_initialState);
  return mount(
    <Provider store={store}>
      <AdminCommonLayout {..._props} />
    </Provider>
  );
};

describe('AdminCommonLayout Component', () => {
  describe('Checking PropTypes', () => {
    it('should not throw a warning', () => {
      const propsErr = checkProps(AdminCommonLayout, props);
      expect(propsErr).toBeUndefined();
    });
  });

  describe('Components Testing with State', () => {
    beforeEach(() => {});
    afterEach(() => {
      wrapper.unmount();
      if (store) {
        store.clearActions();
      }
    });

    it('should render adminCommonLayoutContainer', () => {
      const _initialState = getStateClone();
      wrapper = setupWrapper(_initialState, props);
      const component = findByDataAttr(wrapper, 'adminCommonLayoutContainer').first();
      expect(component.length).toBe(1);
    });

    it('should render adminCommonLayoutContainer and have class contentShift if admin drawer is open', () => {
      const _initialState = getStateClone();
      _initialState.adminDrawer.open = true;
      wrapper = setupWrapper(_initialState, props);
      const component = findByDataAttr(wrapper, 'adminCommonLayoutContainer').first();
      expect(component.props().className.search('contentShift')).toBeGreaterThanOrEqual(0);
    });

    it('should render adminCommonLayoutContainer and have class contentShift if admin drawer is closed', () => {
      const _initialState = getStateClone();
      _initialState.adminDrawer.open = false;
      wrapper = setupWrapper(_initialState, props);
      const component = findByDataAttr(wrapper, 'adminCommonLayoutContainer').first();
      expect(component.props().className.search('contentShift')).toBeLessThan(0);
    });

    it('should not render adminCommonLayoutContainer if no component is provided', () => {
      // eslint-disable-next-line no-console
      console.error = jest.fn();
      const _props = {
        classes: {
          root: '',
          footer: '',
          content: '',
          contentShift: '',
        },
      };
      const _initialState = getStateClone();
      wrapper = setupWrapper(_initialState, _props);
      const component = findByDataAttr(wrapper, 'adminCommonLayoutContainer');
      expect(component).toHaveLength(0);
      // eslint-disable-next-line no-console
      console.error.mockClear();
    });
  });
});
