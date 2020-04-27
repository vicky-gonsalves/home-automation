import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router';
import { Router, Switch } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { history } from '../../_helpers/history/history';
import { findByDataAttr, initialState } from '../../_utils';
import LazyLoader from './LazyLoader';

const FakeComponent = React.lazy(() => import('../../_utils/fixtures/FakeComponent'));
let wrapper;
let store;
const mockStore = configureStore([thunk]);
const setupWrapper = state => {
  store = mockStore(state);
  return mount(
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route render={LazyLoader(FakeComponent)} />
        </Switch>
      </Router>
    </Provider>
  );
};

describe('LazyLoader', function() {
  afterEach(() => {
    wrapper.unmount();
    store.clearActions();
  });

  it('should render suspenseComponent', async () => {
    wrapper = setupWrapper(initialState);
    const itemsInInnerComponent = findByDataAttr(wrapper, 'suspenseComponent');
    expect(itemsInInnerComponent).toHaveLength(1);
  });

  it('should not render suspenseComponent if no component', async () => {
    store = mockStore(initialState);
    wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route render={LazyLoader()} />
          </Switch>
        </Router>
      </Provider>
    );
    const itemsInInnerComponent = findByDataAttr(wrapper, 'suspenseComponent');
    expect(itemsInInnerComponent).toHaveLength(0);
  });
});
