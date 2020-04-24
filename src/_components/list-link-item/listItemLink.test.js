import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { history } from '../../_helpers/history/history';
import { checkProps, findByDataAttr, getStateClone, wait } from '../../_utils';
import ListItemLink from './listItemLink';

jest.mock('axios');

let wrapper;
let store;
const mockStore = configureStore([thunk]);
const props = {
  icon: <SupervisorAccountIcon />,
  primary: 'some link',
  to: '/somepath',
  isMobile: false,
};

const setupWrapper = (_initialState, _props) => {
  store = mockStore(_initialState);
  return mount(
    <Provider store={store}>
      <Router history={history}>
        <ListItemLink {..._props} />
      </Router>
    </Provider>
  );
};

describe('ListItemLink', () => {
  describe('Checking PropTypes', () => {
    it('should not throw a warning', () => {
      const propsErr = checkProps(ListItemLink, props);
      expect(propsErr).toBeUndefined();
    });
  });

  describe('Checking Component', () => {
    afterEach(() => {
      wrapper.unmount();
      store.clearActions();
    });

    it('should render listItemContainer without error', () => {
      const _initialState = getStateClone();
      wrapper = setupWrapper(_initialState, props);
      const component = findByDataAttr(wrapper, 'listItemContainer');
      expect(component.length).toBeGreaterThanOrEqual(1);
    });

    it('should render listItemComponent without error', () => {
      const _initialState = getStateClone();
      wrapper = setupWrapper(_initialState, props);
      const component = findByDataAttr(wrapper, 'listItemComponent');
      expect(component.length).toBeGreaterThanOrEqual(1);
    });

    it('should render listItemIconComponent without error', () => {
      const _initialState = getStateClone();
      wrapper = setupWrapper(_initialState, props);
      const component = findByDataAttr(wrapper, 'listItemIconComponent');
      expect(component.length).toBeGreaterThanOrEqual(1);
    });

    it('should render listItemTextComponent without error', () => {
      const _initialState = getStateClone();
      wrapper = setupWrapper(_initialState, props);
      const component = findByDataAttr(wrapper, 'listItemTextComponent');
      expect(component.length).toBeGreaterThanOrEqual(1);
    });

    it('should close drawer if isMobile true', async () => {
      const _props = {
        icon: <SupervisorAccountIcon />,
        primary: 'some link',
        to: '/somepath',
        isMobile: true,
      };
      const _initialState = getStateClone();
      wrapper = setupWrapper(_initialState, _props);
      const component = findByDataAttr(wrapper, 'listItemComponent').first();
      component
        .props()
        .component.render()
        .props.onClick();
      await wait();
      expect(store.getActions()).toEqual([{ type: 'CLOSE_ADMIN_DRAWER' }]);
    });

    it('should not close drawer if isMobile false', async () => {
      const _props = {
        icon: <SupervisorAccountIcon />,
        primary: 'some link',
        to: '/somepath',
        isMobile: false,
      };
      const _initialState = getStateClone();
      wrapper = setupWrapper(_initialState, _props);
      const component = findByDataAttr(wrapper, 'listItemComponent').first();
      component
        .props()
        .component.render()
        .props.onClick();
      await wait();
      expect(store.getActions()).toHaveLength(0);
    });
  });
});
