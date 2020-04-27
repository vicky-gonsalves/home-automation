import { adminUserConstants } from '../../_constants';
import { userOne, userTwo } from '../../_utils/fixtures/user.fixture';
import adminUser from './adminUser.reducer';

jest.mock('axios');

describe('adminUser Reducer', () => {
  beforeEach(() => {});

  it('should return default state', () => {
    const newState = adminUser({}, {});
    expect(newState).toEqual({});
  });

  it('should return new state if STORE_USERS', () => {
    const users = {
      users: [userOne, userTwo],
      count: 2,
    };
    const newState = adminUser(
      {},
      {
        type: adminUserConstants.STORE_USERS,
        payload: users,
      }
    );
    expect(newState).toEqual(users);
  });

  it('should return new state if SET_FETCHING_USERS', () => {
    const users = {
      isFetchingUsersList: false,
    };
    const newState = adminUser(
      {},
      {
        type: adminUserConstants.SET_FETCHING_USERS,
        payload: users.isFetchingUsersList,
      }
    );
    expect(newState).toEqual(users);
  });
});
