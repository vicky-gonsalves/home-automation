import axios from 'axios';
import { userActions } from '../../_actions';
import { meData } from '../../_utils/mock/me/me.data';
import { deviceService } from './device.service';
import config from '../../config';

jest.mock('axios');

describe('deviceService', () => {
  it('should get my devices without error', async () => {
    axios.get.mockReturnValue(
      Promise.resolve({
        data: meData,
      })
    );
    const apiCall = deviceService.getMyDevices();
    expect(axios.get).toHaveBeenCalledWith(`${config.apiUrl}/me/devices`);
    await expect(apiCall).resolves.toEqual(meData);
  });

  it('should return error if no data', async () => {
    axios.get.mockReturnValue(Promise.resolve());
    const apiCall = deviceService.getMyDevices();
    expect(axios.get).toHaveBeenCalledWith(`${config.apiUrl}/me/devices`);
    await expect(apiCall).rejects.toEqual('No Data');
  });

  it('should return authentication error', async () => {
    userActions.signOut = jest.fn();
    const message = 'Please authenticate';
    const status = 401;
    const error = {
      response: {
        status,
        data: { code: status, message },
      },
    };
    axios.get.mockReturnValue(Promise.reject(error));
    const apiCall = deviceService.getMyDevices();
    expect(axios.get).toHaveBeenCalledWith(`${config.apiUrl}/me/devices`);
    await expect(apiCall).rejects.toEqual(message);
    expect(userActions.signOut).toHaveBeenCalled();
    userActions.signOut.mockRestore();
  });

  it('should return Bad request error from statusText', async () => {
    const message = 'Bad Request';
    const status = 400;
    const error = {
      response: {
        status,
        statusText: message,
      },
    };
    axios.get.mockReturnValue(Promise.reject(error));
    const apiCall = deviceService.getMyDevices();
    expect(axios.get).toHaveBeenCalledWith(`${config.apiUrl}/me/devices`);
    await expect(apiCall).rejects.toEqual(message);
  });

  it('should return network error', async () => {
    axios.get.mockReturnValue(Promise.reject());
    const apiCall = deviceService.getMyDevices();
    expect(axios.get).toHaveBeenCalledWith(`${config.apiUrl}/me/devices`);
    await expect(apiCall).rejects.toEqual('Network Error');
  });
});
