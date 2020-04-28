import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { history } from '../../../_helpers/history/history';
import { checkProps, findByDataAttr, getStateClone } from '../../../_utils';
import DeleteButton from './deleteButton';

jest.mock('axios');

let wrapper;
let store;
const mockStore = configureStore([thunk]);
const props = {
  item: {},
  type: 'user',
};

const setupWrapper = (_initialState, _props) => {
  store = mockStore(_initialState);
  return mount(
    <Provider store={store}>
      <Router history={history}>
        <DeleteButton {..._props} />
      </Router>
    </Provider>
  );
};

describe('DeleteButton', () => {
  describe('Checking PropTypes', () => {
    it('should not throw a warning', () => {
      const propsErr = checkProps(DeleteButton, props);
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
      const component = findByDataAttr(wrapper, 'deleteIconButtonComponent').first();
      expect(component.length).toBe(1);
    });

    it('should render deleteIconComponent', () => {
      const _initialState = getStateClone();
      wrapper = setupWrapper(_initialState, props);
      const component = findByDataAttr(wrapper, 'deleteIconComponent').first();
      expect(component.length).toBe(1);
    });

    it('should call callback on click', () => {
      // eslint-disable-next-line no-console
      console.log = jest.fn();
      const _initialState = getStateClone();
      wrapper = setupWrapper(_initialState, props);
      const component = findByDataAttr(wrapper, 'deleteIconButtonComponent').first();
      component.props().onClick();
      // eslint-disable-next-line no-console
      expect(console.log).toHaveBeenCalled();
    });
  });
});
