import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { settingService } from '../../_services';
import { initialState } from '../../_utils';
import { subDeviceSettingOne, subDeviceSettingTwo } from '../../_utils/fixtures/subDeviceSetting.fixture';
import { subDeviceSettingActions } from './subDeviceSetting.actions';

let store;
const mockStore = configureStore([thunk]);
store = mockStore(initialState);
describe('subDeviceSettingActions', () => {
  afterEach(() => {
    store.clearActions();
  });

  it('should dispatch CLOSE_SETTINGS action for setting change', () => {
    settingService.updateSettings = jest.fn().mockResolvedValueOnce([subDeviceSettingOne, subDeviceSettingTwo]);
    store.dispatch(subDeviceSettingActions.saveSubDeviceSettings([subDeviceSettingOne, subDeviceSettingTwo])).then(() => {
      expect(store.getActions()).toEqual([
        { payload: true, type: 'SET_PROGRESS' },
        { payload: false, type: 'SET_PROGRESS' },
        { type: 'CLOSE_SETTINGS' },
      ]);
    });
  });

  it('should dispatch SET_SUB_DEVICE_SETTING_ERROR action for setting change', () => {
    settingService.updateSettings = jest.fn().mockRejectedValueOnce('Error');
    store.dispatch(subDeviceSettingActions.saveSubDeviceSettings([subDeviceSettingOne, subDeviceSettingTwo])).then(() => {
      expect(store.getActions()).toEqual([
        { payload: true, type: 'SET_PROGRESS' },
        { payload: false, type: 'SET_PROGRESS' },
        { payload: { error: 'Error' }, type: 'SET_SUB_DEVICE_SETTING_ERROR' },
      ]);
    });
  });

  it('should dispatch SUB_DEVICE_SETTING_REMOVE_ALL action', () => {
    store.dispatch(subDeviceSettingActions.removeAllSettings());
    expect(store.getActions()).toEqual([{ type: 'SUB_DEVICE_SETTING_REMOVE_ALL' }]);
  });

  it('should dispatch SET_SUB_DEVICE_SETTING_ERROR action', () => {
    store.dispatch(subDeviceSettingActions.setSubDeviceSettingError('Error'));
    expect(store.getActions()).toEqual([{ payload: { error: 'Error' }, type: 'SET_SUB_DEVICE_SETTING_ERROR' }]);
  });
});
