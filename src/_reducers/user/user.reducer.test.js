import { userConstants } from '../../_constants';
import { userService } from '../../_services';
import user from './user.reducer';

jest.mock('axios');

describe('User Reducer', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });
  describe('InitialState From User Service', () => {
    it('should return default state if has no storedUser', () => {
      userService.getCurrentUser = jest.fn().mockReturnValueOnce();
      const newState = user(undefined, {});
      expect(newState).toEqual({
        email: null,
        role: null,
        isAuthorized: null,
        isFetching: false,
        isLoggedIn: false,
        loginError: null,
        name: null,
        remember: false,
        tokens: {},
        hasFetchedDevices: false,
      });
      userService.getCurrentUser.mockClear();
    });

    it('should return default state if has no storedUser user object', () => {
      userService.getCurrentUser = jest.fn().mockReturnValueOnce({});
      const newState = user(undefined, {});
      expect(newState).toEqual({
        email: null,
        role: null,
        isAuthorized: null,
        isFetching: false,
        isLoggedIn: false,
        loginError: null,
        name: null,
        remember: false,
        tokens: {},
        hasFetchedDevices: false,
      });
      userService.getCurrentUser.mockClear();
    });

    it('should return default state if has no storedUser user object', () => {
      userService.getCurrentUser = jest.fn().mockReturnValueOnce({ user: {} });
      const newState = user(undefined, {});
      expect(newState).toEqual({
        email: null,
        role: null,
        isAuthorized: null,
        isFetching: false,
        isLoggedIn: false,
        loginError: null,
        name: null,
        remember: false,
        tokens: {},
        hasFetchedDevices: false,
      });
      userService.getCurrentUser.mockClear();
    });

    it('should return default state if has no storedUser user name object', () => {
      userService.getCurrentUser = jest.fn().mockReturnValueOnce({ user: { name: 'Vicky' } });
      const newState = user(undefined, {});
      expect(newState).toEqual({
        email: null,
        role: null,
        isAuthorized: null,
        isFetching: false,
        isLoggedIn: false,
        loginError: null,
        name: 'Vicky',
        remember: false,
        tokens: {},
        hasFetchedDevices: false,
      });
      userService.getCurrentUser.mockClear();
    });

    it('should return default state if has no storedUser user name and email object', () => {
      userService.getCurrentUser = jest
        .fn()
        .mockReturnValueOnce({ user: { name: 'Vicky', email: 'vicky.gonsalves@outlook.com' } });
      const newState = user(undefined, {});
      expect(newState).toEqual({
        email: 'vicky.gonsalves@outlook.com',
        role: null,
        isAuthorized: null,
        isFetching: false,
        isLoggedIn: false,
        loginError: null,
        name: 'Vicky',
        remember: false,
        tokens: {},
        hasFetchedDevices: false,
      });
      userService.getCurrentUser.mockClear();
    });

    it('should return default state if has no storedUser user name and email and role object', () => {
      userService.getCurrentUser = jest
        .fn()
        .mockReturnValueOnce({ user: { name: 'Vicky', email: 'vicky.gonsalves@outlook.com', role: 'admin' } });
      const newState = user(undefined, {});
      expect(newState).toEqual({
        email: 'vicky.gonsalves@outlook.com',
        role: 'admin',
        isAuthorized: null,
        isFetching: false,
        isLoggedIn: false,
        loginError: null,
        name: 'Vicky',
        remember: false,
        tokens: {},
        hasFetchedDevices: false,
      });
      userService.getCurrentUser.mockClear();
    });

    it('should return default state if has no storedUser user name, email and tokens object', () => {
      userService.getCurrentUser = jest.fn().mockReturnValueOnce({
        user: { name: 'Vicky', email: 'vicky.gonsalves@outlook.com' },
        tokens: { access: {}, refresh: {} },
      });
      const newState = user(undefined, {});
      expect(newState).toEqual({
        email: 'vicky.gonsalves@outlook.com',
        role: null,
        isAuthorized: null,
        isFetching: false,
        isLoggedIn: true,
        loginError: null,
        name: 'Vicky',
        remember: false,
        tokens: { access: {}, refresh: {} },
        hasFetchedDevices: false,
      });
      userService.getCurrentUser.mockClear();
    });

    it('should return default state if has no storedUser user name, email and tokens and hasFetchedDevices', () => {
      userService.getCurrentUser = jest.fn().mockReturnValueOnce({
        user: { name: 'Vicky', email: 'vicky.gonsalves@outlook.com' },
        tokens: { access: {}, refresh: {} },
      });
      const newState = user(undefined, {});
      expect(newState).toEqual({
        email: 'vicky.gonsalves@outlook.com',
        role: null,
        isAuthorized: null,
        isFetching: false,
        isLoggedIn: true,
        loginError: null,
        name: 'Vicky',
        remember: false,
        tokens: { access: {}, refresh: {} },
        hasFetchedDevices: false,
      });
      userService.getCurrentUser.mockClear();
    });
  });

  describe('InitialState Faked', () => {
    it('should return default state', () => {
      const newState = user({}, {});
      expect(newState).toEqual({});
    });

    it('should return new state if SET_USER', () => {
      const currentUser = {
        name: 'Vicky Gonsalves',
        email: 'vicky.gonsalves@outlook.com',
        role: 'admin',
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
            role: currentUser.role,
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

    it('should return new state if SET_FETCHED_DEVICES', () => {
      const currentUser = {
        hasFetchedDevices: true,
      };
      const newState = user(
        {},
        {
          type: userConstants.SET_FETCHED_DEVICES,
          payload: true,
        }
      );
      expect(newState).toEqual(currentUser);
    });

    it('should return default state if SIGN_OUT', () => {
      const currentUser = {
        name: null,
        email: null,
        role: null,
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
        role: 'admin',
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
            role: currentUser.role,
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
        role: 'admin',
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
            role: currentUser.role,
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
        role: 'admin',
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
            role: currentUser.role,
            remember: currentUser.remember,
            tokens: currentUser.tokens,
          },
        }
      );
      expect(newState).toEqual(JSON.parse(sessionStorage.getItem('user')));
    });
  });
});
