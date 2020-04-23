import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { history } from '../../_helpers/history/history';
import { checkProps, findByDataAttr, getStateClone, initialState } from '../../_utils';
import AdminDrawer from './adminDrawer';

jest.mock('axios');

let wrapper;
let store;
const mockStore = configureStore([thunk]);
const props = {};

const setupWrapper = _initialState => {
  store = mockStore(_initialState);
  return mount(
    <Provider store={store}>
      <Router history={history}>
        <AdminDrawer {...props} width="lg" />
      </Router>
    </Provider>
  );
};

describe('AdminDrawer', () => {
  describe('Checking PropTypes', () => {
    it('should not throw a warning', () => {
      const propsErr = checkProps(AdminDrawer, props);
      expect(propsErr).toBeUndefined();
    });
  });

  describe('Components Testing with State', () => {
    beforeEach(() => {});
    afterEach(() => {
      wrapper.unmount();
      store.clearActions();
    });

    it('should render mobileDrawer without error', () => {
      wrapper = setupWrapper(initialState);
      const component = findByDataAttr(wrapper, 'mobileDrawer').first();
      expect(component.length).toBe(1);
      expect(component.props().open).toBeFalsy();
    });

    it('should render nonMobileDrawer without error', () => {
      wrapper = setupWrapper(initialState);
      const component = findByDataAttr(wrapper, 'nonMobileDrawer').first();
      expect(component.length).toBe(1);
      expect(component.props().open).toBeTruthy();
    });

    it('should render listContainer without error', () => {
      wrapper = setupWrapper(initialState);
      const component = findByDataAttr(wrapper, 'listContainer').first();
      expect(component.length).toBe(1);
    });

    it('should render listComponent without error', () => {
      wrapper = setupWrapper(initialState);
      const component = findByDataAttr(wrapper, 'listComponent').first();
      expect(component.length).toBe(1);
    });

    it('should open drawer', () => {
      const _initialState = getStateClone();
      _initialState.adminDrawer.open = false;
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'mobileDrawer').first();
      component.props().onClose();
      expect(store.getActions()).toEqual([{ type: 'OPEN_ADMIN_DRAWER' }]);
    });

    it('should close drawer', () => {
      const _initialState = getStateClone();
      _initialState.adminDrawer.open = true;
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'mobileDrawer').first();
      component.props().onClose();
      expect(store.getActions()).toEqual([{ type: 'CLOSE_ADMIN_DRAWER' }]);
    });
  });
});
