import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { Router, Switch } from 'react-router';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { history } from '../../_helpers/history/history';
import { checkProps, findByDataAttr, getStateClone } from '../../_utils';
import UserEditor from './userEditor';

jest.mock('axios');

jest.mock('../page-toolbar/PageToolbar', () => ({ title }) => <div>{title}</div>);

let wrapper;
let store;
const mockStore = configureStore([thunk]);
const props = {
  classes: {
    root: '',
    paper: '',
  },
  isLoggedIn: true,
  isConnected: true,
};

const setupWrapper = (_initialState, _props) => {
  store = mockStore(_initialState);

  return mount(
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <UserEditor {..._props} />
        </Switch>
      </Router>
    </Provider>
  );
};

describe('UserEditor Add User Component', () => {
  describe('Checking PropTypes', () => {
    it('should not throw a warning', () => {
      const propsErr = checkProps(UserEditor, props);
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

    it('should render userEditorComponent', () => {
      const _initialState = getStateClone();
      wrapper = setupWrapper(_initialState, props);
      const component = findByDataAttr(wrapper, 'userEditorComponent').first();
      expect(component.length).toBe(1);
    });

    it('should render userEditorPaperComponent', () => {
      const _initialState = getStateClone();
      wrapper = setupWrapper(_initialState, props);
      const component = findByDataAttr(wrapper, 'userEditorPaperComponent').first();
      expect(component.length).toBe(1);
    });

    it('should render userEditorToolbarComponent', () => {
      const _initialState = getStateClone();
      wrapper = setupWrapper(_initialState, props);
      const component = findByDataAttr(wrapper, 'userEditorToolbarComponent').first();
      expect(component.length).toBe(1);
    });

    it('should have correct page title on userEditorToolbarComponent when page is Add New User', () => {
      const _initialState = getStateClone();
      wrapper = setupWrapper(_initialState, props);
      const component = findByDataAttr(wrapper, 'userEditorToolbarComponent').first();
      expect(component.props().title).toBe('Add New User');
    });
  });
});
