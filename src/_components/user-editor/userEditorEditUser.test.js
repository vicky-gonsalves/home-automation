import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { Router, Switch } from 'react-router';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { history } from '../../_helpers/history/history';
import { findByDataAttr, getStateClone } from '../../_utils';
import UserEditor from './userEditor';

jest.mock('axios');

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'), // use actual for all non-hook parts
  useParams: () => ({
    id: 123,
  }),
}));

jest.mock('../page-toolbar/PageToolbar', () => ({ title }) => <div>{title}</div>);
jest.mock('../forms/user-form/UserForm', () => ({ isFetching }) => <div>{isFetching}</div>);

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
  isFetching: false,
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

describe('UserEditor Edit User Component', () => {
  describe('Components Testing with State', () => {
    beforeEach(() => {});
    afterEach(() => {
      wrapper.unmount();
      if (store) {
        store.clearActions();
      }
    });

    it('should have correct page title on userEditorToolbarComponent when page is Edit User', () => {
      const _initialState = getStateClone();
      wrapper = setupWrapper(_initialState, props);
      const component = findByDataAttr(wrapper, 'userEditorToolbarComponent').first();
      expect(component.props().title).toBe('Edit User');
    });

    it('should have correct submitButtonTitle on userFormComponent when page is Edit User', () => {
      const _initialState = getStateClone();
      wrapper = setupWrapper(_initialState, props);
      const component = findByDataAttr(wrapper, 'userFormComponent').first();
      expect(component.props().submitButtonTitle).toBe('Save User');
    });
  });
});
