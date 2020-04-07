import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { checkProps, findByDataAttr, initialState } from '../../_utils';
import config from '../../config';
import Navbar from './navbar';

const mockStore = configureStore([thunk]);

const props = {
  appName: config.appName,
  'data-test': '',
};

describe('Navbar Component', () => {
  describe('Checking PropTypes', () => {
    it('should not throw a warning', () => {
      const propsErr = checkProps(Navbar, props);
      expect(propsErr).toBeUndefined();
    });
  });

  describe('Have props', () => {
    let component;
    let store;
    beforeEach(() => {
      store = mockStore(initialState);
      component = mount(
        <Provider store={store}>
          <Navbar {...props} />
        </Provider>
      );
    });

    it('should render without error', () => {
      const wrapper = findByDataAttr(component, 'navbar').first();
      expect(wrapper.length).toBe(1);
    });

    it('should render app name on navbar', () => {
      const appName = findByDataAttr(component, 'appName').first();
      expect(appName.length).toBe(1);
      expect(appName.text()).toBe(config.appName);
    });

    it('should render toolbar', () => {
      const appName = findByDataAttr(component, 'toolbar').first();
      expect(appName.length).toBe(1);
    });

    it('should render icon on navbar', () => {
      const appName = findByDataAttr(component, 'icon').first();
      expect(appName.length).toBe(1);
    });
  });
});
