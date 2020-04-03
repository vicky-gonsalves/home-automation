import { pick } from 'lodash';
import { subDeviceSettingConstants } from '../_constants/subDeviceSetting.constants';
import { subDeviceSettingService } from '../_services';
import { settingDialogActions } from './settingDialog.actions';

const pickFilteredParams = setting => pick(setting, ['type', 'idType', 'parent', 'bindedTo', 'paramName', 'paramValue']);

const setProgress = flag => dispatch => {
  dispatch({
    type: subDeviceSettingConstants.SET_PROGRESS,
    payload: flag,
  });
};

const setSubDeviceSettingError = error => dispatch => {
  dispatch({
    type: subDeviceSettingConstants.SET_SUB_DEVICE_SETTING_ERROR,
    payload: { error },
  });
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
    await subDeviceSettingService.updateSubDeviceSettings(settings);
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
