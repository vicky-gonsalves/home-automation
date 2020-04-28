import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { history } from '../../../_helpers/history/history';
import { checkProps, findByDataAttr, getStateClone } from '../../../_utils';
import EditButton from './editButton';

jest.mock('axios');

let wrapper;
let store;
const mockStore = configureStore([thunk]);
const props = {
  path: '/',
};

const setupWrapper = (_initialState, _props) => {
  store = mockStore(_initialState);
  return mount(
    <Provider store={store}>
      <Router history={history}>
        <EditButton {..._props} />
      </Router>
    </Provider>
  );
};

describe('EditButton', () => {
  describe('Checking PropTypes', () => {
    it('should not throw a warning', () => {
      const propsErr = checkProps(EditButton, props);
      expect(propsErr).toBeUndefined();
    });
  });

  describe('Components Testing with State', () => {
    beforeEach(() => {});
    afterEach(() => {
      wrapper.unmount();
      store.clearActions();
    });

    it('should render iconButtonComponent', () => {
      const _initialState = getStateClone();
      wrapper = setupWrapper(_initialState, props);
      const component = findByDataAttr(wrapper, 'editIconButtonComponent').first();
      expect(component.length).toBe(1);
    });

    it('should render editIconComponent', () => {
      const _initialState = getStateClone();
      wrapper = setupWrapper(_initialState, props);
      const component = findByDataAttr(wrapper, 'editIconComponent').first();
      expect(component.length).toBe(1);
    });

    it('should call callback on click', () => {
      history.push = jest.fn();
      const _initialState = getStateClone();
      wrapper = setupWrapper(_initialState, props);
      const component = findByDataAttr(wrapper, 'editIconButtonComponent').first();
      component.props().onClick();
      expect(history.push).toHaveBeenCalled();
    });
  });
});
