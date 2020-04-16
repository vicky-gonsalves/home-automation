import { subDeviceConstants } from '../../_constants';
import { deviceOne } from '../../_utils/fixtures/device.fixture';
import {
  subDeviceFive,
  subDeviceFour,
  subDeviceOne,
  subDeviceSix,
  subDeviceThree,
  subDeviceTwo,
} from '../../_utils/fixtures/subDevice.fixture';
import subDevice from './subDevice.reducer';

jest.mock('axios');

describe('Sub Device Reducer', () => {
  beforeEach(() => {});

  it('should return default state', () => {
    const newState = subDevice({}, {});
    expect(newState).toEqual({});
  });

  it('should return new state if SUB_DEVICE_STORE_ALL', () => {
    const currentSubDevice = {
      subDevices: [subDeviceOne, subDeviceTwo],
    };
    const newState = subDevice(
      {},
      {
        type: subDeviceConstants.SUB_DEVICE_STORE_ALL,
        payload: currentSubDevice.subDevices,
      }
    );
    expect(newState).toEqual(currentSubDevice);
  });

  it('should return new state if SUB_DEVICE_REMOVE_ALL', () => {
    const currentSubDevice = {
      subDevices: [],
    };
    const newState = subDevice(
      {},
      {
        type: subDeviceConstants.SUB_DEVICE_REMOVE_ALL,
      }
    );
    expect(newState).toEqual(currentSubDevice);
  });

  it('should return new state if SUB_DEVICE_UPDATED', () => {
    const _initialState = {
      subDevices: [subDeviceOne],
    };
    const currentSubDevice = {
      subDevices: [subDeviceOne],
    };
    const newState = subDevice(_initialState, {
      type: subDeviceConstants.SUB_DEVICE_UPDATED,
      payload: subDeviceOne,
    });
    expect(newState).toEqual(currentSubDevice);
  });

  it('should push new sub device and return new state if SUB_DEVICE_UPDATED', () => {
    const _initialState = {
      subDevices: [subDeviceOne],
    };
    const currentSubDevice = {
      subDevices: [subDeviceOne, subDeviceTwo],
    };
    const newState = subDevice(_initialState, {
      type: subDeviceConstants.SUB_DEVICE_UPDATED,
      payload: subDeviceTwo,
    });
    expect(newState).toEqual(currentSubDevice);
  });

  it('should return new state if SUB_DEVICE_DELETED', () => {
    const _initialState = {
      subDevices: [subDeviceOne, subDeviceTwo],
    };
    const currentSubDevice = {
      subDevices: [subDeviceTwo],
    };
    const newState = subDevice(_initialState, {
      type: subDeviceConstants.SUB_DEVICE_DELETED,
      payload: subDeviceOne,
    });
    expect(newState).toEqual(currentSubDevice);
  });

  it('should return new state if SUB_DEVICE_CREATED', () => {
    const _initialState = {
      subDevices: [],
    };
    const currentSubDevice = {
      subDevices: [subDeviceOne],
    };
    const newState = subDevice(_initialState, {
      type: subDeviceConstants.SUB_DEVICE_CREATED,
      payload: subDeviceOne,
    });
    expect(newState).toEqual(currentSubDevice);
  });

  it('should return new state if PARENT_DEVICE_DELETED_FOR_SUB_DEVICE', () => {
    const _initialState = {
      subDevices: [subDeviceOne, subDeviceTwo, subDeviceThree, subDeviceFour, subDeviceFive, subDeviceSix],
    };
    const currentSubDevice = {
      subDevices: [subDeviceThree, subDeviceFour, subDeviceFive, subDeviceSix],
    };
    const newState = subDevice(_initialState, {
      type: subDeviceConstants.PARENT_DEVICE_DELETED_FOR_SUB_DEVICE,
      payload: deviceOne,
    });
    expect(newState).toEqual(currentSubDevice);
  });
});
