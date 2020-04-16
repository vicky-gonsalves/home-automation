import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { deviceService } from '../../_services';
import { initialState } from '../../_utils/index';
import { meData, myDeviceState } from '../../_utils/mock/me/me.data';
import { deviceActions } from './device.actions';

jest.mock('axios');

let store;
const mockStore = configureStore([thunk]);
store = mockStore(initialState);

describe('deviceActions', () => {
  afterEach(() => {
    store.clearActions();
  });

  it('should get myDevices and update store', () => {
    deviceService.getMyDevices = jest.fn().mockResolvedValueOnce(meData);
    store.dispatch(deviceActions.myDevices()).then(() => {
      expect(store.getActions()).toEqual(myDeviceState);
    });
  });

  it('should not dispatch DEVICE_SETTING_STORE_ALL action if no deviceSettings', () => {
    const _meDataWithoutDeviceSettings = { ...meData };
    delete _meDataWithoutDeviceSettings.settings.deviceSettings;
    deviceService.getMyDevices = jest.fn().mockResolvedValueOnce(meData);
    store.dispatch(deviceActions.myDevices()).then(() => {
      expect(store.getActions()).not.toEqual(myDeviceState);
    });
  });

  it('should not dispatch SUB_DEVICE_SETTING_STORE_ALL action if no subDeviceSettings', () => {
    const _meDataWithoutDeviceSettings = { ...meData };
    delete _meDataWithoutDeviceSettings.settings.subDeviceSettings;
    deviceService.getMyDevices = jest.fn().mockResolvedValueOnce(meData);
    store.dispatch(deviceActions.myDevices()).then(() => {
      expect(store.getActions()).not.toEqual(myDeviceState);
    });
  });

  it('should update store if no data', () => {
    deviceService.getMyDevices = jest.fn().mockResolvedValueOnce();
    store.dispatch(deviceActions.myDevices()).then(() => {
      expect(store.getActions().length).toBeFalsy();
      expect(store.getActions()).toEqual([]);
    });
  });

  it('should update store if no data and return DEVICE_GET_ERROR action', () => {
    deviceService.getMyDevices = jest.fn().mockRejectedValue(undefined);
    store.dispatch(deviceActions.myDevices()).then(() => {
      expect(store.getActions()).toEqual([{ type: 'DEVICE_GET_ERROR' }]);
    });
  });

  it('should have DEVICE_REMOVE_ALL device action', () => {
    store.dispatch(deviceActions.removeAllDevices());
    expect(store.getActions()).toEqual([{ type: 'DEVICE_REMOVE_ALL' }]);
  });

  it('should have DEVICE_UPDATE_FETCHING device action', () => {
    store.dispatch(deviceActions.setDeviceFetching(true));
    expect(store.getActions()).toEqual([{ payload: true, type: 'DEVICE_UPDATE_FETCHING' }]);
  });
});
