import { subDeviceSettingConstants } from '../../_constants';
import { deviceTwo } from '../../_utils/fixtures/device.fixture';
import {
  subDeviceSettingFour,
  subDeviceSettingOne,
  subDeviceSettingThree,
  subDeviceSettingTwo,
} from '../../_utils/fixtures/subDeviceSetting.fixture';
import subDeviceSetting from './subDeviceSetting.reducer';

jest.mock('axios');

describe('Sub Device Setting Reducer', () => {
  beforeEach(() => {});

  it('should return default state', () => {
    const newState = subDeviceSetting({}, {});
    expect(newState).toEqual({});
  });

  it('should return new state if SUB_DEVICE_SETTING_STORE_ALL', () => {
    const currentSubDeviceSetting = {
      subDeviceSettings: [subDeviceSettingOne, subDeviceSettingTwo],
    };
    const newState = subDeviceSetting(
      {},
      {
        type: subDeviceSettingConstants.SUB_DEVICE_SETTING_STORE_ALL,
        payload: currentSubDeviceSetting.subDeviceSettings,
      }
    );
    expect(newState).toEqual(currentSubDeviceSetting);
  });

  it('should return new state if SUB_DEVICE_SETTING_REMOVE_ALL', () => {
    const currentSubDeviceSetting = {
      subDeviceSettings: [],
    };
    const newState = subDeviceSetting(
      {},
      {
        type: subDeviceSettingConstants.SUB_DEVICE_SETTING_REMOVE_ALL,
      }
    );
    expect(newState).toEqual(currentSubDeviceSetting);
  });

  it('should return new state if SUB_DEVICE_SETTING_UPDATED', () => {
    const _initialState = {
      subDeviceSettings: [subDeviceSettingOne],
    };
    const currentSubDeviceSetting = {
      subDeviceSettings: [subDeviceSettingOne],
    };
    const newState = subDeviceSetting(_initialState, {
      type: subDeviceSettingConstants.SUB_DEVICE_SETTING_UPDATED,
      payload: subDeviceSettingOne,
    });
    expect(newState).toEqual(currentSubDeviceSetting);
  });

  it('should push new sub device settings and return new state if SUB_DEVICE_SETTING_UPDATED', () => {
    const _initialState = {
      subDeviceSettings: [subDeviceSettingOne],
    };
    const currentSubDeviceSetting = {
      subDeviceSettings: [subDeviceSettingOne, subDeviceSettingTwo],
    };
    const newState = subDeviceSetting(_initialState, {
      type: subDeviceSettingConstants.SUB_DEVICE_SETTING_UPDATED,
      payload: subDeviceSettingTwo,
    });
    expect(newState).toEqual(currentSubDeviceSetting);
  });

  it('should return new state if SUB_DEVICE_SETTING_DELETED', () => {
    const _initialState = {
      subDeviceSettings: [subDeviceSettingOne, subDeviceSettingTwo],
    };
    const currentSubDeviceSetting = {
      subDeviceSettings: [subDeviceSettingTwo],
    };
    const newState = subDeviceSetting(_initialState, {
      type: subDeviceSettingConstants.SUB_DEVICE_SETTING_DELETED,
      payload: subDeviceSettingOne,
    });
    expect(newState).toEqual(currentSubDeviceSetting);
  });

  it('should return new state if SUB_DEVICE_SETTING_CREATED', () => {
    const _initialState = {
      subDeviceSettings: [],
    };
    const currentSubDeviceSetting = {
      subDeviceSettings: [subDeviceSettingOne],
    };
    const newState = subDeviceSetting(_initialState, {
      type: subDeviceSettingConstants.SUB_DEVICE_SETTING_CREATED,
      payload: subDeviceSettingOne,
    });
    expect(newState).toEqual(currentSubDeviceSetting);
  });

  it('should return new state if SUB_DEVICE_SETTING_UPDATE_STATUS', () => {
    const _initialState = {
      subDeviceSettings: [subDeviceSettingOne],
    };
    const currentSubDeviceSetting = {
      subDeviceSettings: [subDeviceSettingOne],
    };
    const newState = subDeviceSetting(_initialState, {
      type: subDeviceSettingConstants.SUB_DEVICE_SETTING_UPDATE_STATUS,
      payload: subDeviceSettingOne,
    });
    expect(newState).toEqual(currentSubDeviceSetting);
  });

  it('should push new device setting and return new state if SUB_DEVICE_SETTING_UPDATE_STATUS', () => {
    const _initialState = {
      subDeviceSettings: [subDeviceSettingOne],
    };
    const currentSubDeviceSetting = {
      subDeviceSettings: [subDeviceSettingOne, subDeviceSettingTwo],
    };
    const newState = subDeviceSetting(_initialState, {
      type: subDeviceSettingConstants.SUB_DEVICE_SETTING_UPDATE_STATUS,
      payload: subDeviceSettingTwo,
    });
    expect(newState).toEqual(currentSubDeviceSetting);
  });

  it('should return new state if SUB_DEVICE_MULTI_STATUS_UPDATED', () => {
    const _initialState = {
      subDeviceSettings: [subDeviceSettingOne, subDeviceSettingTwo],
    };
    const currentSubDeviceSetting = {
      subDeviceSettings: [subDeviceSettingOne, subDeviceSettingTwo],
    };
    const newState = subDeviceSetting(_initialState, {
      type: subDeviceSettingConstants.SUB_DEVICE_MULTI_STATUS_UPDATED,
      payload: [subDeviceSettingOne, subDeviceSettingTwo],
    });
    expect(newState).toEqual(currentSubDeviceSetting);
  });

  it('should push new sub device settings and return new state if SUB_DEVICE_MULTI_STATUS_UPDATED', () => {
    const _initialState = {
      subDeviceSettings: [subDeviceSettingOne, subDeviceSettingTwo],
    };
    const currentSubDeviceSetting = {
      subDeviceSettings: [subDeviceSettingOne, subDeviceSettingTwo, subDeviceSettingThree, subDeviceSettingFour],
    };
    const newState = subDeviceSetting(_initialState, {
      type: subDeviceSettingConstants.SUB_DEVICE_MULTI_STATUS_UPDATED,
      payload: [subDeviceSettingThree, subDeviceSettingFour],
    });
    expect(newState).toEqual(currentSubDeviceSetting);
  });

  it('should return new state if SUB_DEVICE_MULTI_SETTING_DELETED', () => {
    const _initialState = {
      subDeviceSettings: [subDeviceSettingOne, subDeviceSettingTwo, subDeviceSettingThree],
    };
    const currentSubDeviceSetting = {
      subDeviceSettings: [subDeviceSettingThree],
    };
    const newState = subDeviceSetting(_initialState, {
      type: subDeviceSettingConstants.SUB_DEVICE_MULTI_SETTING_DELETED,
      payload: [subDeviceSettingOne, subDeviceSettingTwo],
    });
    expect(newState).toEqual(currentSubDeviceSetting);
  });

  it('should return new state if SUB_DEVICE_MULTI_SETTING_UPDATED', () => {
    const _initialState = {
      subDeviceSettings: [subDeviceSettingOne, subDeviceSettingTwo],
    };
    const currentSubDeviceSetting = {
      subDeviceSettings: [subDeviceSettingOne, subDeviceSettingTwo],
    };
    const newState = subDeviceSetting(_initialState, {
      type: subDeviceSettingConstants.SUB_DEVICE_MULTI_SETTING_UPDATED,
      payload: [subDeviceSettingOne, subDeviceSettingTwo],
    });
    expect(newState).toEqual(currentSubDeviceSetting);
  });

  it('should push new sub device settings and return new state if SUB_DEVICE_MULTI_SETTING_UPDATED', () => {
    const _initialState = {
      subDeviceSettings: [subDeviceSettingOne, subDeviceSettingTwo],
    };
    const currentSubDeviceSetting = {
      subDeviceSettings: [subDeviceSettingOne, subDeviceSettingTwo, subDeviceSettingThree, subDeviceSettingFour],
    };
    const newState = subDeviceSetting(_initialState, {
      type: subDeviceSettingConstants.SUB_DEVICE_MULTI_SETTING_UPDATED,
      payload: [subDeviceSettingThree, subDeviceSettingFour],
    });
    expect(newState).toEqual(currentSubDeviceSetting);
  });

  it('should return new state if PARENT_DEVICE_DELETED_FOR_SUB_DEVICE_SETTING', () => {
    const _initialState = {
      subDeviceSettings: [subDeviceSettingOne, subDeviceSettingTwo, subDeviceSettingThree, subDeviceSettingFour],
    };
    const currentSubDevice = {
      subDeviceSettings: [subDeviceSettingThree, subDeviceSettingFour],
    };
    const newState = subDeviceSetting(_initialState, {
      type: subDeviceSettingConstants.PARENT_DEVICE_DELETED_FOR_SUB_DEVICE_SETTING,
      payload: deviceTwo,
    });
    expect(newState).toEqual(currentSubDevice);
  });

  it('should return new state if SET_PROGRESS', () => {
    const currentSubDevice = {
      isFetching: true,
    };
    const newState = subDeviceSetting(
      {},
      {
        type: subDeviceSettingConstants.SET_PROGRESS,
        payload: currentSubDevice.isFetching,
      }
    );
    expect(newState).toEqual(currentSubDevice);
  });

  it('should return new state if SET_SUB_DEVICE_SETTING_ERROR', () => {
    const currentSubDevice = {
      subDeviceSettingError: 'some error',
    };
    const newState = subDeviceSetting(
      {},
      {
        type: subDeviceSettingConstants.SET_SUB_DEVICE_SETTING_ERROR,
        payload: { error: currentSubDevice.subDeviceSettingError },
      }
    );
    expect(newState).toEqual(currentSubDevice);
  });
});
