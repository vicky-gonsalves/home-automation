import { deviceParamConstants } from '../../_constants';
import { deviceOne } from '../../_utils/fixtures/device.fixture';
import {
  deviceParamFive,
  deviceParamFour,
  deviceParamOne,
  deviceParamSix,
  deviceParamThree,
  deviceParamTwo,
} from '../../_utils/fixtures/deviceParam.fixture';
import deviceParam from './deviceParam.reducer';

jest.mock('axios');

describe('Device Param Reducer', () => {
  beforeEach(() => {});

  it('should return default state', () => {
    const newState = deviceParam({}, {});
    expect(newState).toEqual({});
  });

  it('should return new state if DEVICE_PARAM_STORE_ALL', () => {
    const currentDeviceParam = {
      deviceParams: [deviceParamOne, deviceParamTwo],
    };
    const newState = deviceParam(
      {},
      {
        type: deviceParamConstants.DEVICE_PARAM_STORE_ALL,
        payload: currentDeviceParam.deviceParams,
      }
    );
    expect(newState).toEqual(currentDeviceParam);
  });

  it('should return new state if DEVICE_PARAM_REMOVE_ALL', () => {
    const currentDeviceParam = {
      deviceParams: [],
    };
    const newState = deviceParam(
      {},
      {
        type: deviceParamConstants.DEVICE_PARAM_REMOVE_ALL,
      }
    );
    expect(newState).toEqual(currentDeviceParam);
  });

  it('should return new state if DEVICE_PARAM_UPDATED', () => {
    const _initialState = {
      deviceParams: [deviceParamOne],
    };
    const currentDeviceParam = {
      deviceParams: [deviceParamOne],
    };
    const newState = deviceParam(_initialState, {
      type: deviceParamConstants.DEVICE_PARAM_UPDATED,
      payload: deviceParamOne,
    });
    expect(newState).toEqual(currentDeviceParam);
  });

  it('should push new sub device and return new state if DEVICE_PARAM_UPDATED', () => {
    const _initialState = {
      deviceParams: [deviceParamOne],
    };
    const currentDeviceParam = {
      deviceParams: [deviceParamOne, deviceParamTwo],
    };
    const newState = deviceParam(_initialState, {
      type: deviceParamConstants.DEVICE_PARAM_UPDATED,
      payload: deviceParamTwo,
    });
    expect(newState).toEqual(currentDeviceParam);
  });

  it('should return new state if DEVICE_PARAM_DELETED', () => {
    const _initialState = {
      deviceParams: [deviceParamOne, deviceParamTwo],
    };
    const currentDeviceParam = {
      deviceParams: [deviceParamTwo],
    };
    const newState = deviceParam(_initialState, {
      type: deviceParamConstants.DEVICE_PARAM_DELETED,
      payload: deviceParamOne,
    });
    expect(newState).toEqual(currentDeviceParam);
  });

  it('should return new state if DEVICE_PARAM_CREATED', () => {
    const _initialState = {
      deviceParams: [],
    };
    const currentDeviceParam = {
      deviceParams: [deviceParamOne],
    };
    const newState = deviceParam(_initialState, {
      type: deviceParamConstants.DEVICE_PARAM_CREATED,
      payload: deviceParamOne,
    });
    expect(newState).toEqual(currentDeviceParam);
  });

  it('should return new state if PARENT_DEVICE_DELETED_FOR_DEVICE_PARAM', () => {
    const _initialState = {
      deviceParams: [deviceParamOne, deviceParamTwo, deviceParamThree, deviceParamFour, deviceParamFive, deviceParamSix],
    };
    const currentDeviceParam = {
      deviceParams: [deviceParamThree, deviceParamFour],
    };
    const newState = deviceParam(_initialState, {
      type: deviceParamConstants.PARENT_DEVICE_DELETED_FOR_DEVICE_PARAM,
      payload: deviceOne,
    });
    expect(newState).toEqual(currentDeviceParam);
  });
});
