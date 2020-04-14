import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { initialState } from '../../_utils';
import { deviceParamActions } from './deviceParam.actions';

let store;
const mockStore = configureStore([thunk]);
store = mockStore(initialState);

describe('deviceParamActions', () => {
  afterEach(() => {
    store.clearActions();
  });

  it('should have DEVICE_REMOVE_ALL device action', () => {
    store.dispatch(deviceParamActions.removeAllDeviceParams());
    expect(store.getActions()).toEqual([{ type: 'DEVICE_PARAM_REMOVE_ALL' }]);
  });
});
