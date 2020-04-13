import axios from 'axios';
import faker from 'faker';
import { mockEmptyErrorResponse, mockErrorResponse, mockStatusTextErrorResponse, mockSuccesfulResponse } from '../../_utils';
import { userOne } from '../../_utils/fixtures/user.fixture';
import { userService } from './user.service';

jest.mock('axios');
const id = faker.random.uuid();
const name = faker.name.firstName();
const email = faker.internet.email();
const password = faker.internet.password();
const successResponse = {
  user: {
    id,
    email,
    name,
    role: 'admin',
  },
  tokens: {
    access: {
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZTNlNzk3NGYxZTIzZDI2ZmM2YTM1MzQiLCJpYXQiOjE1ODE5MjUyMTUsImV4cCI6MTU4MTkyNzAxNX0.gfAlQxGUPIS5ORdAzmgPiRamjd80Sa4kUMISSlkijxs',
      expires: '2020-02-17T08:10:15.636Z',
    },
    refresh: {
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZTNlNzk3NGYxZTIzZDI2ZmM2YTM1MzQiLCJpYXQiOjE1ODE5MjUyMTUsImV4cCI6MTU4NDUxNzIxNX0.amE9XfZEgUTDriSVxNtlIIb4spwaTHbT-v0CosGQR8Y',
      expires: '2020-03-18T07:40:15.641Z',
    },
  },
};

const response401 = {
  message: 'Incorrect email or password',
  stack: 'Error: Incorrect email or password',
};

