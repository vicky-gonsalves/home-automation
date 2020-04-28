import axios from 'axios';
import { userService } from '..';
import { userOne, userTwo } from '../../_utils/fixtures/user.fixture';
import config from '../../config';
import { adminUserService } from './adminUser.service';

jest.mock('axios');

describe('deviceSettingService', () => {
  afterAll(() => {
    axios.get.mockReset();
  });

  it('should getUsers without error', async () => {
    const params = { limit: 10 };
    const response = {
      users: [userOne, userTwo],
      count: 2,
    };
    axios.get.mockReturnValue(
      Promise.resolve({
        data: { users: [userOne, userTwo], count: 2 },
      })
    );
    const apiCall = adminUserService.getUsers(params);
    expect(axios.get).toHaveBeenCalledWith(`${config.apiUrl}/users`, { params });
    await expect(apiCall).resolves.toEqual(response);
  });

  it('should return error if no data', async () => {
    const params = { limit: 10 };
    axios.get.mockReturnValue(Promise.resolve());
    const apiCall = adminUserService.getUsers(params);
    expect(axios.get).toHaveBeenCalledWith(`${config.apiUrl}/users`, { params });
    await expect(apiCall).rejects.toEqual('No Data');
  });

  it('should return authentication error', async () => {
    const params = { limit: 10 };
    userService.signOutService = jest.fn();
    const message = 'Please authenticate';
    const status = 401;
    const error = {
      response: {
        status,
        data: { code: status, message },
      },
    };
    axios.get.mockReturnValue(Promise.reject(error));
    const apiCall = adminUserService.getUsers(params);
    expect(axios.get).toHaveBeenCalledWith(`${config.apiUrl}/users`, { params });
    await expect(apiCall).rejects.toEqual(message);
    expect(userService.signOutService).toHaveBeenCalled();
    userService.signOutService.mockRestore();
  });

  it('should return Bad request error from statusText', async () => {
    const params = { limit: 10 };
    const message = 'Bad Request';
    const status = 400;
    const error = {
      response: {
        status,
        statusText: message,
      },
    };
    axios.get.mockReturnValue(Promise.reject(error));
    const apiCall = adminUserService.getUsers(params);
    expect(axios.get).toHaveBeenCalledWith(`${config.apiUrl}/users`, { params });
    await expect(apiCall).rejects.toEqual(message);
  });

  it('should return network error', async () => {
    const params = { limit: 10 };
    axios.get.mockReturnValue(Promise.reject());
    const apiCall = adminUserService.getUsers();
    expect(axios.get).toHaveBeenCalledWith(`${config.apiUrl}/users`, { params });
    await expect(apiCall).rejects.toEqual('Network Error');
  });
});
