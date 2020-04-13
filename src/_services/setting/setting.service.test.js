import axios from 'axios';
import { actions } from '../../_actions';
import { updatedSettings } from '../../_utils/mock/setting/setting.data';
import config from '../../config';
import { settingService } from './setting.service';

jest.mock('axios');

describe('deviceSettingService', () => {
  it('should update settings without error', async () => {
    axios.patch.mockReturnValue(
      Promise.resolve({
        data: updatedSettings,
      })
    );
    const apiCall = settingService.updateSettings(updatedSettings);
    expect(axios.patch).toHaveBeenCalledWith(`${config.apiUrl}/settings/multi`, updatedSettings);
    await expect(apiCall).resolves.toEqual(updatedSettings);
  });

  it('should return error if no data', async () => {
    axios.patch.mockReturnValue(Promise.resolve());
    const apiCall = settingService.updateSettings(updatedSettings);
    expect(axios.patch).toHaveBeenCalledWith(`${config.apiUrl}/settings/multi`, updatedSettings);
    await expect(apiCall).rejects.toEqual('No Data');
  });

  it('should return authentication error', async () => {
    actions.signOut = jest.fn();
    const message = 'Please authenticate';
    const status = 401;
    const error = {
      response: {
        status,
        data: { code: status, message },
      },
    };
    axios.patch.mockReturnValue(Promise.reject(error));
    const apiCall = settingService.updateSettings(updatedSettings);
    expect(axios.patch).toHaveBeenCalledWith(`${config.apiUrl}/settings/multi`, updatedSettings);
    await expect(apiCall).rejects.toEqual(message);
    expect(actions.signOut).toHaveBeenCalled();
    actions.signOut.mockRestore();
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
    axios.patch.mockReturnValue(Promise.reject(error));
    const apiCall = settingService.updateSettings(updatedSettings);
    expect(axios.patch).toHaveBeenCalledWith(`${config.apiUrl}/settings/multi`, updatedSettings);
    await expect(apiCall).rejects.toEqual(message);
  });

  it('should return network error', async () => {
    axios.patch.mockReturnValue(Promise.reject());
    const apiCall = settingService.updateSettings(updatedSettings);
    expect(axios.patch).toHaveBeenCalledWith(`${config.apiUrl}/settings/multi`, updatedSettings);
    await expect(apiCall).rejects.toEqual('Network Error');
  });
});
