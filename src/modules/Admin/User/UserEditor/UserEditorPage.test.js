import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import SiteSettingContextProvider from '../../../../_contexts/site-setting/SiteSettingContext.provider';
import UserContextProvider from '../../../../_contexts/user/UserContext.provider';
import { history } from '../../../../_helpers/history/history';
import { checkProps, findByDataAttr, getStateClone } from '../../../../_utils';
import UserEditorPage from './UserEditorPage';

jest.mock('../../../../_components/user-editor/userEditor', () => () => <div>Mock UserEditor</div>);
let wrapper;
let store;
const mockStore = configureStore([thunk]);
const props = {
  classes: {
    root: '',
    footer: '',
  },
  history,
  location: {},
  match: {},
};

const setupWrapper = (_initialState, _props) => {
  store = mockStore(_initialState);
  return mount(
    <Provider store={store}>
      <UserContextProvider>
        <SiteSettingContextProvider>
          <UserEditorPage {..._props} />
        </SiteSettingContextProvider>
      </UserContextProvider>
    </Provider>
  );
};

describe('UserEditorPage Component', () => {
  describe('Checking PropTypes', () => {
    it('should not throw a warning', () => {
      const propsErr = checkProps(UserEditorPage, props);
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

    it('should render adminPageContainerForUserEditor', () => {
      const _initialState = getStateClone();
      _initialState.user.isLoggedIn = true;
      _initialState.user.tokens = { access: {} };
      _initialState.socket.connected = true;
      wrapper = setupWrapper(_initialState, props);
      const component = findByDataAttr(wrapper, 'adminPageContainerForUserEditor').first();
      expect(component.length).toBe(1);
    });

    it('should render userEditorPageContainer if logged in, has token and connected', () => {
      const _initialState = getStateClone();
      _initialState.user.isLoggedIn = true;
      _initialState.user.tokens = { access: {} };
      _initialState.socket.connected = true;
      wrapper = setupWrapper(_initialState, props);
      const component = findByDataAttr(wrapper, 'userEditorPageContainer').first();
      expect(component).toHaveLength(1);
    });
  });
});
