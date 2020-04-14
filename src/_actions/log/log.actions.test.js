import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { initialState } from '../../_utils';
import { logActions } from './log.actions';

let store;
const mockStore = configureStore([thunk]);
store = mockStore(initialState);

describe('logActions', () => {
  afterEach(() => {
    store.clearActions();
  });

  it('should dispatch LOG_REMOVE_ALL action', () => {
    store.dispatch(logActions.removeAllLogs());
    expect(store.getActions()).toEqual([{ type: 'LOG_REMOVE_ALL' }]);
  });
});
