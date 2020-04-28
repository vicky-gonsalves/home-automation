import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { initialState } from '../../_utils';
import { siteSettingActions } from './siteSetting.actions';

jest.mock('axios');

let store;
const mockStore = configureStore([thunk]);
store = mockStore(initialState);

describe('siteSettingActions', () => {
  afterEach(() => {
    store.clearActions();
  });

  it('should dispatch SHOW_ADMIN_DRAWER action', () => {
    store.dispatch(siteSettingActions.showBurger());
    expect(store.getActions()).toEqual([{ type: 'SHOW_BURGER' }]);
  });

  it('should dispatch HIDE_ADMIN_DRAWER action', () => {
    store.dispatch(siteSettingActions.hideBurger());
    expect(store.getActions()).toEqual([{ type: 'HIDE_BURGER' }]);
  });
});
