import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { initialState } from '../../_utils';
import { socketActions } from './socket.actions';
import socketIOClient from 'socket.io-client';
import MockedSocket from 'socket.io-mock';

jest.mock('axios');
jest.mock('socket.io-client');

let store;
const mockStore = configureStore([thunk]);
store = mockStore(initialState);

describe('socketActions', () => {
  beforeAll(() => {
    // eslint-disable-next-line no-console
    console.error = jest.fn();
  });
  afterAll(() => {
    // eslint-disable-next-line no-console
    console.error.mockClear();
  });
  it('should dispatch DISCONNECTED action on disconnection even if not connected', () => {
    store.dispatch(socketActions.socketDisconnect());
    expect(store.getActions()).toEqual([{ type: 'DISCONNECTED' }]);
  });

  describe('Testing connection', () => {
    let socket;
    beforeEach(() => {
      socket = new MockedSocket();
      // eslint-disable-next-line no-console
      console.log = jest.fn();
      store.clearActions();
      socketIOClient.mockReturnValue(socket);
    });
    afterEach(() => {
      store.clearActions();
      // eslint-disable-next-line no-console
      console.log.mockClear();
      jest.restoreAllMocks();
      socket = null;
    });

    it('should dispatch SOCKET_INIT action', () => {
      store.dispatch(socketActions.socketInit('someaccesstoken'));
      expect(socketIOClient.connect).toHaveBeenCalled();
      expect(store.getActions()).toEqual([{ type: 'SOCKET_INIT' }]);
    });
  });

  describe('Testing Events', () => {
    let socket;
    beforeEach(() => {
      socket = new MockedSocket();
      // eslint-disable-next-line no-console
      console.log = jest.fn();
      store.clearActions();
      socketIOClient.mockReturnValue(socket);
      store.dispatch(socketActions.socketInit('someaccesstoken'));
      store.clearActions();
    });
    afterEach(() => {
      store.clearActions();
      // eslint-disable-next-line no-console
      console.log.mockClear();
      jest.restoreAllMocks();
      socket = null;
    });

    it('should dispatch error action', () => {
      socket.socketClient.emit('error', 'somepayload');
      expect(store.getActions()).toEqual([]);
    });

    it('should dispatch DEVICE_CREATED action', () => {
      socket.socketClient.emit('DEVICE_CREATED', 'somepayload');
      expect(store.getActions()).toEqual([{ payload: 'somepayload', type: 'DEVICE_CREATED' }]);
    });

    it('should dispatch DEVICE_UPDATED action', () => {
      socket.socketClient.emit('DEVICE_UPDATED', 'somepayload');
      expect(store.getActions()).toEqual([{ payload: 'somepayload', type: 'DEVICE_UPDATED' }]);
    });

    it('should dispatch DEVICE_DELETED action', () => {
      socket.socketClient.emit('DEVICE_DELETED', 'somepayload');
      expect(store.getActions()).toEqual([
        { payload: 'somepayload', type: 'DEVICE_DELETED' },
        { payload: 'somepayload', type: 'SHARED_DEVICE_DELETED' },
        { payload: 'somepayload', type: 'PARENT_DEVICE_DELETED_FOR_SUB_DEVICE' },
        { payload: 'somepayload', type: 'PARENT_DEVICE_DELETED_FOR_SUB_DEVICE_PARAM' },
        { payload: 'somepayload', type: 'PARENT_DEVICE_DELETED_FOR_DEVICE_SETTING' },
        { payload: 'somepayload', type: 'PARENT_DEVICE_DELETED_FOR_SUB_DEVICE_SETTING' },
        { payload: 'somepayload', type: 'PARENT_DEVICE_DELETED_FOR_ONLINE_DEVICE' },
        { payload: 'somepayload', type: 'PARENT_DEVICE_DELETED_FOR_DEVICE_PARAM' },
        { payload: 'somepayload', type: 'PARENT_DEVICE_DELETED_FOR_LOG' },
      ]);
    });

    it('should dispatch SUB_DEVICE_CREATED action', () => {
      socket.socketClient.emit('SUB_DEVICE_CREATED', 'somepayload');
      expect(store.getActions()).toEqual([{ payload: 'somepayload', type: 'SUB_DEVICE_CREATED' }]);
    });

    it('should dispatch SUB_DEVICE_UPDATED action', () => {
      socket.socketClient.emit('SUB_DEVICE_UPDATED', 'somepayload');
      expect(store.getActions()).toEqual([{ payload: 'somepayload', type: 'SUB_DEVICE_UPDATED' }]);
    });

    it('should dispatch SUB_DEVICE_DELETED action', () => {
      socket.socketClient.emit('SUB_DEVICE_DELETED', 'somepayload');
      expect(store.getActions()).toEqual([
        { payload: 'somepayload', type: 'SUB_DEVICE_DELETED' },
        { payload: 'somepayload', type: 'PARENT_SUB_DEVICE_DELETED_FOR_SUB_DEVICE_PARAM' },
        { payload: 'somepayload', type: 'PARENT_SUB_DEVICE_DELETED_FOR_LOG' },
      ]);
    });

    it('should dispatch SUB_DEVICE_PARAM_CREATED action', () => {
      socket.socketClient.emit('SUB_DEVICE_PARAM_CREATED', 'somepayload');
      expect(store.getActions()).toEqual([{ payload: 'somepayload', type: 'SUB_DEVICE_PARAM_CREATED' }]);
    });

    it('should dispatch SUB_DEVICE_PARAM_UPDATED action', () => {
      socket.socketClient.emit('SUB_DEVICE_PARAM_UPDATED', 'somepayload');
      expect(store.getActions()).toEqual([{ payload: 'somepayload', type: 'SUB_DEVICE_PARAM_UPDATED' }]);
    });

    it('should dispatch SUB_DEVICE_MULTI_STATUS_UPDATED action', () => {
      socket.socketClient.emit('SUB_DEVICE_MULTI_PARAM_UPDATED', 'somepayload');
      expect(store.getActions()).toEqual([{ payload: 'somepayload', type: 'SUB_DEVICE_MULTI_STATUS_UPDATED' }]);
    });

    it('should dispatch SUB_DEVICE_PARAM_DELETED action', () => {
      socket.socketClient.emit('SUB_DEVICE_PARAM_DELETED', 'somepayload');
      expect(store.getActions()).toEqual([{ payload: 'somepayload', type: 'SUB_DEVICE_PARAM_DELETED' }]);
    });

    it('should dispatch DEVICE_PARAM_CREATED action', () => {
      socket.socketClient.emit('DEVICE_PARAM_CREATED', 'somepayload');
      expect(store.getActions()).toEqual([{ payload: 'somepayload', type: 'DEVICE_PARAM_CREATED' }]);
    });

    it('should dispatch DEVICE_PARAM_UPDATED action', () => {
      socket.socketClient.emit('DEVICE_PARAM_UPDATED', 'somepayload');
      expect(store.getActions()).toEqual([{ payload: 'somepayload', type: 'DEVICE_PARAM_UPDATED' }]);
    });

    it('should dispatch DEVICE_PARAM_DELETED action', () => {
      socket.socketClient.emit('DEVICE_PARAM_DELETED', 'somepayload');
      expect(store.getActions()).toEqual([{ payload: 'somepayload', type: 'DEVICE_PARAM_DELETED' }]);
    });

    it('should dispatch SHARED_DEVICE_ACCESS_CREATED action', () => {
      socket.socketClient.emit('SHARED_DEVICE_ACCESS_CREATED', 'somepayload');
      expect(store.getActions()).toEqual([{ payload: 'somepayload', type: 'SHARED_DEVICE_CREATED' }]);
    });

    it('should dispatch SHARED_DEVICE_ACCESS_DELETED action', () => {
      socket.socketClient.emit('SHARED_DEVICE_ACCESS_DELETED', 'somepayload');
      expect(store.getActions()).toEqual([
        { payload: 'somepayload', type: 'SHARED_DEVICE_DELETED' },
        { payload: 'somepayload', type: 'PARENT_DEVICE_DELETED_FOR_SUB_DEVICE' },
        { payload: 'somepayload', type: 'PARENT_DEVICE_DELETED_FOR_SUB_DEVICE_PARAM' },
        { payload: 'somepayload', type: 'PARENT_DEVICE_DELETED_FOR_DEVICE_SETTING' },
        { payload: 'somepayload', type: 'PARENT_DEVICE_DELETED_FOR_SUB_DEVICE_SETTING' },
        { payload: 'somepayload', type: 'PARENT_DEVICE_DELETED_FOR_DEVICE_PARAM' },
        { payload: 'somepayload', type: 'PARENT_DEVICE_DELETED_FOR_LOG' },
      ]);
    });

    it('should dispatch DEVICE_SETTING_CREATED action', () => {
      socket.socketClient.emit('DEVICE_SETTING_CREATED', 'somepayload');
      expect(store.getActions()).toEqual([{ payload: 'somepayload', type: 'DEVICE_SETTING_CREATED' }]);
    });

    it('should dispatch DEVICE_SETTING_UPDATED action', () => {
      socket.socketClient.emit('DEVICE_SETTING_UPDATED', 'somepayload');
      expect(store.getActions()).toEqual([{ payload: 'somepayload', type: 'DEVICE_SETTING_UPDATED' }]);
    });

    it('should dispatch DEVICE_SETTING_DELETED action', () => {
      socket.socketClient.emit('DEVICE_SETTING_DELETED', 'somepayload');
      expect(store.getActions()).toEqual([{ payload: 'somepayload', type: 'DEVICE_SETTING_DELETED' }]);
    });

    it('should dispatch DEVICE_MULTI_SETTING_DELETED action', () => {
      socket.socketClient.emit('DEVICE_MULTI_SETTING_DELETED', 'somepayload');
      expect(store.getActions()).toEqual([{ payload: 'somepayload', type: 'DEVICE_MULTI_SETTING_DELETED' }]);
    });

    it('should dispatch SUB_DEVICE_SETTING_CREATED action', () => {
      socket.socketClient.emit('SUB_DEVICE_SETTING_CREATED', 'somepayload');
      expect(store.getActions()).toEqual([{ payload: 'somepayload', type: 'SUB_DEVICE_SETTING_CREATED' }]);
    });

    it('should dispatch SUB_DEVICE_SETTING_UPDATED action', () => {
      socket.socketClient.emit('SUB_DEVICE_SETTING_UPDATED', 'somepayload');
      expect(store.getActions()).toEqual([{ payload: 'somepayload', type: 'SUB_DEVICE_SETTING_UPDATED' }]);
    });

    it('should dispatch SUB_DEVICE_MULTI_SETTING_DELETED action', () => {
      socket.socketClient.emit('SUB_DEVICE_MULTI_SETTING_DELETED', 'somepayload');
      expect(store.getActions()).toEqual([{ payload: 'somepayload', type: 'SUB_DEVICE_MULTI_SETTING_DELETED' }]);
    });

    it('should dispatch SUB_DEVICE_MULTI_SETTING_UPDATED action', () => {
      socket.socketClient.emit('SUB_DEVICE_MULTI_SETTING_UPDATED', 'somepayload');
      expect(store.getActions()).toEqual([{ payload: 'somepayload', type: 'SUB_DEVICE_MULTI_SETTING_UPDATED' }]);
    });

    it('should dispatch SOCKET_ID_CREATED action', () => {
      socket.socketClient.emit('SOCKET_ID_CREATED', 'somepayload');
      expect(store.getActions()).toEqual([{ payload: 'somepayload', type: 'ONLINE_DEVICE_CREATED' }]);
    });

    it('should dispatch SOCKET_ID_DELETED action', () => {
      socket.socketClient.emit('SOCKET_ID_DELETED', 'somepayload');
      expect(store.getActions()).toEqual([{ payload: 'somepayload', type: 'ONLINE_DEVICE_DELETED' }]);
    });

    it('should dispatch LOG_CREATED action if isDevLog is false', () => {
      socket.socketClient.emit('LOG_CREATED', { isDevLog: false });
      expect(store.getActions()).toEqual([{ payload: { isDevLog: false }, type: 'LOG_CREATED' }]);
    });

    it('should not dispatch LOG_CREATED action if isDevLog is true', () => {
      socket.socketClient.emit('LOG_CREATED', { isDevLog: true });
      expect(store.getActions()).toEqual([]);
    });

    it('should dispatch CONNECTED action', () => {
      socket.socketClient.emit('CONNECTED', 'somepayload');
      expect(store.getActions()).toEqual([{ type: 'CONNECTED' }]);
    });

    it('should dispatch disconnect action', () => {
      socket.socketClient.emit('disconnect', 'somepayload');
      expect(store.getActions()).toEqual([]);
    });

    it('should dispatch DISCONNECTED action on disconnection', () => {
      socket.disconnect = jest.fn();
      store.dispatch(socketActions.socketDisconnect());
      expect(store.getActions()).toEqual([{ type: 'DISCONNECTED' }]);
    });
  });
});
