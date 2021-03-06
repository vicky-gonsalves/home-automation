import { pick } from 'lodash';
import { subDeviceSettingConstants } from '../../_constants/subDeviceSetting.constants';
import { settingService } from '../../_services';
import { settingDialogActions } from '../setting-dialog/settingDialog.actions';

const pickFilteredParams = setting => pick(setting, ['type', 'idType', 'parent', 'bindedTo', 'paramName', 'paramValue']);

const setProgress = flag => {
  return {
    type: subDeviceSettingConstants.SET_PROGRESS,
    payload: flag,
  };
};

const setSubDeviceSettingError = error => {
  return {
    type: subDeviceSettingConstants.SET_SUB_DEVICE_SETTING_ERROR,
    payload: { error },
  };
};

const removeAllSettings = () => dispatch => {
  dispatch({
    type: subDeviceSettingConstants.SUB_DEVICE_SETTING_REMOVE_ALL,
  });
};

const saveSubDeviceSettings = _settings => async dispatch => {
  const settings = _settings.map(setting => pickFilteredParams(setting));
  try {
    dispatch(setProgress(true));
    await settingService.updateSettings(settings);
    dispatch(setProgress(false));
    dispatch(settingDialogActions.close());
  } catch (error) {
    dispatch(setProgress(false));
    dispatch(setSubDeviceSettingError(error));
  }
};

export const subDeviceSettingActions = {
  saveSubDeviceSettings,
  removeAllSettings,
  setSubDeviceSettingError,
};
