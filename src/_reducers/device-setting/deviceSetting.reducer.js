import { find, orderBy } from 'lodash';
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
      const updateDeviceSettings = state.deviceSettings.map(deviceSetting =>
        deviceSetting.id === action.payload.id ? { ...action.payload } : deviceSetting
      );
      let activeDeviceSettings = updateDeviceSettings.filter(deviceSetting => !deviceSetting.isDisabled);
      if (!action.payload.isDisabled && !find(activeDeviceSettings, { id: action.payload.id })) {
        activeDeviceSettings.push(action.payload);
        activeDeviceSettings = [...orderBy(activeDeviceSettings, ['createdAt', 'name'], ['asc', 'asc'])];
      }
      return {
        ...state,
        deviceSettings: activeDeviceSettings,
      };

    case deviceSettingConstants.DEVICE_SETTING_DELETED:
      return {
        ...state,
        deviceSettings: state.deviceSettings.filter(deviceSetting => deviceSetting.id !== action.payload.id),
      };

    case deviceSettingConstants.DEVICE_SETTING_CREATED:
      return {
        ...state,
        deviceSettings: [...state.deviceSettings, action.payload],
      };

    case deviceSettingConstants.DEVICE_SETTING_UPDATE_STATUS:
      const updateStatus = state.deviceSettings.map(deviceSetting =>
        deviceSetting.id === action.payload.id ? { ...action.payload } : deviceSetting
      );
      let _activeStatus = updateStatus.filter(deviceSetting => !deviceSetting.isDisabled);
      if (!action.payload.isDisabled && !find(_activeStatus, { id: action.payload.id })) {
        _activeStatus.push(action.payload);
        _activeStatus = [...orderBy(_activeStatus, ['createdAt', 'name'], ['asc', 'asc'])];
      }
      return {
        ...state,
        deviceSettings: _activeStatus,
      };

    case deviceSettingConstants.DEVICE_MULTI_STATUS_UPDATED:
      const _updateDeviceSettings = state.deviceSettings.map(deviceSetting => {
        action.payload.forEach(payload => {
          if (payload.id === deviceSetting.id) {
            deviceSetting = payload;
          }
        });
        return deviceSetting;
      });
      let _activeDeviceSettings = _updateDeviceSettings.filter(deviceSetting => deviceSetting && !deviceSetting.isDisabled);
      action.payload.forEach(payload => {
        if (!payload.isDisabled && !find(_activeDeviceSettings, { id: payload.id })) {
          _activeDeviceSettings.push(payload);
        }
      });
      _activeDeviceSettings = [...orderBy(_activeDeviceSettings, ['createdAt', 'paramName'], ['asc', 'asc'])];
      return {
        ...state,
        deviceSettings: _activeDeviceSettings,
      };

    case deviceSettingConstants.DEVICE_MULTI_SETTING_DELETED:
      const _params = action.payload.reduce((acc, b) => {
        return acc.filter(({ id }) => id !== b.id);
      }, state.deviceSettings);

      return {
        ...state,
        deviceSettings: _params,
      };

    case deviceSettingConstants.DEVICE_MULTI_SETTING_UPDATED:
      const allUpdateDeviceSettings = state.deviceSettings.map(deviceSetting => {
        action.payload.forEach(payload => {
          if (payload.id === deviceSetting.id) {
            deviceSetting = payload;
          }
        });
        return deviceSetting;
      });

      let activeUpdatedDeviceSettings = allUpdateDeviceSettings.filter(
        deviceSetting => deviceSetting && !deviceSetting.isDisabled
      );
      action.payload.forEach(payload => {
        if (!payload.isDisabled && !find(activeUpdatedDeviceSettings, { id: payload.id })) {
          activeUpdatedDeviceSettings.push(payload);
        }
      });
      activeUpdatedDeviceSettings = [...orderBy(activeUpdatedDeviceSettings, ['createdAt', 'paramName'], ['asc', 'asc'])];

      return {
        ...state,
        deviceSettings: activeUpdatedDeviceSettings,
      };

    case deviceSettingConstants.PARENT_DEVICE_DELETED_FOR_DEVICE_SETTING:
      return {
        ...state,
        deviceSettings: state.deviceSettings.filter(deviceSetting => {
          return (
            deviceSetting.type === 'device' &&
            deviceSetting.idType === 'deviceId' &&
            deviceSetting.bindedTo !== action.payload.deviceId
          );
        }),
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
