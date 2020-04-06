import { find, orderBy } from 'lodash';
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
      const updateSubDeviceSettings = state.subDeviceSettings.map(subDeviceSetting =>
        subDeviceSetting.id === action.payload.id ? { ...action.payload } : subDeviceSetting
      );
      let activeSubDeviceSettings = updateSubDeviceSettings.filter(subDeviceSetting => !subDeviceSetting.isDisabled);
      if (!action.payload.isDisabled && !find(activeSubDeviceSettings, { id: action.payload.id })) {
        activeSubDeviceSettings.push(action.payload);
        activeSubDeviceSettings = [...orderBy(activeSubDeviceSettings, ['createdAt', 'name'], ['asc', 'asc'])];
      }
      return {
        ...state,
        subDeviceSettings: activeSubDeviceSettings,
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
      const updateSubDeviceSettings2 = state.subDeviceSettings.map(subDeviceSetting =>
        subDeviceSetting.id === action.payload.id ? { ...action.payload } : subDeviceSetting
      );
      let activeSubDeviceSettings2 = updateSubDeviceSettings2.filter(subDeviceSetting => !subDeviceSetting.isDisabled);
      if (!action.payload.isDisabled && !find(activeSubDeviceSettings2, { id: action.payload.id })) {
        activeSubDeviceSettings2.push(action.payload);
        activeSubDeviceSettings2 = [...orderBy(activeSubDeviceSettings2, ['createdAt', 'name'], ['asc', 'asc'])];
      }
      return {
        ...state,
        subDeviceSettings: activeSubDeviceSettings2,
      };

    case subDeviceSettingConstants.SUB_DEVICE_MULTI_STATUS_UPDATED:
      const _updateSubDeviceSettings = state.subDeviceSettings.map(subDeviceSetting => {
        action.payload.forEach(payload => {
          if (payload.id === subDeviceSetting.id) {
            subDeviceSetting = payload;
          }
        });
        return subDeviceSetting;
      });
      let _activeSubDeviceSettings = _updateSubDeviceSettings.filter(subDeviceSetting => !subDeviceSetting.isDisabled);
      if (!action.payload.isDisabled && !find(_activeSubDeviceSettings, { id: action.payload.id })) {
        _activeSubDeviceSettings.push(action.payload);
        _activeSubDeviceSettings = [...orderBy(_activeSubDeviceSettings, ['createdAt', 'name'], ['asc', 'asc'])];
      }

      return {
        ...state,
        subDeviceSettings: _activeSubDeviceSettings,
      };

    case subDeviceSettingConstants.PARENT_DEVICE_DELETED_FOR_SUB_DEVICE_SETTING:
      return {
        ...state,
        subDeviceSettings: state.subDeviceSettings.filter(
          subDeviceSetting => subDeviceSetting.parent !== action.payload.deviceId
        ),
      };

    case subDeviceSettingConstants.SUB_DEVICE_MULTI_SETTING_DELETED:
      const _params = [];
      state.subDeviceSettings.forEach(subDeviceSetting => {
        action.payload.forEach(payload => {
          if (subDeviceSetting.id !== payload.id) {
            _params.push(subDeviceSetting);
          }
        });
      });

      return {
        ...state,
        subDeviceSettings: _params,
      };

    case subDeviceSettingConstants.SUB_DEVICE_MULTI_SETTING_UPDATED:
      const _updateSubDeviceSettings2 = state.subDeviceSettings.map(subDeviceSetting => {
        action.payload.forEach(payload => {
          if (payload.id === subDeviceSetting.id) {
            subDeviceSetting = payload;
          }
        });
        return subDeviceSetting;
      });
      let _activeSubDeviceSettings2 = _updateSubDeviceSettings2.filter(subDeviceSetting => !subDeviceSetting.isDisabled);
      if (!action.payload.isDisabled && !find(_activeSubDeviceSettings2, { id: action.payload.id })) {
        _activeSubDeviceSettings2.push(action.payload);
        _activeSubDeviceSettings2 = [...orderBy(_activeSubDeviceSettings2, ['createdAt', 'name'], ['asc', 'asc'])];
      }

      return {
        ...state,
        subDeviceSettings: _activeSubDeviceSettings2,
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
