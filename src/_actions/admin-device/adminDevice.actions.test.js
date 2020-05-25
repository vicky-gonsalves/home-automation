import { find } from 'lodash';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { adminDeviceService } from '../../_services';
import { initialState } from '../../_utils';
import { deviceOne, deviceTwo } from '../../_utils/fixtures/device.fixture';
import { adminDeviceActions } from './adminDevice.actions';

jest.mock('axios');

let store;
const mockStore = configureStore([thunk]);
store = mockStore(initialState);

describe('adminDeviceActions', () => {
  afterEach(() => {
    store.clearActions();
  });

  it('should dispatch events if getDevices is called and returned response', async () => {
    const payload = { devices: [deviceOne, deviceTwo], count: 2 };
    adminDeviceService.getDevices = jest.fn().mockResolvedValueOnce(payload);
    await store.dispatch(adminDeviceActions.getDevices());
    const response = find(store.getActions(), ['type', 'STORE_DEVICES']);
    expect(find(store.getActions(), { payload: true, type: 'SET_FETCHING_DEVICES' })).toBeDefined();
    expect(response).toBeDefined();
    expect(response.payload).toBeDefined();
    expect(response.payload.devices).toBeDefined();
    expect(response.payload.devices).toHaveLength(2);
    expect(response.payload.devices).toEqual(payload.devices);
    expect(response.payload.count).toBeDefined();
    expect(response.payload.count).toBe(2);
    expect(find(store.getActions(), { payload: false, type: 'SET_FETCHING_DEVICES' })).toBeDefined();
  });

  it('should dispatch events if getDevices is called and returned error', async () => {
    adminDeviceService.getDevices = jest.fn().mockRejectedValueOnce('Some Error');
    await store.dispatch(adminDeviceActions.getDevices());
    expect(store.getActions()).toEqual([
      { type: 'SET_FETCHED_DEVICES', payload: true },
      { type: 'SET_FETCHING_DEVICES', payload: true },
      { type: 'SIGN_OUT' },
      { type: 'DISCONNECTED' },
      { type: 'CLEAR_DATA' },
    ]);
  });

  it('should dispatch storeDevicesList', async () => {
    await store.dispatch(adminDeviceActions.storeDevicesList('response'));
    expect(store.getActions()).toEqual([{ payload: 'response', type: 'STORE_DEVICES' }]);
  });
});
