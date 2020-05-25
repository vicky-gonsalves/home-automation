import { mount } from 'enzyme';
import { find } from 'lodash';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import AdminUserContextProvider from '../../_contexts/admin-user/AdminUserContext.provider';
import UserContextProvider from '../../_contexts/user/UserContext.provider';
import { checkProps, findByDataAttr, getStateClone } from '../../_utils';
import DeviceList from './deviceList';

jest.mock('axios');

let wrapper;
let store;
const mockStore = configureStore([thunk]);
const props = {
  classes: {
    root: '',
    paper: '',
  },
};

const setupWrapper = (_initialState, _props) => {
  store = mockStore(_initialState);
  return mount(
    <Provider store={store}>
      <UserContextProvider>
        <AdminUserContextProvider>
          <DeviceList {..._props} />
        </AdminUserContextProvider>
      </UserContextProvider>
    </Provider>
  );
};

describe('DeviceList Component', () => {
  describe('Checking PropTypes', () => {
    it('should not throw a warning', () => {
      const propsErr = checkProps(DeviceList, props);
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

    it('should render listTableContainer', () => {
      const _initialState = getStateClone();
      wrapper = setupWrapper(_initialState, props);
      const component = findByDataAttr(wrapper, 'listTableContainer').first();
      expect(component.length).toBe(1);
    });

    it('should render paperComponent', () => {
      const _initialState = getStateClone();
      wrapper = setupWrapper(_initialState, props);
      const component = findByDataAttr(wrapper, 'paperComponent').first();
      expect(component.length).toBe(1);
    });

    it('should render listTableComponent', () => {
      const _initialState = getStateClone();
      wrapper = setupWrapper(_initialState, props);
      const component = findByDataAttr(wrapper, 'listTableComponent').first();
      expect(component.length).toBe(1);
    });

    it('should have correct attributes for ListTable if isFetching is false', () => {
      const _initialState = getStateClone();
      _initialState.adminUser.isFetchingUsersList = false;
      _initialState.socket.connected = true;
      wrapper = setupWrapper(_initialState, props);
      const component = findByDataAttr(wrapper, 'listTableComponent').first();
      expect(component.props().isFetching).toBeFalsy();
    });

    it('should have correct attributes for ListTable if isFetching is true', () => {
      const _initialState = getStateClone();
      _initialState.adminUser.isFetchingUsersList = true;
      wrapper = setupWrapper(_initialState, props);
      const component = findByDataAttr(wrapper, 'listTableComponent').first();
      expect(component.props().isFetching).toBeTruthy();
    });

    it('should have correct attributes for ListTable if isConnected is false', () => {
      const _initialState = getStateClone();
      _initialState.socket.isConnected = false;
      wrapper = setupWrapper(_initialState, props);
      const component = findByDataAttr(wrapper, 'listTableComponent').first();
      expect(component.props().isFetching).toBeTruthy();
    });

    it('should have correct attributes for ListTable if isConnected is true and isFetchingUsersList is true', () => {
      const _initialState = getStateClone();
      _initialState.adminUser.isFetchingUsersList = true;
      _initialState.socket.isConnected = true;
      wrapper = setupWrapper(_initialState, props);
      const component = findByDataAttr(wrapper, 'listTableComponent').first();
      expect(component.props().isFetching).toBeTruthy();
    });

    describe('Hooks', () => {
      it('should dispatch action to get users if logged in and connected', async () => {
        const _initialState = getStateClone();
        _initialState.socket.connected = true;
        _initialState.user.isLoggedIn = true;
        _initialState.user.isAuthorized = true;
        _initialState.user.tokens = { access: { token: '', expires: '' } };
        wrapper = setupWrapper(_initialState, props);
        expect(find(store.getActions(), { type: 'SET_FETCHING_USERS', payload: true })).toBeDefined();
      });

      it('should not dispatch action to get users if not logged in and not connected', async () => {
        const _initialState = getStateClone();
        wrapper = setupWrapper(_initialState, props);
        expect(store.getActions()).toHaveLength(0);
      });
    });
  });
});
