import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { settingService } from '../../_services';
import { initialState } from '../../_utils';
import { meData } from '../../_utils/mock/me/me.data';
import { deviceSettingActions } from './deviceSetting.actions';

jest.mock('axios');

let store;
const mockStore = configureStore([thunk]);
store = mockStore(initialState);

describe('deviceSettingActions', () => {
  afterEach(() => {
    store.clearActions();
  });

  it('should call saveDeviceSettings and update store', () => {
    settingService.updateSettings = jest.fn().mockResolvedValueOnce(meData.settings.deviceSettings);
    store.dispatch(deviceSettingActions.saveDeviceSettings(meData.settings.deviceSettings)).then(() => {
      expect(store.getActions()).toEqual([
        { payload: true, type: 'SET_PROGRESS' },
        { payload: false, type: 'SET_PROGRESS' },
        { type: 'CLOSE_SETTINGS' },
      ]);
    });
  });

  it('should return error and dispatch SET_DEVICE_SETTING_ERROR', () => {
    settingService.updateSettings = jest.fn().mockRejectedValueOnce(undefined);
    store.dispatch(deviceSettingActions.saveDeviceSettings(meData.settings.deviceSettings)).then(() => {
      expect(store.getActions()).toEqual([
        { payload: true, type: 'SET_PROGRESS' },
        { payload: false, type: 'SET_PROGRESS' },
        { payload: {}, type: 'SET_DEVICE_SETTING_ERROR' },
      ]);
    });
  });

  it('should have DEVICE_SETTING_REMOVE_ALL device action', () => {
    store.dispatch(deviceSettingActions.removeAllSettings());
    expect(store.getActions()).toEqual([{ type: 'DEVICE_SETTING_REMOVE_ALL' }]);
  });

  it('should have SET_DEVICE_SETTING_ERROR device action', () => {
    store.dispatch(deviceSettingActions.setDeviceSettingError('Error'));
    expect(store.getActions()).toEqual([{ payload: { error: 'Error' }, type: 'SET_DEVICE_SETTING_ERROR' }]);
  });
});
