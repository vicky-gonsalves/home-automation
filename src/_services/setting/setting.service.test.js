import axios from 'axios';
import { actions } from '../../_actions';
import { updatedDeviceSettings } from '../../_utils/mock/device-setting/deviceSetting';
import config from '../../config';
import { settingService } from './setting.service';

jest.mock('axios');

describe('deviceSettingService', () => {
  it('should get my devices without error', async () => {
    axios.patch.mockReturnValue(
      Promise.resolve({
        data: updatedDeviceSettings,
      })
    );
    const apiCall = settingService.updateSettings(updatedDeviceSettings);
    expect(axios.patch).toHaveBeenCalledWith(`${config.apiUrl}/settings/multi`, updatedDeviceSettings);
    await expect(apiCall).resolves.toEqual(updatedDeviceSettings);
  });

  it('should return error if no data', async () => {
    axios.patch.mockReturnValue(Promise.resolve());
    const apiCall = settingService.updateSettings(updatedDeviceSettings);
    expect(axios.patch).toHaveBeenCalledWith(`${config.apiUrl}/settings/multi`, updatedDeviceSettings);
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
    const apiCall = settingService.updateSettings(updatedDeviceSettings);
    expect(axios.patch).toHaveBeenCalledWith(`${config.apiUrl}/settings/multi`, updatedDeviceSettings);
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
    const apiCall = settingService.updateSettings(updatedDeviceSettings);
    expect(axios.patch).toHaveBeenCalledWith(`${config.apiUrl}/settings/multi`, updatedDeviceSettings);
    await expect(apiCall).rejects.toEqual(message);
  });

  it('should return network error', async () => {
    axios.patch.mockReturnValue(Promise.reject());
    const apiCall = settingService.updateSettings(updatedDeviceSettings);
    expect(axios.patch).toHaveBeenCalledWith(`${config.apiUrl}/settings/multi`, updatedDeviceSettings);
    await expect(apiCall).rejects.toEqual('Network Error');
  });
});
