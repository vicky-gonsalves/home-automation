import { deviceSettingConstants } from '../../_constants';

const initialState = {
  isFetching: false,
  settingError: null,
  deviceSettings: [],
};

const deviceSetting = (state = initialState, action) => {
  switch (action.type) {
    case deviceSettingConstants.DEVICE_SETTING_STORE_ALL:
      return {
        ...state,
        deviceSettings: action.payload,
      };

    case deviceSettingConstants.DEVICE_SETTING_REMOVE_ALL:
      return {
        ...state,
        deviceSettings: [],
      };

    case deviceSettingConstants.DEVICE_SETTING_UPDATED:
      return {
        ...state,
        deviceSettings: state.deviceSettings.map(deviceSetting =>
          deviceSetting.id === action.payload.id ? { ...action.payload } : deviceSetting
        ),
      };

    case deviceSettingConstants.DEVICE_SETTING_CREATED:
      return {
        ...state,
        deviceSettings: [...state.deviceSettings, action.payload],
      };

    case deviceSettingConstants.DEVICE_SETTING_UPDATE_STATUS:
      return {
        ...state,
        deviceSettings: state.deviceSettings.map(deviceSetting =>
          deviceSetting.id === action.payload.id ? { ...action.payload } : deviceSetting
        ),
      };

    case deviceSettingConstants.DEVICE_MULTI_STATUS_UPDATED:
      const params = state.deviceSettings.map(deviceSetting => {
        action.payload.forEach(payload => {
          if (payload.id === deviceSetting.id) {
            deviceSetting = payload;
          }
        });
        return deviceSetting;
      });

      return {
        ...state,
        deviceSettings: params,
      };

    case deviceSettingConstants.PARENT_DEVICE_DELETED_FOR_DEVICE_SETTING:
      return {
        ...state,
        deviceSettings: state.deviceSettings.filter(deviceSetting => deviceSetting.bindedTo !== action.payload.deviceId),
      };

    case deviceSettingConstants.SET_PROGRESS:
      return {
        ...state,
        isFetching: action.payload,
      };

    case deviceSettingConstants.SET_DEVICE_SETTING_ERROR:
      return {
        ...state,
        settingError: action.payload.error,
      };

    default:
      return state;
  }
};

export default deviceSetting;
