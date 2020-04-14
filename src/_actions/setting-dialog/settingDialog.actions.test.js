import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { initialState } from '../../_utils';
import { settingDialogActions } from './settingDialog.actions';

let store;
const mockStore = configureStore([thunk]);
store = mockStore(initialState);

describe('settingDialogActions', () => {
  afterEach(() => {
    store.clearActions();
  });

  it('should dispatch OPEN_SETTINGS action', () => {
    store.dispatch(settingDialogActions.open('Tank', 'someId', 'someDialogType'));
    expect(store.getActions()).toEqual([
      { payload: { deviceId: 'someId', dialogType: 'someDialogType', title: 'Tank' }, type: 'OPEN_SETTINGS' },
    ]);
  });

  it('should dispatch CLOSE_SETTINGS action', () => {
    store.dispatch(settingDialogActions.close());
    expect(store.getActions()).toEqual([{ type: 'CLOSE_SETTINGS' }]);
  });

  it('should dispatch RESET_SETTINGS action', () => {
    store.dispatch(settingDialogActions.reset());
    expect(store.getActions()).toEqual([{ type: 'RESET_SETTINGS' }]);
  });
});
