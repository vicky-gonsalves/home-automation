import { pick } from 'lodash';
import { deviceSettingConstants } from '../_constants';
import { subDeviceSettingService } from '../_services';
import { settingDialogActions } from './settingDialog.actions';

const pickFilteredParams = setting => pick(setting, ['type', 'idType', 'parent', 'bindedTo', 'paramName', 'paramValue']);

const setProgress = flag => dispatch => {
  dispatch({
    type: deviceSettingConstants.SET_PROGRESS,
    payload: flag,
  });
};

const setDeviceSettingError = error => dispatch => {
  dispatch({
    type: deviceSettingConstants.SET_DEVICE_SETTING_ERROR,
    payload: { error },
  });
};

const removeAllSettings = () => dispatch => {
  dispatch({
    type: deviceSettingConstants.DEVICE_SETTING_REMOVE_ALL,
  });
};

const saveDeviceSettings = settings => async dispatch => {
  const preferredSubDevice = pickFilteredParams(settings.preferredSubDevice);
  const autoShutDownTime = pickFilteredParams(settings.autoShutDownTime);
  const waterLevelToStart = pickFilteredParams(settings.waterLevelToStart);
  try {
    dispatch(setProgress(true));
    await subDeviceSettingService.updateSubDeviceSettings([preferredSubDevice, autoShutDownTime, waterLevelToStart]);
    dispatch(setProgress(false));
    dispatch(settingDialogActions.close());
  } catch (error) {
    dispatch(setProgress(false));
    dispatch(setDeviceSettingError(error));
  }
};

export const deviceSettingActions = {
  saveDeviceSettings,
  removeAllSettings,
};
