import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { initialState } from '../../_utils';
import { sharedDeviceActions } from './sharedDevice.actions';

jest.mock('axios');

let store;
const mockStore = configureStore([thunk]);
store = mockStore(initialState);

describe('sharedDeviceActions', () => {
  afterEach(() => {
    store.clearActions();
  });
  it('should dispatch SHARED_DEVICE_REMOVE_ALL action', () => {
    store.dispatch(sharedDeviceActions.removeAllSharedDevices());
    expect(store.getActions()).toEqual([{ type: 'SHARED_DEVICE_REMOVE_ALL' }]);
  });
});
