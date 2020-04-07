import { socketConstants } from '../../_constants';
import socket from './socket.reducer';

describe('Socket Reducer', () => {
  beforeEach(() => {});

  it('should return default state', () => {
    const newState = socket({}, {});
    expect(newState).toEqual({});
  });

  it('should return new state if SOCKET_INIT', () => {
    const currentSocket = {
      isSocketFetching: true,
    };
    const newState = socket(
      {},
      {
        type: socketConstants.SOCKET_INIT,
      }
    );
    expect(newState).toEqual(currentSocket);
  });

  it('should return new state if CONNECTED', () => {
    const currentSocket = {
      isSocketFetching: false,
      connected: true,
    };
    const newState = socket(
      {},
      {
        type: socketConstants.CONNECTED,
      }
    );
    expect(newState).toEqual(currentSocket);
  });

  it('should return new state if DISCONNECTED', () => {
    const currentSocket = {
      connected: false,
      isSocketFetching: false,
    };
    const newState = socket(
      {},
      {
        type: socketConstants.DISCONNECTED,
      }
    );
    expect(newState).toEqual(currentSocket);
  });
});
