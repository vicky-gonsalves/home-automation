import { sharedDeviceConstants } from '../../_constants';
import { deviceOne, deviceTwo } from '../../_utils/fixtures/device.fixture';
import sharedDevice from './sharedDevice.reducer';

describe('Shared SharedDevice Reducer', () => {
  beforeEach(() => {});

  it('should return default state', () => {
    const newState = sharedDevice({}, {});
    expect(newState).toEqual({});
  });

  it('should return new state if SHARED_DEVICE_STORE_ALL', () => {
    const currentSharedDevice = {
      sharedDevices: [deviceOne, deviceTwo],
    };
    const newState = sharedDevice(
      {},
      {
        type: sharedDeviceConstants.SHARED_DEVICE_STORE_ALL,
        payload: currentSharedDevice.sharedDevices,
      }
    );
    expect(newState).toEqual(currentSharedDevice);
  });

  it('should return new state if SHARED_DEVICE_REMOVE_ALL', () => {
    const _initialState = {
      sharedDevices: [deviceOne, deviceTwo],
    };
    const currentSharedDevice = {
      sharedDevices: [],
    };
    const newState = sharedDevice(_initialState, {
      type: sharedDeviceConstants.SHARED_DEVICE_REMOVE_ALL,
    });
    expect(newState).toEqual(currentSharedDevice);
  });

  it('should push return new state if SHARED_DEVICE_DELETED', () => {
    const _initialState = {
      sharedDevices: [deviceOne, deviceTwo],
    };
    const currentSharedDevice = {
      sharedDevices: [deviceTwo],
    };
    const newState = sharedDevice(_initialState, {
      type: sharedDeviceConstants.SHARED_DEVICE_DELETED,
      payload: deviceOne,
    });
    expect(newState).toEqual(currentSharedDevice);
  });

  it('should push return new state if SHARED_DEVICE_CREATED', () => {
    const _initialState = {
      sharedDevices: [],
    };
    const currentSharedDevice = {
      sharedDevices: [deviceOne],
    };
    const newState = sharedDevice(_initialState, {
      type: sharedDeviceConstants.SHARED_DEVICE_CREATED,
      payload: deviceOne,
    });
    expect(newState).toEqual(currentSharedDevice);
  });
});
