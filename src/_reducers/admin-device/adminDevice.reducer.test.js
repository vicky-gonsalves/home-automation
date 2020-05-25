import { adminDeviceConstants } from '../../_constants';
import { deviceOne, deviceTwo } from '../../_utils/fixtures/device.fixture';
import adminDevice from './adminDevice.reducer';

jest.mock('axios');

describe('adminDevice Reducer', () => {
  beforeEach(() => {});

  it('should return default state', () => {
    const newState = adminDevice({}, {});
    expect(newState).toEqual({});
  });

  it('should return new state if STORE_DEVICES', () => {
    const devices = {
      devices: [deviceOne, deviceTwo],
      count: 2,
    };
    const newState = adminDevice(
      {},
      {
        type: adminDeviceConstants.STORE_DEVICES,
        payload: devices,
      }
    );
    expect(newState).toEqual(devices);
  });

  it('should return new state if SET_FETCHING_DEVICES', () => {
    const devices = {
      isFetchingDevicesList: false,
    };
    const newState = adminDevice(
      {},
      {
        type: adminDeviceConstants.SET_FETCHING_DEVICES,
        payload: devices.isFetchingDevicesList,
      }
    );
    expect(newState).toEqual(devices);
  });
});
