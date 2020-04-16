import { deviceConstants } from '../../_constants';
import { deviceOne, deviceTwo } from '../../_utils/fixtures/device.fixture';
import device from './device.reducer';

jest.mock('axios');

describe('Device Reducer', () => {
  beforeEach(() => {});

  it('should return default state', () => {
    const newState = device({}, {});
    expect(newState).toEqual({});
  });

  it('should return new state if DEVICE_UPDATE_FETCHING', () => {
    const currentDevice = {
      isFetchingDevice: true,
    };
    const newState = device(
      {},
      {
        type: deviceConstants.DEVICE_UPDATE_FETCHING,
        payload: currentDevice.isFetchingDevice,
      }
    );
    expect(newState).toEqual(currentDevice);
  });

  it('should return new state if DEVICE_STORE_ALL', () => {
    const currentDevice = {
      isFetchingDevice: false,
      devices: [deviceOne, deviceTwo],
    };
    const newState = device(
      {},
      {
        type: deviceConstants.DEVICE_STORE_ALL,
        payload: currentDevice.devices,
      }
    );
    expect(newState).toEqual(currentDevice);
  });

  it('should return new state if DEVICE_GET_ERROR', () => {
    const currentDevice = {
      isFetchingDevice: false,
      hasError: true,
      devices: [],
    };
    const newState = device(
      {},
      {
        type: deviceConstants.DEVICE_GET_ERROR,
      }
    );
    expect(newState).toEqual(currentDevice);
  });

  it('should return new state if DEVICE_REMOVE_ALL', () => {
    const currentDevice = {
      isFetchingDevice: false,
      hasError: false,
      devices: [],
    };
    const newState = device(
      {},
      {
        type: deviceConstants.DEVICE_REMOVE_ALL,
      }
    );
    expect(newState).toEqual(currentDevice);
  });

  it('should return new state if DEVICE_UPDATED', () => {
    const _initialState = {
      devices: [deviceOne],
    };
    const currentDevice = {
      devices: [deviceOne],
    };
    const newState = device(_initialState, {
      type: deviceConstants.DEVICE_UPDATED,
      payload: deviceOne,
    });
    expect(newState).toEqual(currentDevice);
  });

  it('should push new device and return new state if DEVICE_UPDATED', () => {
    const _initialState = {
      devices: [deviceOne],
    };
    const currentDevice = {
      devices: [deviceTwo, deviceOne],
    };
    const newState = device(_initialState, {
      type: deviceConstants.DEVICE_UPDATED,
      payload: deviceTwo,
    });
    expect(newState).toEqual(currentDevice);
  });

  it('should push return new state if DEVICE_DELETED', () => {
    const _initialState = {
      devices: [deviceOne, deviceTwo],
    };
    const currentDevice = {
      devices: [deviceTwo],
    };
    const newState = device(_initialState, {
      type: deviceConstants.DEVICE_DELETED,
      payload: deviceOne,
    });
    expect(newState).toEqual(currentDevice);
  });

  it('should push return new state if DEVICE_CREATED', () => {
    const _initialState = {
      devices: [],
    };
    const currentDevice = {
      devices: [deviceOne],
    };
    const newState = device(_initialState, {
      type: deviceConstants.DEVICE_CREATED,
      payload: deviceOne,
    });
    expect(newState).toEqual(currentDevice);
  });
});
