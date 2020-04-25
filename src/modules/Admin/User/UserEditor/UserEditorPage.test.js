import { mount } from 'enzyme';
import { find } from 'lodash';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { history } from '../../../../_helpers/history/history';
import { checkProps, findByDataAttr, getStateClone } from '../../../../_utils';
import UserEditorPage from './UserEditorPage';

let wrapper;
let store;
const mockStore = configureStore([thunk]);
const props = {
  classes: {
    root: '',
    footer: '',
  },
  history,
  location: {},
  match: {},
};

const setupWrapper = (_initialState, _props) => {
  store = mockStore(_initialState);
  return mount(
    <Provider store={store}>
      <UserEditorPage {..._props} />
    </Provider>
  );
};

describe('UserEditorPage Component', () => {
  describe('Checking PropTypes', () => {
    it('should not throw a warning', () => {
      const propsErr = checkProps(UserEditorPage, props);
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

    it('should render adminPageContainerForUserEditor', () => {
      const _initialState = getStateClone();
      wrapper = setupWrapper(_initialState, props);
      const component = findByDataAttr(wrapper, 'adminPageContainerForUserEditor').first();
      expect(component.length).toBe(1);
    });

    it('should render userEditorPageContainer', () => {
      const _initialState = getStateClone();
      wrapper = setupWrapper(_initialState, props);
      const component = findByDataAttr(wrapper, 'userEditorPageContainer').first();
      expect(component.length).toBe(1);
    });

    it('should show drawer if its not already shown', () => {
      const _initialState = getStateClone();
      _initialState.adminDrawer.show = false;
      wrapper = setupWrapper(_initialState, props);
      expect(find(store.getActions(), ['type', 'SHOW_ADMIN_DRAWER'])).toBeTruthy();
    });

    it('should not show drawer if its already shown', () => {
      const _initialState = getStateClone();
      _initialState.adminDrawer.show = true;
      wrapper = setupWrapper(_initialState, props);
      expect(find(store.getActions(), ['type', 'SHOW_ADMIN_DRAWER'])).toBeFalsy();
    });

    it('should show burger if its not already shown', () => {
      const _initialState = getStateClone();
      _initialState.siteSetting.burger = false;
      wrapper = setupWrapper(_initialState, props);
      expect(find(store.getActions(), ['type', 'SHOW_BURGER'])).toBeTruthy();
    });

    it('should not show burger if its already shown', () => {
      const _initialState = getStateClone();
      _initialState.siteSetting.burger = true;
      wrapper = setupWrapper(_initialState, props);
      expect(find(store.getActions(), ['type', 'SHOW_BURGER'])).toBeFalsy();
    });
  });
});
