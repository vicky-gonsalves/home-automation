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
      let _activeDeviceSettings = _updateDeviceSettings.filter(deviceSetting => !deviceSetting.isDisabled);
      if (!action.payload.isDisabled && !find(_activeDeviceSettings, { id: action.payload.id })) {
        _activeDeviceSettings.push(action.payload);
        _activeDeviceSettings = [...orderBy(_activeDeviceSettings, ['createdAt', 'name'], ['asc', 'asc'])];
      }
      return {
        ...state,
        deviceSettings: _activeDeviceSettings,
      };

    case deviceSettingConstants.DEVICE_MULTI_SETTING_DELETED:
      const _params = [];
      state.deviceSettings.forEach(deviceSetting => {
        action.payload.forEach(payload => {
          if (deviceSetting.id !== payload.id) {
            _params.push(deviceSetting);
          }
        });
      });

      return {
        ...state,
        deviceSettings: _params,
      };

    case deviceSettingConstants.DEVICE_MULTI_SETTING_UPDATED:
      const _updateDeviceSettings2 = state.deviceSettings.map(deviceSetting => {
        action.payload.forEach(payload => {
          if (payload.id === deviceSetting.id) {
            deviceSetting = payload;
          }
        });
        return deviceSetting;
      });

      let _activeDeviceSettings2 = _updateDeviceSettings2.filter(deviceSetting => !deviceSetting.isDisabled);
      if (!action.payload.isDisabled && !find(_activeDeviceSettings2, { id: action.payload.id })) {
        _activeDeviceSettings2.push(action.payload);
        _activeDeviceSettings2 = [...orderBy(_activeDeviceSettings2, ['createdAt', 'name'], ['asc', 'asc'])];
      }

      return {
        ...state,
        deviceSettings: _activeDeviceSettings2,
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
