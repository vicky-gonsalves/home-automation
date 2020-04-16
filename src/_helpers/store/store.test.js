import { socketConstants } from '../../_constants';
import { store } from './store';

describe('Store', function() {
  it('should dispatch from store correctly', () => {
    store.dispatch({ type: socketConstants.SOCKET_INIT });
    expect(store.getState().socket.isSocketFetching).toBeTruthy();
  });
});
