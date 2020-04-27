import { find } from 'lodash';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { adminUserService } from '../../_services';
import { initialState } from '../../_utils';
import { userOne, userTwo } from '../../_utils/fixtures/user.fixture';
import { adminUserActions } from './adminUser.actions';

jest.mock('axios');

let store;
const mockStore = configureStore([thunk]);
store = mockStore(initialState);

describe('adminUserActions', () => {
  afterEach(() => {
    store.clearActions();
  });

  it('should dispatch events if getUsers is called and returned response', async () => {
    const payload = { users: [userOne, userTwo], count: 2 };
    adminUserService.getUsers = jest.fn().mockResolvedValueOnce(payload);
    await store.dispatch(adminUserActions.getUsers());
    const response = find(store.getActions(), ['type', 'STORE_USERS']);
    expect(find(store.getActions(), { payload: true, type: 'SET_FETCHING_USERS' })).toBeDefined();
    expect(response).toBeDefined();
    expect(response.payload).toBeDefined();
    expect(response.payload.users).toBeDefined();
    expect(response.payload.users).toHaveLength(2);
    expect(response.payload.users).toEqual(payload.users);
    expect(response.payload.count).toBeDefined();
    expect(response.payload.count).toBe(2);
    expect(find(store.getActions(), { payload: false, type: 'SET_FETCHING_USERS' })).toBeDefined();
  });

  it('should dispatch events if getUsers is called and returned error', async () => {
    adminUserService.getUsers = jest.fn().mockRejectedValueOnce('Some Error');
    await store.dispatch(adminUserActions.getUsers());
    expect(store.getActions()).toEqual([
      { type: 'SET_FETCHING_USERS', payload: true },
      { type: 'SIGN_OUT' },
      { type: 'DISCONNECTED' },
      { type: 'CLEAR_DATA' },
    ]);
  });

  it('should dispatch storeUsersList', async () => {
    await store.dispatch(adminUserActions.storeUsersList('response'));
    expect(store.getActions()).toEqual([{ payload: 'response', type: 'STORE_USERS' }]);
  });
});
