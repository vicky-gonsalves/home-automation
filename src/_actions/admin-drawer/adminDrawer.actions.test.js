import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { initialState } from '../../_utils';
import { adminDrawerActions } from './adminDrawer.actions';

jest.mock('axios');

let store;
const mockStore = configureStore([thunk]);
store = mockStore(initialState);

describe('adminDrawerActions', () => {
  afterEach(() => {
    store.clearActions();
  });

  it('should dispatch OPEN_ADMIN_DRAWER action', () => {
    store.dispatch(adminDrawerActions.open('Tank', 'someId', 'someDialogType'));
    expect(store.getActions()).toEqual([{ type: 'OPEN_ADMIN_DRAWER' }]);
  });

  it('should dispatch CLOSE_ADMIN_DRAWER action', () => {
    store.dispatch(adminDrawerActions.close());
    expect(store.getActions()).toEqual([{ type: 'CLOSE_ADMIN_DRAWER' }]);
  });
});
