import { subDeviceSettingConstants } from '../../_constants';

const initialState = {
  isFetching: false,
  subDeviceSettingError: null,
  subDeviceSettings: [],
};

const subDeviceSetting = (state = initialState, action) => {
  switch (action.type) {
    case subDeviceSettingConstants.SUB_DEVICE_SETTING_STORE_ALL:
      return {
        ...state,
        subDeviceSettings: action.payload,
      };

    case subDeviceSettingConstants.SUB_DEVICE_SETTING_REMOVE_ALL:
      return {
        ...state,
        subDeviceSettings: [],
      };

    case subDeviceSettingConstants.SUB_DEVICE_SETTING_UPDATED:
      return {
        ...state,
        subDeviceSettings: state.subDeviceSettings.map(subDeviceSetting =>
          subDeviceSetting.id === action.payload.id ? { ...action.payload } : subDeviceSetting
        ),
      };

    case subDeviceSettingConstants.SUB_DEVICE_SETTING_DELETED:
      return {
        ...state,
        subDeviceSettings: state.subDeviceSettings.filter(subDeviceSetting => subDeviceSetting.id !== action.payload.id),
      };

    case subDeviceSettingConstants.SUB_DEVICE_SETTING_CREATED:
      return {
        ...state,
        subDeviceSettings: [...state.subDeviceSettings, action.payload],
      };

    case subDeviceSettingConstants.SUB_DEVICE_SETTING_UPDATE_STATUS:
      return {
        ...state,
        subDeviceSettings: state.subDeviceSettings.map(subDeviceSetting =>
          subDeviceSetting.id === action.payload.id ? { ...action.payload } : subDeviceSetting
        ),
      };

    case subDeviceSettingConstants.SUB_DEVICE_MULTI_STATUS_UPDATED:
      const params = state.subDeviceSettings.map(subDeviceSetting => {
        action.payload.forEach(payload => {
          if (payload.id === subDeviceSetting.id) {
            subDeviceSetting = payload;
          }
        });
        return subDeviceSetting;
      });

      return {
        ...state,
        subDeviceSettings: params,
      };

    case subDeviceSettingConstants.PARENT_DEVICE_DELETED_FOR_SUB_DEVICE_SETTING:
      return {
        ...state,
        subDeviceSettings: state.subDeviceSettings.filter(
          subDeviceSetting => subDeviceSetting.parent !== action.payload.deviceId
        ),
      };

    case subDeviceSettingConstants.PARENT_SUB_DEVICE_DELETED_FOR_SUB_DEVICE_SETTING:
      const subDeviceSettings = state.subDeviceSettings.filter(
        subDeviceSetting => subDeviceSetting.bindedTo !== action.payload.subDeviceId
      );
      return {
        ...state,
        subDeviceSettings,
      };

    case subDeviceSettingConstants.SET_PROGRESS:
      return {
        ...state,
        isFetching: action.payload,
      };

    case subDeviceSettingConstants.SET_SUB_DEVICE_SETTING_ERROR:
      return {
        ...state,
        subDeviceSettingError: action.payload.error,
      };

    default:
      return state;
  }
};

export default subDeviceSetting;
