import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { history } from '../../../_helpers/history/history';
import { checkProps, findByDataAttr, getStateClone } from '../../../_utils';
import AddButton from './addButton';

jest.mock('axios');

let wrapper;
let store;
const mockStore = configureStore([thunk]);
const props = {
  title: 'Add Something',
  path: '/',
  width: 100,
};

const setupWrapper = (_initialState, _props) => {
  store = mockStore(_initialState);
  return mount(
    <Provider store={store}>
      <Router history={history}>
        <AddButton {..._props} />
      </Router>
    </Provider>
  );
};

describe('AddButton', () => {
  describe('Checking PropTypes', () => {
    it('should not throw a warning', () => {
      const propsErr = checkProps(AddButton, props);
      expect(propsErr).toBeUndefined();
    });
  });

  describe('Components Testing with State', () => {
    beforeEach(() => {});
    afterEach(() => {
      wrapper.unmount();
      store.clearActions();
    });

    it('should render addButtonComponent if title and path are passed', () => {
      const _initialState = getStateClone();
      wrapper = setupWrapper(_initialState, props);
      const component = findByDataAttr(wrapper, 'addButtonComponent').first();
      expect(component.length).toBe(1);
    });

    it('should not render addButtonComponent if title and path are not passed', () => {
      // eslint-disable-next-line no-console
      console.error = jest.fn();
      const _initialState = getStateClone();
      wrapper = setupWrapper(_initialState, {});
      const component = findByDataAttr(wrapper, 'addButtonComponent');
      expect(component).toHaveLength(0);
      // eslint-disable-next-line no-console
      console.error.mockClear();
    });

    it('should call callback on click', () => {
      history.push = jest.fn();
      const _initialState = getStateClone();
      wrapper = setupWrapper(_initialState, props);
      const component = findByDataAttr(wrapper, 'addButtonComponent').first();
      component.props().onClick();
      expect(history.push).toHaveBeenCalled();
    });
  });
});