describe('User Service', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  afterEach(() => {
    axios.mockClear();
  });

  describe('signInService and signOutService', () => {
    it('should return user when signInService is called with valid credentials', async () => {
      mockSuccesfulResponse(200, 'POST', successResponse);
      const response = await userService.signInService(email, password, false);
      expect(response).toBeInstanceOf(Object);
      expect(response).toEqual(successResponse);
    });

    it('should return error if no data', () => {
      mockSuccesfulResponse(200, 'POST');
      userService.signInService(email, password, false).catch(e => {
        expect(e).toEqual('No Data');
      });
    });

    it('should return network error', () => {
      mockEmptyErrorResponse(400, 'POST');
      userService.signInService(email, password, false).catch(e => {
        expect(e).toEqual('Network Error');
      });
    });

    it('should return Bad request error from statusText', async () => {
      const message = 'Bad Request';
      mockStatusTextErrorResponse(400, 'POST', message);
      userService.signInService(email, password, false).catch(e => {
        expect(e).toEqual(message);
      });
    });

    it('should save user in localStorage when remember is true', async () => {
      mockSuccesfulResponse(200, 'POST', successResponse);
      await userService.signInService(email, password, true);
      expect(localStorage.setItem).toHaveBeenLastCalledWith('user', JSON.stringify(successResponse));
      expect(localStorage.__STORE__.user).toBe(JSON.stringify(successResponse));
      expect(Object.keys(localStorage.__STORE__).length).toBe(1);
    });

    it('should not save user in localStorage when remember is false by default', async () => {
      mockSuccesfulResponse(200, 'POST', successResponse);
      await userService.signInService(email, password);
      expect(localStorage.__STORE__.user).toBeUndefined();
    });

    it('should save user in sessionStorage when remember is false', async () => {
      mockSuccesfulResponse(200, 'POST', successResponse);
      await userService.signInService(email, password, false);
      expect(sessionStorage.setItem).toHaveBeenLastCalledWith('user', JSON.stringify(successResponse));
      expect(sessionStorage.__STORE__.user).toBe(JSON.stringify(successResponse));
      expect(Object.keys(sessionStorage.__STORE__).length).toBe(1);
    });

    it('should not authenticate when signInService is called with invalid credentials', () => {
      mockErrorResponse(401, 'POST', response401);
      // eslint-disable-next-line jest/valid-expect-in-promise
      userService
        .signInService(email, password, false)
        .then(res => {
          expect(res).toBeUndefined();
        })
        .catch(e => {
          expect(e).toEqual(response401.message);
          expect(localStorage.removeItem).toHaveBeenLastCalledWith('user');
          expect(sessionStorage.removeItem).toHaveBeenLastCalledWith('user');
          expect(sessionStorage.__STORE__.user).toBeUndefined();
        });
    });
  });

  describe('getMe', () => {
    it('should return user without Error', async () => {
      mockSuccesfulResponse(200, 'GET', userOne);
      const response = await userService.getMe();
      expect(response).toBeInstanceOf(Object);
      expect(response).toEqual({ data: { ...userOne }, status: 200 });
    });

    it('should return error if no data', () => {
      mockSuccesfulResponse();
      userService.getMe().catch(e => {
        expect(e).toEqual('No Data');
      });
    });

    it('should return network error', () => {
      mockEmptyErrorResponse();
      userService.getMe().catch(e => {
        expect(e).toEqual('Network Error');
      });
    });
  });

  describe('getCurrentUser', () => {
    it('should return current user from localStorage', () => {
      localStorage.setItem('user', JSON.stringify(userOne));
      expect(userService.getCurrentUser()).toEqual(userOne);
    });
    it('should return current user from sessionStorage', () => {
      sessionStorage.setItem('user', JSON.stringify(userOne));
      expect(userService.getCurrentUser()).toEqual(userOne);
    });
  });

  describe('getRefreshToken', () => {
    it('should return refresh token without error', () => {
      const user = {
        ...userOne,
        tokens: {
          refresh: {
            token: 'sometoken',
            expires: new Date(),
          },
        },
      };
      localStorage.setItem('user', JSON.stringify(user));
      expect(userService.getRefreshToken()).toEqual(user.tokens.refresh.token);
    });

    it('should not return refresh token if no expires info', () => {
      const user = {
        ...userOne,
        tokens: {
          refresh: {
            token: 'sometoken',
          },
        },
      };
      sessionStorage.setItem('user', JSON.stringify(user));
      expect(userService.getRefreshToken()).toBeNull();
    });

    it('should not return refresh token if no token', () => {
      const user = {
        ...userOne,
        tokens: {
          refresh: {},
        },
      };
      sessionStorage.setItem('user', JSON.stringify(user));
      expect(userService.getRefreshToken()).toBeNull();
    });

    it('should not return refresh token if no refresh', () => {
      const user = {
        ...userOne,
        tokens: {},
      };
      sessionStorage.setItem('user', JSON.stringify(user));
      expect(userService.getRefreshToken()).toBeNull();
    });

    it('should not return refresh token if no tokens', () => {
      const user = {
        ...userOne,
      };
      sessionStorage.setItem('user', JSON.stringify(user));
      expect(userService.getRefreshToken()).toBeNull();
    });

    it('should not return refresh token if no user', () => {
      const user = {};
      sessionStorage.setItem('user', JSON.stringify(user));
      expect(userService.getRefreshToken()).toBeNull();
    });
  });

  describe('getAccessToken', () => {
    it('should return access token without error', () => {
      const user = {
        ...userOne,
        tokens: {
          access: {
            token: 'sometoken',
            expires: new Date(),
          },
        },
      };
      localStorage.setItem('user', JSON.stringify(user));
      expect(userService.getAccessToken()).toEqual(user.tokens.access.token);
    });

    it('should not return access token if no expires info', () => {
      const user = {
        ...userOne,
        tokens: {
          access: {
            token: 'sometoken',
          },
        },
      };
      sessionStorage.setItem('user', JSON.stringify(user));
      expect(userService.getAccessToken()).toBeNull();
    });

    it('should not return refresh token if no token', () => {
      const user = {
        ...userOne,
        tokens: {
          access: {},
        },
      };
      sessionStorage.setItem('user', JSON.stringify(user));
      expect(userService.getAccessToken()).toBeNull();
    });

    it('should not return refresh token if no access', () => {
      const user = {
        ...userOne,
        tokens: {},
      };
      sessionStorage.setItem('user', JSON.stringify(user));
      expect(userService.getAccessToken()).toBeNull();
    });

    it('should not return refresh token if no tokens', () => {
      const user = {
        ...userOne,
      };
      sessionStorage.setItem('user', JSON.stringify(user));
      expect(userService.getAccessToken()).toBeNull();
    });

    it('should not return refresh token if no user', () => {
      const user = {};
      sessionStorage.setItem('user', JSON.stringify(user));
      expect(userService.getAccessToken()).toBeNull();
    });
  });

  describe('setNewTokens', () => {
    it('should set new tokens in localStorage without error', () => {
      const user = {
        ...userOne,
        tokens: {
          access: {
            token: 'someaccessoken',
            expires: new Date(),
          },
          refresh: {
            token: 'somerefreshtoken',
            expires: new Date(),
          },
        },
      };
      const newToken = {
        access: {
          token: 'somenewaccessoken',
          expires: new Date(),
        },
        refresh: {
          token: 'somenewrefreshtoken',
          expires: new Date(),
        },
      };
      localStorage.setItem('user', JSON.stringify(user));
      userService.setNewTokens(newToken);
      expect(localStorage.__STORE__.user).toBe(JSON.stringify({ ...user, tokens: newToken }));
    });

    it('should set new tokens in sessionStorage without error', () => {
      const user = {
        ...userOne,
        tokens: {
          access: {
            token: 'someaccessoken',
            expires: new Date(),
          },
          refresh: {
            token: 'somerefreshtoken',
            expires: new Date(),
          },
        },
      };
      const newToken = {
        access: {
          token: 'somenewaccessoken',
          expires: new Date(),
        },
        refresh: {
          token: 'somenewrefreshtoken',
          expires: new Date(),
        },
      };
      sessionStorage.setItem('user', JSON.stringify(user));
      userService.setNewTokens(newToken);
      expect(sessionStorage.__STORE__.user).toBe(JSON.stringify({ ...user, tokens: newToken }));
    });

    it('should not set new tokens if no user is available in localStorage and sessionStorage', () => {
      const newToken = {
        access: {
          token: 'somenewaccessoken',
          expires: new Date(),
        },
        refresh: {
          token: 'somenewrefreshtoken',
          expires: new Date(),
        },
      };
      userService.setNewTokens(newToken);
      expect(sessionStorage.__STORE__.user).toBeUndefined();
      expect(localStorage.__STORE__.user).toBeUndefined();
    });
  });
});
