import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { history } from '../../_helpers/history/history';
import { checkProps, findByDataAttr, getStateClone, initialState, wait } from '../../_utils';
import AdminDrawer from './adminDrawer';

jest.mock('axios');

let wrapper;
let store;
const mockStore = configureStore([thunk]);
const props = {};

const setupWrapper = (_initialState, _width) => {
  store = mockStore(_initialState);
  return mount(
    <Provider store={store}>
      <Router history={history}>
        <AdminDrawer {...props} width={_width} />
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

    it('should render mobileDrawer on sm screens', () => {
      wrapper = setupWrapper(initialState, 'sm');
      const component = findByDataAttr(wrapper, 'mobileDrawer').first();
      expect(component.length).toBe(1);
      expect(component.props().open).toBeFalsy();
    });

    it('should render mobileDrawer on xs screens', () => {
      wrapper = setupWrapper(initialState, 'xs');
      const component = findByDataAttr(wrapper, 'mobileDrawer').first();
      expect(component.length).toBe(1);
      expect(component.props().open).toBeFalsy();
    });

    it('should not render mobileDrawer on md screens', () => {
      wrapper = setupWrapper(initialState, 'md');
      const component = findByDataAttr(wrapper, 'mobileDrawer').first();
      expect(component).toHaveLength(0);
    });

    it('should render nonMobileDrawer on md screens', async () => {
      wrapper = setupWrapper(initialState, 'md');
      const component = findByDataAttr(wrapper, 'nonMobileDrawer').first();
      expect(component.length).toBe(1);
    });

    it('should render nonMobileDrawer on lg screens', async () => {
      wrapper = setupWrapper(initialState, 'lg');
      const component = findByDataAttr(wrapper, 'nonMobileDrawer').first();
      expect(component.length).toBe(1);
    });

    it('should render nonMobileDrawer on xl screens', async () => {
      wrapper = setupWrapper(initialState, 'xl');
      const component = findByDataAttr(wrapper, 'nonMobileDrawer').first();
      expect(component.length).toBe(1);
    });

    it('should not render nonMobileDrawer on sm screens', async () => {
      wrapper = setupWrapper(initialState, 'sm');
      const component = findByDataAttr(wrapper, 'nonMobileDrawer').first();
      expect(component).toHaveLength(0);
    });

    it('should not render nonMobileDrawer on xs screens', async () => {
      wrapper = setupWrapper(initialState, 'xs');
      const component = findByDataAttr(wrapper, 'nonMobileDrawer').first();
      expect(component).toHaveLength(0);
    });

    it('should render listContainer when drawer is open', () => {
      wrapper = setupWrapper(initialState, 'md'); // drawer is open for md screens
      const component = findByDataAttr(wrapper, 'listContainer').first();
      expect(component.length).toBe(1);
    });

    it('should not render listContainer when drawer is close', () => {
      wrapper = setupWrapper(initialState, 'sm'); // drawer is close for sm screens
      const component = findByDataAttr(wrapper, 'listContainer');
      expect(component).toHaveLength(0);
    });

    it('should render appNameMobile when drawer is open', () => {
      wrapper = setupWrapper(initialState, 'md'); // drawer is open for md screens
      const component = findByDataAttr(wrapper, 'appNameMobile').first();
      expect(component.length).toBe(1);
    });

    it('should not render appNameMobile when drawer is close', () => {
      wrapper = setupWrapper(initialState, 'sm'); // drawer is close for sm screens
      const component = findByDataAttr(wrapper, 'appNameMobile');
      expect(component).toHaveLength(0);
    });

    it('should render listComponent when drawer is open', () => {
      wrapper = setupWrapper(initialState, 'md'); // drawer is open for md screens
      const component = findByDataAttr(wrapper, 'listComponent').first();
      expect(component.length).toBe(1);
    });

    it('should not render listComponent when drawer is close', () => {
      wrapper = setupWrapper(initialState, 'sm'); // drawer is close for sm screens
      const component = findByDataAttr(wrapper, 'listComponent');
      expect(component).toHaveLength(0);
    });

    it('should open mobile drawer on xs screen', () => {
      const _initialState = getStateClone();
      _initialState.adminDrawer.open = false;
      wrapper = setupWrapper(_initialState, 'xs');
      const component = findByDataAttr(wrapper, 'mobileDrawer').first();
      expect(component.props().open).toBe(false);
      component.props().onClose();
      expect(store.getActions().pop()).toEqual({ type: 'OPEN_ADMIN_DRAWER' });
    });

    it('should open mobile drawer on sm screen', () => {
      const _initialState = getStateClone();
      _initialState.adminDrawer.open = false;
      wrapper = setupWrapper(_initialState, 'sm');
      const component = findByDataAttr(wrapper, 'mobileDrawer').first();
      expect(component.props().open).toBe(false);
      component.props().onClose();
      expect(store.getActions().pop()).toEqual({ type: 'OPEN_ADMIN_DRAWER' });
    });

    it('should open non mobile drawer on md screen', () => {
      const _initialState = getStateClone();
      _initialState.adminDrawer.open = false;
      wrapper = setupWrapper(_initialState, 'md');
      const component = findByDataAttr(wrapper, 'nonMobileDrawer').first();
      expect(component.props().open).toBe(false);
      component.props().onClose();
      expect(store.getActions().pop()).toEqual({ type: 'OPEN_ADMIN_DRAWER' });
    });

    it('should open non mobile drawer on lg screen', () => {
      const _initialState = getStateClone();
      _initialState.adminDrawer.open = false;
      wrapper = setupWrapper(_initialState, 'lg');
      const component = findByDataAttr(wrapper, 'nonMobileDrawer').first();
      expect(component.props().open).toBe(false);
      component.props().onClose();
      expect(store.getActions().pop()).toEqual({ type: 'OPEN_ADMIN_DRAWER' });
    });

    it('should open non mobile drawer on xl screen', () => {
      const _initialState = getStateClone();
      _initialState.adminDrawer.open = false;
      wrapper = setupWrapper(_initialState, 'xl');
      const component = findByDataAttr(wrapper, 'nonMobileDrawer').first();
      expect(component.props().open).toBe(false);
      component.props().onClose();
      expect(store.getActions().pop()).toEqual({ type: 'OPEN_ADMIN_DRAWER' });
    });

    it('should close mobile drawer on xs screen', () => {
      const _initialState = getStateClone();
      _initialState.adminDrawer.open = true;
      wrapper = setupWrapper(_initialState, 'xs');
      const component = findByDataAttr(wrapper, 'mobileDrawer').first();
      expect(component.props().open).toBe(true);
      component.props().onClose();
      expect(store.getActions().pop()).toEqual({ type: 'CLOSE_ADMIN_DRAWER' });
    });

    it('should close mobile drawer on sm screen', () => {
      const _initialState = getStateClone();
      _initialState.adminDrawer.open = true;
      wrapper = setupWrapper(_initialState, 'sm');
      const component = findByDataAttr(wrapper, 'mobileDrawer').first();
      expect(component.props().open).toBe(true);
      component.props().onClose();
      expect(store.getActions().pop()).toEqual({ type: 'CLOSE_ADMIN_DRAWER' });
    });

    it('should close non mobile drawer on md screen', () => {
      const _initialState = getStateClone();
      _initialState.adminDrawer.open = true;
      wrapper = setupWrapper(_initialState, 'md');
      const component = findByDataAttr(wrapper, 'nonMobileDrawer').first();
      expect(component.props().open).toBe(true);
      component.props().onClose();
      expect(store.getActions().pop()).toEqual({ type: 'CLOSE_ADMIN_DRAWER' });
    });

    it('should close non mobile drawer on lg screen', () => {
      const _initialState = getStateClone();
      _initialState.adminDrawer.open = true;
      wrapper = setupWrapper(_initialState, 'lg');
      const component = findByDataAttr(wrapper, 'nonMobileDrawer').first();
      expect(component.props().open).toBe(true);
      component.props().onClose();
      expect(store.getActions().pop()).toEqual({ type: 'CLOSE_ADMIN_DRAWER' });
    });

    it('should close non mobile drawer on xl screen', () => {
      const _initialState = getStateClone();
      _initialState.adminDrawer.open = true;
      wrapper = setupWrapper(_initialState, 'xl');
      const component = findByDataAttr(wrapper, 'nonMobileDrawer').first();
      expect(component.props().open).toBe(true);
      component.props().onClose();
      expect(store.getActions().pop()).toEqual({ type: 'CLOSE_ADMIN_DRAWER' });
    });
  });
});
