import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { userService } from '../../_services';
import { initialState, wait } from '../../_utils';
import { userOne } from '../../_utils/fixtures/user.fixture';
import { userActions } from './user.actions';

let store;
const mockStore = configureStore([thunk]);
store = mockStore(initialState);

describe('userActions', () => {
  afterEach(() => {
    store.clearActions();
  });

  it('should dispatch SET_USER action', () => {
    store.dispatch(userActions.setUser(userOne));
    expect(store.getActions()).toEqual([{ type: 'SET_USER', payload: userOne }]);
  });

  it('should dispatch SET_USER action', () => {
    store.dispatch(userActions.setLoginError('Error'));
    expect(store.getActions()).toEqual([{ type: 'SET_LOGIN_ERROR', payload: { error: 'Error' } }]);
  });

  it('should dispatch SIGN_IN action', async () => {
    const user = {
      user: { ...userOne },
      tokens: { access: { token: '', expires: '' }, refresh: { token: '', expires: '' } },
    };
    userService.signInService = jest.fn().mockResolvedValueOnce(user);
    store.dispatch(userActions.signIn({ ...userOne, password: 'somepass', remember: false }));
    await wait();
    expect(store.getActions()).toEqual([
      { type: 'SIGN_IN' },
      { payload: { email: userOne.email, name: userOne.name, tokens: user.tokens }, type: 'SET_USER' },
      { payload: { error: null }, type: 'SET_LOGIN_ERROR' },
    ]);
  });

  it('should dispatch SET_LOGIN_ERROR action if errors', async () => {
    userService.signInService = jest.fn().mockRejectedValueOnce('Error');
    store.dispatch(userActions.signIn({ ...userOne, password: 'somepass', remember: false }));
    await wait();
    expect(store.getActions()).toEqual([{ type: 'SIGN_IN' }, { payload: { error: 'Error' }, type: 'SET_LOGIN_ERROR' }]);
  });

  it('should return user', async () => {
    const user = {
      user: { ...userOne },
      tokens: { access: { token: '', expires: '' }, refresh: { token: '', expires: '' } },
    };
    userService.getMe = jest.fn().mockResolvedValueOnce(user);
    const response = await userActions.me();
    expect(response).toEqual(user);
  });

  it('should dispatch SET_USER_TOKENS action', async () => {
    store.dispatch(userActions.setUserTokens());
    expect(store.getActions()).toEqual([{ payload: {}, type: 'SET_USER_TOKENS' }]);
  });
});
