import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { checkProps, findByDataAttr, initialState } from '../../_utils';
import AppSkeleton from './AppSkeleton';

let store;
const props = {};
const mockStore = configureStore([thunk]);
const setupWrapper = _initialState => {
  store = mockStore(_initialState);
  return mount(
    <Provider store={store}>
      <AppSkeleton {...props} />
    </Provider>
  );
};

describe('AppSkeleton', () => {
  describe('Checking PropTypes', () => {
    it('should not throw a warning', () => {
      const propsErr = checkProps(AppSkeleton, props);
      expect(propsErr).toBeUndefined();
    });
  });

  describe('Components Testing', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = setupWrapper(initialState);
      // clear SIGN_OUT
      store.clearActions();
    });

    afterEach(() => {
      wrapper.unmount();
      store.clearActions();
    });

    it('should render appSkeletonContainer without error', () => {
      const component = findByDataAttr(wrapper, 'appSkeletonContainer').first();
      expect(component.length).toBe(1);
    });

    it('should not render appSkeleton if has no state', async () => {
      const component = findByDataAttr(wrapper, 'appSkeleton').first();
      expect(component.length).toBe(1);
    });
  });
});
