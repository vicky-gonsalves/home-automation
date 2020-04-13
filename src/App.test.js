import { mount } from 'enzyme';
import faker from 'faker';
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { userConstants } from './_constants';
import { history } from './_helpers/history';
import { initialState, findByDataAttr, findByDataAttrWhenMounted } from './_utils';
import App from './App';

const mockStore = configureStore([thunk]);
const name = faker.name.firstName();
const email = faker.internet.email();

describe('App', () => {
  describe('Store Checks', () => {
    let component;
    let store;
    beforeEach(() => {
      store = mockStore(initialState);
      component = mount(
        <Provider store={store}>
          <App />
        </Provider>
      );
    });

    afterEach(() => {
      component.unmount();
      store.clearActions();
    });

    it('should dispatch SET_USER', () => {
      const fakeUser = {
        name,
        email,
      };
      const expectedPayload = {
        type: 'SET_USER',
        payload: { ...fakeUser },
      };
      store.dispatch({
        type: userConstants.SET_USER,
        payload: fakeUser,
      });
      expect(store.getActions()).toEqual([expectedPayload]);
    });
  });

  describe('Components Testing', () => {
    let wrapper;
    let store;
    beforeEach(() => {
      store = mockStore(initialState);
      wrapper = mount(
        <Provider store={store}>
          <Router history={history}>
            <App />
          </Router>
        </Provider>
      );
      // clear SIGN_OUT
      store.clearActions();
    });

    afterEach(() => {
      wrapper.unmount();
      store.clearActions();
    });

    it('should render without error', () => {
      const component = findByDataAttrWhenMounted(wrapper, 'appContainer').first();
      expect(component.length).toBe(1);
    });

    it('should have routerComponent', () => {
      const component = findByDataAttr(wrapper, 'routerComponent').first();
      expect(component.length).toBe(1);
    });

    it('should have switchComponent', () => {
      const component = findByDataAttr(wrapper, 'switchComponent').first();
      expect(component.length).toBe(1);
    });

    it('should have publicRouterPath', () => {
      const component = findByDataAttr(wrapper, 'publicRouterPath').first();
      expect(component.length).toBe(1);
    });
  });
});
