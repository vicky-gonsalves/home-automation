import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import SiteSettingContextProvider from '../../../../_contexts/site-setting/SiteSettingContext.provider';
import { history } from '../../../../_helpers/history/history';
import { checkProps, findByDataAttr, getStateClone } from '../../../../_utils';
import UserListPage from './UserListPage';

jest.mock('../../../../_components/user-list/userList', () => () => <div>Mock</div>);

let wrapper;
let store;
const mockStore = configureStore([thunk]);
const props = {
  history,
  location: {},
  match: {},
};

const setupWrapper = (_initialState, _props) => {
  store = mockStore(_initialState);
  return mount(
    <Provider store={store}>
      <SiteSettingContextProvider>
        <UserListPage {..._props} />
      </SiteSettingContextProvider>
    </Provider>
  );
};

describe('UserListPage Component', () => {
  describe('Checking PropTypes', () => {
    it('should not throw a warning', () => {
      const propsErr = checkProps(UserListPage, props);
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

    it('should render adminPageContainerForUserList if not logged in and not connected', () => {
      const _initialState = getStateClone();
      wrapper = setupWrapper(_initialState, props);
      const component = findByDataAttr(wrapper, 'adminPageContainerForUserList').first();
      expect(component).toHaveLength(1);
    });

    it('should render userListPageComponent if not logged in and not connected', () => {
      const _initialState = getStateClone();
      wrapper = setupWrapper(_initialState, props);
      const component = findByDataAttr(wrapper, 'userListPageComponent').first();
      expect(component).toHaveLength(1);
    });
  });
});
