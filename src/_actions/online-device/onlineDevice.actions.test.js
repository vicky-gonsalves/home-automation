import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { initialState } from '../../_utils';
import { onlineDeviceActions } from './onlineDevice.actions';

jest.mock('axios');

let store;
const mockStore = configureStore([thunk]);
store = mockStore(initialState);

describe('onlineDeviceActions', () => {
  afterEach(() => {
    store.clearActions();
  });

  it('should dispatch ONLINE_DEVICE_REMOVE_ALL action', () => {
    store.dispatch(onlineDeviceActions.removeAllOnlineDevices());
    expect(store.getActions()).toEqual([{ type: 'ONLINE_DEVICE_REMOVE_ALL' }]);
  });
});
