import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { checkProps, findByDataAttr, getStateClone } from '../../_utils';
import AddButton from '../buttons/add-button/addButton';
import TableToolbar from './TableToolbar';

jest.mock('axios');

let wrapper;
let store;
const mockStore = configureStore([thunk]);
const props = {
  classes: {
    title: '',
    toolbar: '',
    button: '',
  },
  title: 'Users',
  buttons: [
    {
      component: AddButton,
      title: 'Add User',
      buttonType: 'add',
      type: 'user',
      path: '/user/add',
    },
  ],
};

const setupWrapper = (_initialState, _props) => {
  store = mockStore(_initialState);
  return mount(
    <Provider store={store}>
      <TableToolbar {..._props} />
    </Provider>
  );
};

describe('TableToolbar Component', () => {
  describe('Checking PropTypes', () => {
    it('should not throw a warning', () => {
      const propsErr = checkProps(TableToolbar, props);
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

    it('should render toolbarContainer', () => {
      const _initialState = getStateClone();
      wrapper = setupWrapper(_initialState, props);
      const component = findByDataAttr(wrapper, 'toolbarContainer').first();
      expect(component.length).toBe(1);
    });

    it('should render tableTitleComponent', () => {
      const _initialState = getStateClone();
      wrapper = setupWrapper(_initialState, props);
      const component = findByDataAttr(wrapper, 'tableTitleComponent').first();
      expect(component.length).toBe(1);
    });

    it('should not render toolbarContainer if no buttons', () => {
      const _props = {
        classes: {
          title: '',
          toolbar: '',
          button: '',
        },
        title: 'Users',
        buttons: [],
      };
      const _initialState = getStateClone();
      wrapper = setupWrapper(_initialState, _props);
      const component = findByDataAttr(wrapper, 'toolbarContainer');
      expect(component).toHaveLength(0);
    });

    it('should not render toolbarButtonComponent if no component', () => {
      // eslint-disable-next-line no-console
      console.error = jest.fn();
      const _props = {
        classes: {
          title: '',
          toolbar: '',
          button: '',
        },
        title: 'Users',
        buttons: [
          {
            title: 'Add User',
            buttonType: 'add',
            type: 'user',
            path: '/user/add',
          },
        ],
      };
      const _initialState = getStateClone();
      wrapper = setupWrapper(_initialState, _props);
      const component = findByDataAttr(wrapper, 'toolbarButtonComponent');
      expect(component).toHaveLength(0);
      // eslint-disable-next-line no-console
      console.error.mockClear();
    });
  });
});
