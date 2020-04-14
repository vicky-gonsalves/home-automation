import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { initialState } from '../../_utils';
import { subDeviceActions } from './sub-device.actions';

let store;
const mockStore = configureStore([thunk]);
store = mockStore(initialState);

describe('subDeviceActions', () => {
  afterEach(() => {
    store.clearActions();
  });
  it('should dispatch SHARED_DEVICE_REMOVE_ALL action', () => {
    store.dispatch(subDeviceActions.removeAllSubDevices());
    expect(store.getActions()).toEqual([{ type: 'SUB_DEVICE_REMOVE_ALL' }]);
  });
});
