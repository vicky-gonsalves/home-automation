import { userConstants } from '../../_constants';
import user from './user.reducer';

describe('User Reducer', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  it('should return default state', () => {
    const newState = user({}, {});
    expect(newState).toEqual({});
  });

  it('should return new state if SET_USER', () => {
    const currentUser = {
      name: 'Vicky Gonsalves',
      email: 'vicky.gonsalves@outlook.com',
      remember: false,
      isLoggedIn: true,
      isFetching: false,
      tokens: {},
      loginError: null,
      isAuthorized: true,
    };
    const newState = user(
      {},
      {
        type: userConstants.SET_USER,
        payload: {
          name: currentUser.name,
          email: currentUser.email,
          remember: currentUser.remember,
          tokens: currentUser.tokens,
        },
      }
    );
    expect(newState).toEqual(currentUser);
  });

  it('should return new state if SET_USER_TOKENS', () => {
    const currentUser = {
      isLoggedIn: true,
      isFetching: false,
      tokens: { refresh: { token: 'sometoken' } },
      loginError: null,
      isAuthorized: false,
    };
    const newState = user(
      {},
      {
        type: userConstants.SET_USER_TOKENS,
        payload: {
          tokens: currentUser.tokens,
        },
      }
    );
    expect(newState).toEqual(currentUser);
  });

  it('should return new state if SIGN_IN', () => {
    const currentUser = {
      isFetching: true,
      loginError: null,
    };
    const newState = user(
      {},
      {
        type: userConstants.SIGN_IN,
        payload: currentUser,
      }
    );
    expect(newState).toEqual(currentUser);
  });

  it('should return default state if SIGN_OUT', () => {
    const currentUser = {
      name: null,
      email: null,
      remember: null,
      isLoggedIn: false,
      isFetching: false,
      tokens: null,
      loginError: null,
      isAuthorized: false,
    };
    const newState = user(
      {},
      {
        type: userConstants.SIGN_OUT,
      }
    );
    expect(newState).toEqual(currentUser);
  });

  it('should return default state if GET_ME', () => {
    const currentUser = {
      name: 'Vicky Gonsalves',
      email: 'vicky.gonsalves@outlook.com',
      isFetching: false,
      loginError: null,
      isAuthorized: true,
    };
    const newState = user(
      {},
      {
        type: userConstants.GET_ME,
        payload: {
          name: currentUser.name,
          email: currentUser.email,
        },
      }
    );
    expect(newState).toEqual(currentUser);
  });

  it('should return new state if SET_LOGIN_ERROR', () => {
    const currentUser = {
      isFetching: false,
      loginError: 'Error',
      isAuthorized: false,
    };
    const newState = user(
      {},
      {
        type: userConstants.SET_LOGIN_ERROR,
        payload: {
          error: currentUser.loginError,
        },
      }
    );
    expect(newState).toEqual(currentUser);
  });

  it('should return user if localStorage has user object', () => {
    const currentUser = {
      name: 'Vicky Gonsalves',
      email: 'vicky.gonsalves@outlook.com',
      remember: false,
      isLoggedIn: true,
      isFetching: false,
      tokens: {},
      loginError: null,
      isAuthorized: true,
    };
    localStorage.setItem('user', JSON.stringify(currentUser));
    const newState = user(
      {},
      {
        type: userConstants.SET_USER,
        payload: {
          name: currentUser.name,
          email: currentUser.email,
          remember: currentUser.remember,
          tokens: currentUser.tokens,
        },
      }
    );
    expect(newState).toEqual(JSON.parse(localStorage.getItem('user')));
  });

  it('should return user if sessionStorage has user object', () => {
    const currentUser = {
      name: 'Vicky Gonsalves',
      email: 'vicky.gonsalves@outlook.com',
      remember: false,
      isLoggedIn: true,
      isFetching: false,
      tokens: {},
      loginError: null,
      isAuthorized: true,
    };
    sessionStorage.setItem('user', JSON.stringify(currentUser));
    const newState = user(
      {},
      {
        type: userConstants.SET_USER,
        payload: {
          name: currentUser.name,
          email: currentUser.email,
          remember: currentUser.remember,
          tokens: currentUser.tokens,
        },
      }
    );
    expect(newState).toEqual(JSON.parse(sessionStorage.getItem('user')));
  });
});
