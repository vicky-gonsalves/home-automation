import axios from 'axios';
import { userActions } from '../../_actions';
import { subDeviceParamOne } from '../../_utils/fixtures/subDeviceParam.fixture';
import { updatedSubDeviceParams } from '../../_utils/mock/sub-device-param/subDeviceParam.data';
import config from '../../config';
import { subDeviceParamService } from './subDeviceParam.service';

jest.mock('axios');

describe('deviceSubDeviceParamService', () => {
  afterAll(() => {
    axios.mockClear();
  });
  describe('updateSubDeviceParamMode', () => {
    const route = `${config.apiUrl}/devices/${subDeviceParamOne.deviceId}/sub-devices/${subDeviceParamOne.subDeviceId}/sub-device-param-value/mode`;

    it('should update subDevice param Mode without error', async () => {
      axios.patch.mockReturnValue(Promise.resolve({ data: updatedSubDeviceParams }));
      const apiCall = subDeviceParamService.updateSubDeviceParamMode(updatedSubDeviceParams);
      expect(axios.patch).toHaveBeenCalledWith(route, { paramValue: subDeviceParamOne.paramValue });
      await expect(apiCall).resolves.toEqual(updatedSubDeviceParams);
    });

    it('should return error if no data', async () => {
      axios.patch.mockReturnValue(Promise.resolve());
      const apiCall = subDeviceParamService.updateSubDeviceParamMode(updatedSubDeviceParams);
      expect(axios.patch).toHaveBeenCalledWith(route, { paramValue: subDeviceParamOne.paramValue });
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
      axios.patch.mockReturnValue(Promise.reject(error));
      const apiCall = subDeviceParamService.updateSubDeviceParamMode(updatedSubDeviceParams);
      expect(axios.patch).toHaveBeenCalledWith(route, { paramValue: subDeviceParamOne.paramValue });
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
      axios.patch.mockReturnValue(Promise.reject(error));
      const apiCall = subDeviceParamService.updateSubDeviceParamMode(updatedSubDeviceParams);
      expect(axios.patch).toHaveBeenCalledWith(route, { paramValue: subDeviceParamOne.paramValue });
      await expect(apiCall).rejects.toEqual(message);
    });

    it('should return network error', async () => {
      axios.patch.mockReturnValue(Promise.reject());
      const apiCall = subDeviceParamService.updateSubDeviceParamMode(updatedSubDeviceParams);
      expect(axios.patch).toHaveBeenCalledWith(route, { paramValue: subDeviceParamOne.paramValue });
      await expect(apiCall).rejects.toEqual('Network Error');
    });
  });

  describe('updateSubDeviceParamStatus', () => {
    const route = `${config.apiUrl}/devices/${subDeviceParamOne.deviceId}/sub-devices/${subDeviceParamOne.subDeviceId}/sub-device-param-value/status`;

    it('should update subDevice param Status without error', async () => {
      axios.patch.mockReturnValue(Promise.resolve({ data: updatedSubDeviceParams }));
      const apiCall = subDeviceParamService.updateSubDeviceParamStatus(subDeviceParamOne);
      expect(axios.patch).toHaveBeenCalledWith(route, { paramValue: subDeviceParamOne.paramValue });
      await expect(apiCall).resolves.toEqual(updatedSubDeviceParams);
    });

    it('should return error if no data', async () => {
      axios.patch.mockReturnValue(Promise.resolve());
      const apiCall = subDeviceParamService.updateSubDeviceParamStatus(subDeviceParamOne);
      expect(axios.patch).toHaveBeenCalledWith(route, { paramValue: subDeviceParamOne.paramValue });
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
      axios.patch.mockReturnValue(Promise.reject(error));
      const apiCall = subDeviceParamService.updateSubDeviceParamStatus(subDeviceParamOne);
      expect(axios.patch).toHaveBeenCalledWith(route, { paramValue: subDeviceParamOne.paramValue });
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
      axios.patch.mockReturnValue(Promise.reject(error));
      const apiCall = subDeviceParamService.updateSubDeviceParamStatus(subDeviceParamOne);
      expect(axios.patch).toHaveBeenCalledWith(route, { paramValue: subDeviceParamOne.paramValue });
      await expect(apiCall).rejects.toEqual(message);
    });

    it('should return network error', async () => {
      axios.patch.mockReturnValue(Promise.reject());
      const apiCall = subDeviceParamService.updateSubDeviceParamStatus(subDeviceParamOne);
      expect(axios.patch).toHaveBeenCalledWith(route, { paramValue: subDeviceParamOne.paramValue });
      await expect(apiCall).rejects.toEqual('Network Error');
    });
  });

  describe('updateAllSubDeviceParamStatus', () => {
    const route = `${config.apiUrl}/devices/${subDeviceParamOne.deviceId}/sub-device-param-value/status`;

    it('should update all subDevice param Status without error', async () => {
      const data = {
        status: 200,
      };
      axios.patch.mockReturnValue(Promise.resolve(data));
      const apiCall = subDeviceParamService.updateAllSubDeviceParamStatus(
        subDeviceParamOne.deviceId,
        subDeviceParamOne.paramValue
      );
      expect(axios.patch).toHaveBeenCalledWith(route, { paramValue: subDeviceParamOne.paramValue });
      await expect(apiCall).resolves.toEqual(data);
    });

    it('should return error if no data', async () => {
      axios.patch.mockReturnValue(Promise.resolve());
      const apiCall = subDeviceParamService.updateAllSubDeviceParamStatus(
        subDeviceParamOne.deviceId,
        subDeviceParamOne.paramValue
      );
      expect(axios.patch).toHaveBeenCalledWith(route, { paramValue: subDeviceParamOne.paramValue });
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
      axios.patch.mockReturnValue(Promise.reject(error));
      const apiCall = subDeviceParamService.updateAllSubDeviceParamStatus(
        subDeviceParamOne.deviceId,
        subDeviceParamOne.paramValue
      );
      expect(axios.patch).toHaveBeenCalledWith(route, { paramValue: subDeviceParamOne.paramValue });
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
      axios.patch.mockReturnValue(Promise.reject(error));
      const apiCall = subDeviceParamService.updateAllSubDeviceParamStatus(
        subDeviceParamOne.deviceId,
        subDeviceParamOne.paramValue
      );
      expect(axios.patch).toHaveBeenCalledWith(route, { paramValue: subDeviceParamOne.paramValue });
      await expect(apiCall).rejects.toEqual(message);
    });

    it('should return network error', async () => {
      axios.patch.mockReturnValue(Promise.reject());
      const apiCall = subDeviceParamService.updateAllSubDeviceParamStatus(
        subDeviceParamOne.deviceId,
        subDeviceParamOne.paramValue
      );
      expect(axios.patch).toHaveBeenCalledWith(route, { paramValue: subDeviceParamOne.paramValue });
      await expect(apiCall).rejects.toEqual('Network Error');
    });
  });
});
