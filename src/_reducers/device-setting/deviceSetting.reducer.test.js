import { deviceSettingConstants } from '../../_constants';
import { deviceOne } from '../../_utils/fixtures/device.fixture';
import {
  deviceSettingFive,
  deviceSettingFour,
  deviceSettingOne,
  deviceSettingSix,
  deviceSettingThree,
  deviceSettingTwo,
} from '../../_utils/fixtures/deviceSetting.fixture';
import deviceSetting from './deviceSetting.reducer';

describe('Device Setting Reducer', () => {
  beforeEach(() => {});

  it('should return default state', () => {
    const newState = deviceSetting({}, {});
    expect(newState).toEqual({});
  });

  it('should return new state if DEVICE_SETTING_STORE_ALL', () => {
    const currentDeviceSetting = {
      deviceSettings: [deviceSettingOne, deviceSettingTwo],
    };
    const newState = deviceSetting(
      {},
      {
        type: deviceSettingConstants.DEVICE_SETTING_STORE_ALL,
        payload: currentDeviceSetting.deviceSettings,
      }
    );
    expect(newState).toEqual(currentDeviceSetting);
  });

  it('should return new state if DEVICE_SETTING_REMOVE_ALL', () => {
    const currentDeviceSetting = {
      deviceSettings: [],
    };
    const newState = deviceSetting(
      {},
      {
        type: deviceSettingConstants.DEVICE_SETTING_REMOVE_ALL,
      }
    );
    expect(newState).toEqual(currentDeviceSetting);
  });

  it('should return new state if DEVICE_SETTING_UPDATED', () => {
    const _initialState = {
      deviceSettings: [deviceSettingOne],
    };
    const currentDeviceSetting = {
      deviceSettings: [deviceSettingOne],
    };
    const newState = deviceSetting(_initialState, {
      type: deviceSettingConstants.DEVICE_SETTING_UPDATED,
      payload: deviceSettingOne,
    });
    expect(newState).toEqual(currentDeviceSetting);
  });

  it('should push new device settings and return new state if DEVICE_SETTING_UPDATED', () => {
    const _initialState = {
      deviceSettings: [deviceSettingOne],
    };
    const currentDeviceSetting = {
      deviceSettings: [deviceSettingOne, deviceSettingTwo],
    };
    const newState = deviceSetting(_initialState, {
      type: deviceSettingConstants.DEVICE_SETTING_UPDATED,
      payload: deviceSettingTwo,
    });
    expect(newState).toEqual(currentDeviceSetting);
  });

  it('should return new state if DEVICE_SETTING_DELETED', () => {
    const _initialState = {
      deviceSettings: [deviceSettingOne, deviceSettingTwo],
    };
    const currentDeviceSetting = {
      deviceSettings: [deviceSettingTwo],
    };
    const newState = deviceSetting(_initialState, {
      type: deviceSettingConstants.DEVICE_SETTING_DELETED,
      payload: deviceSettingOne,
    });
    expect(newState).toEqual(currentDeviceSetting);
  });

  it('should return new state if DEVICE_SETTING_CREATED', () => {
    const _initialState = {
      deviceSettings: [],
    };
    const currentDeviceSetting = {
      deviceSettings: [deviceSettingOne],
    };
    const newState = deviceSetting(_initialState, {
      type: deviceSettingConstants.DEVICE_SETTING_CREATED,
      payload: deviceSettingOne,
    });
    expect(newState).toEqual(currentDeviceSetting);
  });

  it('should return new state if DEVICE_SETTING_UPDATE_STATUS', () => {
    const _initialState = {
      deviceSettings: [deviceSettingOne],
    };
    const currentDeviceSetting = {
      deviceSettings: [deviceSettingOne],
    };
    const newState = deviceSetting(_initialState, {
      type: deviceSettingConstants.DEVICE_SETTING_UPDATE_STATUS,
      payload: deviceSettingOne,
    });
    expect(newState).toEqual(currentDeviceSetting);
  });

  it('should push new device setting and return new state if DEVICE_SETTING_UPDATE_STATUS', () => {
    const _initialState = {
      deviceSettings: [deviceSettingOne],
    };
    const currentDeviceSetting = {
      deviceSettings: [deviceSettingOne, deviceSettingTwo],
    };
    const newState = deviceSetting(_initialState, {
      type: deviceSettingConstants.DEVICE_SETTING_UPDATE_STATUS,
      payload: deviceSettingTwo,
    });
    expect(newState).toEqual(currentDeviceSetting);
  });

  it('should return new state if DEVICE_MULTI_STATUS_UPDATED', () => {
    const _initialState = {
      deviceSettings: [deviceSettingOne, deviceSettingTwo],
    };
    const currentDeviceSetting = {
      deviceSettings: [deviceSettingTwo, deviceSettingOne],
    };
    const newState = deviceSetting(_initialState, {
      type: deviceSettingConstants.DEVICE_MULTI_STATUS_UPDATED,
      payload: [deviceSettingOne, deviceSettingTwo],
    });
    expect(newState).toEqual(currentDeviceSetting);
  });

  it('should push new device settings and return new state if DEVICE_MULTI_STATUS_UPDATED', () => {
    const _initialState = {
      deviceSettings: [deviceSettingOne, deviceSettingTwo],
    };
    const currentDeviceSetting = {
      deviceSettings: [deviceSettingTwo, deviceSettingFour, deviceSettingOne, deviceSettingThree],
    };
    const newState = deviceSetting(_initialState, {
      type: deviceSettingConstants.DEVICE_MULTI_STATUS_UPDATED,
      payload: [deviceSettingThree, deviceSettingFour],
    });
    expect(newState).toEqual(currentDeviceSetting);
  });

  it('should return new state if DEVICE_MULTI_SETTING_DELETED', () => {
    const _initialState = {
      deviceSettings: [deviceSettingOne, deviceSettingTwo, deviceSettingThree],
    };
    const currentDeviceSetting = {
      deviceSettings: [deviceSettingThree],
    };
    const newState = deviceSetting(_initialState, {
      type: deviceSettingConstants.DEVICE_MULTI_SETTING_DELETED,
      payload: [deviceSettingOne, deviceSettingTwo],
    });
    expect(newState).toEqual(currentDeviceSetting);
  });

  it('should return new state if DEVICE_MULTI_SETTING_UPDATED', () => {
    const _initialState = {
      deviceSettings: [deviceSettingOne, deviceSettingTwo],
    };
    const currentDeviceSetting = {
      deviceSettings: [deviceSettingTwo, deviceSettingOne],
    };
    const newState = deviceSetting(_initialState, {
      type: deviceSettingConstants.DEVICE_MULTI_SETTING_UPDATED,
      payload: [deviceSettingOne, deviceSettingTwo],
    });
    expect(newState).toEqual(currentDeviceSetting);
  });

  it('should push new device settings and return new state if DEVICE_MULTI_SETTING_UPDATED', () => {
    const _initialState = {
      deviceSettings: [deviceSettingOne, deviceSettingTwo],
    };
    const currentDeviceSetting = {
      deviceSettings: [deviceSettingTwo, deviceSettingFour, deviceSettingOne, deviceSettingThree],
    };
    const newState = deviceSetting(_initialState, {
      type: deviceSettingConstants.DEVICE_MULTI_SETTING_UPDATED,
      payload: [deviceSettingThree, deviceSettingFour],
    });
    expect(newState).toEqual(currentDeviceSetting);
  });

  it('should return new state if PARENT_DEVICE_DELETED_FOR_DEVICE_SETTING', () => {
    const _initialState = {
      deviceSettings: [
        deviceSettingOne,
        deviceSettingTwo,
        deviceSettingThree,
        deviceSettingFour,
        deviceSettingFive,
        deviceSettingSix,
      ],
    };
    const currentSubDevice = {
      deviceSettings: [deviceSettingFour, deviceSettingFive, deviceSettingSix],
    };
    const newState = deviceSetting(_initialState, {
      type: deviceSettingConstants.PARENT_DEVICE_DELETED_FOR_DEVICE_SETTING,
      payload: deviceOne,
    });
    expect(newState).toEqual(currentSubDevice);
  });

  it('should return new state if SET_PROGRESS', () => {
    const currentSubDevice = {
      isFetching: true,
    };
    const newState = deviceSetting(
      {},
      {
        type: deviceSettingConstants.SET_PROGRESS,
        payload: currentSubDevice.isFetching,
      }
    );
    expect(newState).toEqual(currentSubDevice);
  });

  it('should return new state if SET_DEVICE_SETTING_ERROR', () => {
    const currentSubDevice = {
      settingError: 'some error',
    };
    const newState = deviceSetting(
      {},
      {
        type: deviceSettingConstants.SET_DEVICE_SETTING_ERROR,
        payload: { error: currentSubDevice.settingError },
      }
    );
    expect(newState).toEqual(currentSubDevice);
  });
});
